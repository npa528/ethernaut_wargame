const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const force = await deploy("Force", {
        from: deployer,
        args: [], // put priceFeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

  console.log("Force deployed at address: ", force.address)


  const hackForce = await deploy("HackForce", {
          from: deployer,
          args: [force.address], // put priceFeed address
          log: true,
          waitConfirmations: network.config.blockConfirmations || 1,
      })

    console.log("HackForce deployed at address: ", hackForce.address)
}

module.exports.tags = ["all", "force", "hackforce"]
