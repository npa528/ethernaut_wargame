const { deployments, ethers, getNamedAccounts } = require("hardhat")


async function main() {

  let vault
  let hackVault
  let deployer
  let player
  let password
  let isLocked


  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["vault", "hackvault"])
  vault = await ethers.getContract("Vault", deployer)
  hackVault = await ethers.getContract("HackVault", deployer)


  isLocked = await vault.locked();
  console.log("isLocked = ", isLocked)

  // password = ethers.utils.formatBytes32String("test1");
  // await vault.unlock(password);

  await vault.unlock("0x7465737400000000000000000000000000000000000000000000000000000000")


  const lockedVar = await ethers.provider.getStorageAt(vault.address, 0)
  const passwordVar = await ethers.provider.getStorageAt(vault.address, 1)
  console.log("lockedVar = ", lockedVar)
  console.log("passwordVar = ", passwordVar)

  isLocked = await vault.locked();
  console.log("isLocked2 = ", isLocked)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
