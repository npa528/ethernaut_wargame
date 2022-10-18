const { deployments, ethers, getNamedAccounts } = require("hardhat")

async function main() {

  let elevator
  let attackElevator
  let deployer
  let player

  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["elevator"])
  elevator = await ethers.getContract("Elevator", deployer)
  attackElevator = await ethers.getContract("AttackElevator", deployer)

  const tx = await attackElevator.gotoFloor(elevator.address, 2);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
