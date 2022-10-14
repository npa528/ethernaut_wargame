const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

  describe("Force", async function() {
    let force
    let hackForce
    let provider
    const sendValue = ethers.utils.parseEther("1") // 1 ETH

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer
      await deployments.fixture(["force", "hackforce"])
      force = await ethers.getContract("Force", deployer)
      hackForce = await ethers.getContract("HackForce", deployer)
      provider = ethers.getDefaultProvider();
    })


  describe("constructor", () => {

    it("Check Initial Balance is 0", async () => {
      const forceBalance = await force.provider.getBalance(force.address)
      console.log("Force initial balance: ", forceBalance.toString());

      const hackForceBalance = await hackForce.provider.getBalance(hackForce.address)
      console.log("HackForce initial balance: ", hackForceBalance.toString());

      assert.equal(forceBalance.toString(), "0");
      assert.equal(hackForceBalance.toString(), "0");
    })

    it("Send ETH to HackForce", async () => {

      // await hackForce.depositUsingCall();

      await hackForce.deposit({ value: sendValue })
      const amount = await hackForce.getAddreesToAmount(deployer)

      assert.equal(amount.toString(), sendValue.toString())

      const hackForceBalance = await hackForce.provider.getBalance(hackForce.address)
      console.log("HackForce after deposit balance: ", hackForceBalance.toString());

      const totalFundersBalance = await hackForce.getTotalFundersBalance();
      assert.equal(totalFundersBalance.toString(), hackForceBalance.toString())
    })

    it("Failed Send ETH to Force with call", async () => {
        // First we send some ETH to HackForce
        await hackForce.deposit({ value: ethers.utils.parseEther("3") })

        // Fails because Force does not have callback function or payable
        await expect( hackForce.depositUsingCall(force.address, ethers.utils.parseEther("1"))
          ).to.be.revertedWith("Deposit failed")
    })

    it("Self destruct and send ETH to Force", async () => {
        // First we send some ETH to HackForce
        // Do we need this step?
        await hackForce.deposit({ value: ethers.utils.parseEther("1") })

        await hackForce.attack(force.address);

        const forceBalance = await force.provider.getBalance(force.address)
        console.log("New Force balance: ", forceBalance.toString());

        const hackForceBalance = await hackForce.provider.getBalance(hackForce.address)
        console.log("New HackForce balance: ", hackForceBalance.toString());

    })

  })
})
