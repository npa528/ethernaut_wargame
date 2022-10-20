const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const b1 = ethers.utils.formatBytes32String( "one" )
  const b2 = ethers.utils.formatBytes32String( "two" )
  const b3 = ethers.utils.formatBytes32String( "three" )

  const privacy = await deploy("Privacy", {
        from: deployer,
        args: [[b1, b2, b3]],
        log: true,
    })

  console.log("Privacy deployed at address: ", privacy.address)

  // const attackElevator = await deploy("AttackElevator", {
  //       from: deployer,
  //       args: [deployer],
  //       log: true,
  //   })
  //
  // console.log("AttackElevator deployed at address: ", attackElevator.address)
}

module.exports.tags = ["all", "privacy"]
