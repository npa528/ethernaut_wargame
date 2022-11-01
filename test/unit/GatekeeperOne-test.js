const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

describe("Bruteforcing", function () {
  let gkone, attackgkone, deployer, player
  // Deploy contracts
  beforeEach(async () => {
    accounts = await ethers.getSigners() // could also do with getNamedAccounts
    deployer = accounts[0]

    // deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(["gatekeeperone"])
    gkone = await ethers.getContract("GatekeeperOne", deployer)
    attackgkone = await ethers.getContract("AttackGatekeeperOne", deployer)
  })


  it("GatekeeperOne should be hacked", async function () {

    // Start bruteforcing
    const [lowerGasBrute, upperGasBrute] = [1, 1000];

    expect(await attackgkone.attack(
      gkone.address,
      lowerGasBrute,
      upperGasBrute
    )).to.emit("Hacked")

    // Tests
    const ent = await gkone.entrant();
    assert.equal(deployer.address, ent)

})

})
