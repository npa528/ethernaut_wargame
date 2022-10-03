const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

  describe("CoinFlip", async function() {
    let telephone
    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer
      await deployments.fixture(["telephone"])
      telephone = await ethers.getContract("Telephone", deployer)
    })

  describe("constructor", async () => {
    // it("tx.origin is msg.sender ", async () => {
    //   const owner = await telephone.owner()
    //   assert(deployer.address != owner.toString())
    // })

    it("change owner", async () => {
      const owner = await telephone.changeOwner()

      assert(deployer.address != owner.toString())
    })

  })
})
