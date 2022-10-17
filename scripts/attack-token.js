const { deployments, ethers, getNamedAccounts } = require("hardhat")


async function main() {

  let token
  let deployer
  let player

  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["token"])
  token = await ethers.getContract("Token", deployer)

  let balance
  balance = await token.balanceOf(deployer);
  console.log("cp1 balance: ", balance.toNumber()); //58.424634007577468392

  await token.transfer(player, 21);

  balance = await token.balanceOf(deployer);
  console.log("cp2 balance: ", balance.toNumber());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
