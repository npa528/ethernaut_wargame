const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const value = ethers.utils.parseEther("1")

  const king = await deploy("King", {
        from: deployer,
        args: [],
        value: value,
        log: true,
    })

  console.log("King deployed at address: ", king.address)

  const attackKing = await deploy("AttackKing", {
        from: deployer,
        args: [king.address],
        value: value,
        log: true,
    })

  console.log("AttackKing deployed at address: ", attackKing.address)
}

module.exports.tags = ["all", "king", "attackking"]
