const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const coinFlip = await deploy("CoinFlip", {
        from: deployer,
        args: [], // put priceFeed address
        log: true,
    })


  const hackCoinFlip = await deploy("HackCoinFlip", {
          from: deployer,
          args: [coinFlip.address], // put priceFeed address
          log: true,
      })
}

module.exports.tags = ["coinFlip"]
