import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";

import { config } from "dotenv";
config();

const {
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
} = process.env;

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      // Optimizerは常に有効に(2020/11/04)
      // https://blog.soliditylang.org/2020/11/04/solidity-ama-1-recap/
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/HfR6e0t7umtqdC2vZQeYTqsJ8G_F83fD",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    avax: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    agor: {
      url: "https://goerli-rollup.arbitrum.io/rpc/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sokol: {
      url: "https://sokol.poa.network/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default hardhatConfig;
