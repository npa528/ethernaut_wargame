const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  const password = ethers.utils.formatBytes32String("test");

  const vault = await deploy("Vault", {
        from: deployer,
        args: [password], // put priceFeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

  console.log("Vault deployed at address: ", vault.address)

  const hackVault = await deploy("HackVault", {
        from: deployer,
        args: [deployer], // put priceFeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

  console.log("HackVault deployed at address: ", hackVault.address)

}

module.exports.tags = ["all", "vault"]
