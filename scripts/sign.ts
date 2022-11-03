import { ethers } from 'hardhat';
import { signMetaTxRequest } from '../signer';
import { writeFileSync } from 'fs';
import ContractAddr from "../deploy.json";
import { DemoERC20__factory } from '../typechain/factories/DemoERC20__factory';
import { MinimalForwarder__factory } from '../typechain/factories/MinimalForwarder__factory';


async function main() {
  const { RECIPIENT_ADDR: recipient, VALUE: value, PRIVATE_KEY: privateKey } = process.env;

  const rpcUrl = process.env.RPC_URL!;
  const provider = ethers.getDefaultProvider({
    name: 'goerli',
    chainId: 5,
    _defaultProvider: (providers) => new ethers.providers.JsonRpcProvider(rpcUrl),
  });
  const signer = new ethers.Wallet(privateKey!, provider);

  const forwarder = await MinimalForwarder__factory.connect(ContractAddr.goerli.MinimalForwarder, signer);
  const demoERC20 = await DemoERC20__factory.connect(ContractAddr.goerli.DemoERC20, signer);

  const from = signer.address;
  console.log(`Sign of transfer ${from} to ${recipient} ...`);
  const data = demoERC20.interface.encodeFunctionData("transfer", [recipient!, value || 1]);
  const result = await signMetaTxRequest(signer, forwarder, {
    to: demoERC20.address, from, data,
  });

  writeFileSync('tmp/request.json', JSON.stringify(result, null, 2));
  console.log(`Signature: `, result.signature);
  console.log(`Request: `, result.request);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
