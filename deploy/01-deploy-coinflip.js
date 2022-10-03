const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const coinFlip = await deploy("CoinFlip", {
        from: deployer,
        args: [], // put priceFeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })


  const hackCoinFlip = await deploy("HackCoinFlip", {
          from: deployer,
          args: [coinFlip.address], // put priceFeed address
          log: true,
          waitConfirmations: network.config.blockConfirmations || 1,
      })
}

module.exports.tags = ["all", "coinFlip"]
