const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer, deployer2 } = await getNamedAccounts()

  const delegate = await deploy("Delegate", {
        from: deployer,
        args: [deployer], // deployer becomes owner of this contract
        log: true,
    })

  // console.log("delegate add1 = ", delegate.address)

  const delegation = await deploy("Delegation", {
        from: deployer, // msg.sender
        args: [delegate.address],
        log: true,
    })


    const hackDelegation = await deploy("HackDelegation", {
          from: deployer2, // msg.sender
          args: [delegation.address],
          log: true,
      })

}


module.exports.tags = ["all", "delegation", "hackdelegation"]
