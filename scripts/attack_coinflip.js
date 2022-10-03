const { deployments, ethers, getNamedAccounts } = require("hardhat")


async function main() {

  let coinFlip
  let hackCoinFlip
  let deployer

  deployer = (await getNamedAccounts()).deployer
  await deployments.fixture(["coinFlip"])
  coinFlip = await ethers.getContract("CoinFlip", deployer)
  hackCoinFlip = await ethers.getContract("HackCoinFlip", deployer)

  for (let i = 0; i < 10; i++) {
    await hackCoinFlip.makeGuess();
  }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
