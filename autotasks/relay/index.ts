import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';

import ContractAddr from '../../deploy.json';
import { MinimalForwarder } from '../../typechain/MinimalForwarder';
import { MinimalForwarder__factory } from '../../typechain/factories/MinimalForwarder__factory';

export const relay = async (forwarder: MinimalForwarder, request: any, signature: any) => {
  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature);
  if (!valid) throw new Error(`Invalid request`);
  
  // Send meta-tx through relayer to the forwarder contract
  const forwarderGasEstimate = await forwarder.estimateGas.execute(request, signature);
  const requestGas = parseInt(request.gas);
  const totalGasEstimate = forwarderGasEstimate.add(requestGas).add(10000);
  return await forwarder.execute(request, signature, { gasLimit: totalGasEstimate, maxPriorityFeePerGas: 2 });
};

export const handler = async (event: any) => {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`);
  const { request, signature } = event.request.body;
  console.log(`Relaying`, request);
  
  // Initialize Relayer provider and signer, and forwarder contract
  const credentials = { ... event };
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  const forwarder = MinimalForwarder__factory.connect(ContractAddr.goerli.MinimalForwarder, signer);
  
  // Relay transaction!
  const tx = await relay(forwarder, request, signature);
  console.log(`Sent meta-tx: ${tx.hash}`);
  return { txHash: tx.hash };
};
