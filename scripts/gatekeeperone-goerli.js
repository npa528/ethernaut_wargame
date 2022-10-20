const { ethers, run, network } = require("hardhat")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GATEKEEPER_ONE_ADDRESS = "0xf0e84E56a689798764a85b2ce3596b80ce9e0e79";

const contractABI = require("../abis/gatekeeperone.json");


// Provider
const provider = ethers.getDefaultProvider('goerli');

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const gateKeeperOne = new ethers.Contract(GATEKEEPER_ONE_ADDRESS, contractABI, signer);


async function main() {

  const tx = await gateKeeperOne.entrant
  console.log("Entrant: ", tx)

}


main();
