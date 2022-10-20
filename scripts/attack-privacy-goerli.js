// const { ethers, run, network } = require("hardhat")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVACY_ADDRESS = "0x308585E6D67B060A011068b96B0404838ced316D";

const contractABI = require("../abis/privacy.json");

// Provider
const provider = ethers.getDefaultProvider('goerli');
// Provider
// const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);


// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const privacy = new ethers.Contract(PRIVACY_ADDRESS, contractABI, signer);


async function main() {
  // const data = await ethers.provider.getStorageAt(PRIVACY_ADDRESS, 5);
  // const readable = await ethers.utils.parseBytes32String(data)
  // console.log("readable: ", data)

  for (let i = 0; i < 6; i++) {
          console.log(
              `Location ${i}: ${await ethers.provider.getStorageAt(
                  privacy.address,
                  i
              )}`
          )
    }
}

main();
