const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer, deployer2, player } = await getNamedAccounts()

  const gkone = await deploy("GatekeeperOne", {
        from: deployer,
        args: [],
        log: true,
    })

  console.log("GatekeeperOne deployed at address: ", gkone.address)

  const attackgkone = await deploy("AttackGatekeeperOne", {
        from: deployer2,
        args: [gkone.address],
        log: true,
    })

  console.log("AttackGatekeeperOne deployed at address: ", attackgkone.address)
}

module.exports.tags = ["all", "gatekeeperone"]
