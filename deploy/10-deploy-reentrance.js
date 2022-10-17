const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const value = ethers.utils.parseEther("0.001")
  const target = "0x345A26779763df3eF98E3Dd56ca6D5af64f2F882"

  // const reentrance = await deploy("Reentrance", {
  //       from: deployer,
  //       args: [],
  //       // value: value,
  //       log: true,
  //   })

  // console.log("Reentrance deployed at address: ", reentrance.address)

  const attackReentrance = await deploy("AttackReentrance", {
        from: deployer,
        args: [target],
        value: value,
        log: true,
    })

  console.log("AttackReentrance deployed at address: ", attackReentrance.address)
}

module.exports.tags = ["all", "reentrance"]
