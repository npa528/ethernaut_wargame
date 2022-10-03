const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const delegate = await deploy("Delegate", {
        from: deployer,
        args: [deployer], // put priceFeed address
        log: true,
    })

}


module.exports.tags = ["all", "delegate"]
