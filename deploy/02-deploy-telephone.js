const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const telephone = await deploy("Telephone", {
        from: deployer,
        args: [], // put priceFeed address
        log: true,
    })

  const hackTelephone = await deploy("HackTelephone", {
          from: deployer,
          args: [telephone.address], // put priceFeed address
          log: true,
      })

}

module.exports.tags = ["all", "telephone"]
