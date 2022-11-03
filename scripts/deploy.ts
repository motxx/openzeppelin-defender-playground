import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const deploy = async (contractName: string, ...args: string[]) => {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = args.length ? await Contract.deploy(...args) : await Contract.deploy();
  await contract.deployed();
  return contract;
};

async function main() {
  const forwarder = await deploy("MinimalForwarder");
  const minter = process.env.PUBLIC_KEY!;
  const erc20 = await deploy("DemoERC20", forwarder.address, minter);

  console.log(
    `forwarder => ${forwarder.address}\nerc20 => ${erc20.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
