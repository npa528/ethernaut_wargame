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


  // Start bruteforcing
    const [lowerGasBrute, upperGasBrute] = [1, 1000];
    const hackTxn = await attackgkone.attack(
      gatekeeperContract.address,
      lowerGasBrute,
      upperGasBrute
    );
    const { events } = await hackTxn.wait();
    const { args: { gasBrute } } = events?.find(({ event }) => (event === "Hacked")) as HackedEvent;



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
