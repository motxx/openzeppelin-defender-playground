import ethSigUtil = require("eth-sig-util");
import { ethers } from "ethers";
import { MinimalForwarder } from "./typechain/MinimalForwarder";
import { Erc20__factory } from "./typechain/factories/Erc20__factory";
import ContractAddr from "./deploy.json";

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
];

const ForwardRequest = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

export type Transaction = {
  from: string;
  to: string;
  data: string;
};

type Request = Transaction & {
  value: number;
  gas: number;
  nonce: string;
};

function getMetaTxTypeData(chainId: number, verifyingContract: string) {
  return {
    types: {
      EIP712Domain,
      ForwardRequest,
    },
    domain: {
      name: 'MinimalForwarder',
      version: '0.0.1',
      chainId,
      verifyingContract,
    },
    primaryType: 'ForwardRequest',
  }
};

export const buildRequest = async (forwarder: MinimalForwarder, tx: Transaction, signer: ethers.Wallet) => {
  const nonce = await forwarder.getNonce(tx.from).then(nonce => nonce.toString());
  const contract = Erc20__factory.connect(ContractAddr.goerli.DemoERC20, signer);
  const gasEstimate = await contract.estimateGas.transfer(tx.to, 1);
  return { value: 0, gas: gasEstimate.toNumber(), nonce, ...tx };
};

export const buildTypedData = async (forwarder: MinimalForwarder, request: Request) => {
  const chainId = await forwarder.provider.getNetwork().then(n => n.chainId);
  const typeData = getMetaTxTypeData(chainId, forwarder.address);
  return { ...typeData, message: request };
};

const signTypedData = (signer: ethers.Wallet, data: any) => {
  const privateKeyBuf = Buffer.from(signer.privateKey.replace(/^0x/, ''), 'hex');
  return ethSigUtil.signTypedMessage(privateKeyBuf, { data });
};

export const signMetaTxRequest = async (signer: ethers.Wallet, forwarder: MinimalForwarder, tx: Transaction) => {
  const request = await buildRequest(forwarder, tx, signer);
  const toSign = await buildTypedData(forwarder, request);
  const signature = signTypedData(signer, toSign);
  return { signature, request };
};
