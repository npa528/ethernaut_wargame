const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

  describe("CoinFlip", async function() {
    let coinFlip
    let hackCoinFlip
    let deployer
    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer
      await deployments.fixture(["coinFlip"])
      coinFlip = await ethers.getContract("CoinFlip", deployer)
      hackCoinFlip = await ethers.getContract("HackCoinFlip", deployer)
    })

  describe("constructor", async () => {
    it("check that 'consecutiveWins' are 0 ", async () => {
      const response = await coinFlip.consecutiveWins()
      assert.equal(response.toString(), "0")
    })

    it("check hacker guess ", async () => {
      for (let i = 0; i < 10; i++) {
        await hackCoinFlip.makeGuess();
      }
      const response = await coinFlip.consecutiveWins()
      assert.equal(response.toString(), "10")
    })
  })
})
