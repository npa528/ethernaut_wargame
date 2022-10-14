const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

  describe("Vault", async function() {
    let vault
    let hackVault
    let provider
    const sendValue = ethers.utils.parseEther("1") // 1 ETH

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer
      await deployments.fixture(["vault", "hackvault"])
      vault = await ethers.getContract("Vault", deployer)
      hackVault = await ethers.getContract("HackVault", deployer)
      provider = ethers.getDefaultProvider();
    })


  describe("constructor", () => {

    it("Check Initial unlock", async () => {

    })


  })
})
