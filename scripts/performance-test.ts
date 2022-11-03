import axios from "axios";
import { ethers } from "ethers";
import { Erc20__factory } from "../typechain/factories/Erc20__factory";
import { Avalanche } from "avalanche";
import { exit } from "process";

const privateKey = process.env.PRIVATE_KEY!;
const recipient = process.env.RECIPIENT_ADDR!;
//const rpcUrl = "https://eth-goerli.g.alchemy.com/v2/HfR6e0t7umtqdC2vZQeYTqsJ8G_F83fD";
//const rpcUrl = "https://polygon-rpc.com/";
//const rpcUrl = "https://api.avax.network/ext/bc/C/rpc";
//const rpcUrl = "https://arb1.arbitrum.io/rpc";
const rpcUrl = "https://goerli-rollup.arbitrum.io/rpc/";

// https://github.com/ethers-io/ethers.js/issues/2828
function parse(data: number) {
  return ethers.utils.parseUnits(Math.ceil(data) + '', 'gwei');
}

async function calcPolygonGas(gasEstimated: ethers.BigNumber) {
  const gas = {
    gasLimit: gasEstimated, //.mul(110).div(100)
    maxFeePerGas: ethers.BigNumber.from(40000000000),
    maxPriorityFeePerGas: ethers.BigNumber.from(40000000000)
  };
  try {
    const {data} = await axios({
      method: 'get',
      url: 'https://gasstation-mainnet.matic.network/v2'
    });
    // Fast: API から取得可能
    // 10 倍しても速度変化が見られない
    gas.maxFeePerGas = parse(data.fast.maxFee);
    gas.maxPriorityFeePerGas = parse(data.fast.maxPriorityFee);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return gas;
};

async function calcAvaxGas(gasEstimated: ethers.BigNumber) {
  const gas = {
    gasLimit: gasEstimated, //.mul(110).div(100)
    maxFeePerGas: ethers.BigNumber.from(40000000000),
    maxPriorityFeePerGas: ethers.BigNumber.from(40000000000)
  };
  try {
    const chainId = 43113
    const avalanche = new Avalanche(
      "api.avax.network",
      undefined,
      "https",
      chainId
    );
    const cchain = avalanche.CChain();
    const baseFee = parseInt(await cchain.getBaseFee(), 16) / 1e9;
    // Rapid: 1.5 ~ 2.5 程度
    // 20 などでも速度変化が見られない
    const maxPriorityFeePerGas = 2; //parseInt(await cchain.getMaxPriorityFeePerGas(), 16) / 1e9;
    gas.maxPriorityFeePerGas = parse(maxPriorityFeePerGas);
    gas.maxFeePerGas = parse(baseFee + maxPriorityFeePerGas);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return gas;
};

async function calcArbitrumGas(gasEstimated: ethers.BigNumber) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  return {
    gasLimit: gasEstimated,
    gasPrice: provider.getGasPrice(),
  };
}

async function calcEthereumGas(gasEstimated: ethers.BigNumber) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const feeData = await provider.getFeeData();
  return {
    gasLimit: gasEstimated,
    maxFeePerGas: feeData.maxFeePerGas!,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas!,
  };
}

const sendTx = async () => {
  const provider = ethers.getDefaultProvider({
    name: 'goerli',
    chainId: 5,//137,
    _defaultProvider: (providers) => new ethers.providers.JsonRpcProvider(rpcUrl),
  });

  const walletWithProvider = new ethers.Wallet(privateKey, provider);

  // テスト用 ERC20
  //const contractAddress = "0x3afd64b200adf94641012375a8dcea5ae30066c4"; // Polygon
  //const contractAddress = "0xA48FfBFD917e1882db1C68dA59187878fcCa83F6"; // Avalanche
  //const contractAddress = "0x5A2F3a7e0d97C9cdD3a83440D37FB55a1fF1C326"; // Arbitrum
  const contractAddress = "0x3BCeEcf8dEea979fb6834804E033f2EA54Cc5EA9"; // Ethereum Goerli
  const erc20 = Erc20__factory.connect(contractAddress, walletWithProvider);

  const gasEstimated = await erc20.estimateGas.transfer(recipient, 1);
  const gas = await calcArbitrumGas(gasEstimated);
  //const gas = await calcEthereumGas(gasEstimated);
  const hrstart = process.hrtime();
  const tx = await erc20.transfer(recipient, 1, gas);
  const receipt = await tx.wait();
  const hrend = process.hrtime(hrstart);

  return {
    receipt,
    hrend,
  };
};

function sleep(waitSec: number) {
  return new Promise(function (resolve: any) {
    setTimeout(function() { resolve() }, waitSec);
  });
}

// MEMO: EIP-1559 概要
// https://zenn.dev/hokusai/articles/9f9195032e2d5a

const main = async () => {
  for (let i = 0; i < 10; i++) {
    const { hrend, receipt } = await sendTx();
    // process.hrtime()
    // https://qiita.com/kaba/items/0953dc4719effafd6b0f
    const sec = hrend[0] + hrend[1] / 1e9;

    // https://recruit.gmo.jp/engineer/jisedai/blog/eip-1559-research/
    // effectiveGasPrice = 支払われた実際のガス価格
    console.log(sec, receipt.effectiveGasPrice.toNumber(), receipt.transactionHash);
    //await sleep(3000)
  }
};

main();
