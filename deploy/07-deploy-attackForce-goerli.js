const { ethers, run, network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const AttackForce = await ethers.getContractFactory("AttackForce");
    const attackForce = await AttackForce.deploy();

    console.log("AttackForce address:", attackForce.address);

    // Goerli AttackForce address: 0x6b4E1DAda0075d882e51fAadEeb8408B2ed19f30
}


module.exports.tags = ["all", "attackforce"]
//
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
