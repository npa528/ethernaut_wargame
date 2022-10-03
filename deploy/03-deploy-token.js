const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const token = await deploy("Token", {
        from: deployer,
        args: [20], // put priceFeed address
        log: true,
    })

}

module.exports.tags = ["all", "token"]
