const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const token = await deploy("Token", {
        from: deployer,
        args: [20], // put priceFeed address
        log: true,
    })

}

module.exports.tags = ["token"]
