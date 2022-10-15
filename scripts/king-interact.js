const { deployments, ethers, getNamedAccounts } = require("hardhat")


async function main() {

  let king
  let attackKing
  let deployer
  let player
  let owneraddress
  let kingaddress
  let prize
  const value = ethers.utils.parseEther("0.05")

  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["king", "attackking"])
  king = await ethers.getContract("King", deployer)
  attackKing = await ethers.getContract("AttackKing", deployer)

  owneraddress = await king.owner()
  kingaddress = await king._king()
  prize = await king.prize()

  console.log("Onwer: ", owneraddress.toString())
  console.log("King: ",kingaddress.toString())
  console.log("Prize: ", prize.toString())

  const accounts = await ethers.getSigners();
  const hacker = accounts[1];
  console.log("Hacker: ", hacker.address)

  // const transaction = await hacker.sendTransaction({ to: king.address, value: value })


  owneraddress = await king.owner()
  kingaddress = await king._king()
  prize = await king.prize()

  console.log("Onwer 2: ", owneraddress.toString())
  console.log("King 2: ",kingaddress.toString())
  console.log("Prize 2: ", prize.toString())


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
