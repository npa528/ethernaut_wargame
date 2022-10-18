const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  // const elevator = await deploy("Elevator", {
  //       from: deployer,
  //       args: [],
  //       log: true,
  //   })
  //
  // console.log("Elevator deployed at address: ", elevator.address)

  const attackElevator = await deploy("AttackElevator", {
        from: deployer,
        args: [deployer],
        log: true,
    })

  console.log("AttackElevator deployed at address: ", attackElevator.address)
}

module.exports.tags = ["all", "elevator"]
