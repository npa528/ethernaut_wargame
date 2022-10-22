const { deployments, ethers, getNamedAccounts } = require("hardhat")

async function main() {

  let gkone, attackgkone, deployer, player

  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["gatekeeperone"])
  gkone = await ethers.getContract("GatekeeperOne", player)
  attackgkone = await ethers.getContract("AttackGatekeeperOne", player)

  // const bb = ethers.utils.hexZeroPad(ethers.utils.hexlify([123]), 8)
  // const tx = await gkone.enter(bb);
  // console.log("tx: ", tx)


  const tx2 = await attackgkone.attack();
  console.log("tx2: ", tx2)



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
