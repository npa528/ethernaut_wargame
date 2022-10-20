const { deployments, ethers, getNamedAccounts } = require("hardhat")


async function main() {

  let privacy
  let deployer
  const BigNumber = ethers.BigNumber;

  deployer = (await getNamedAccounts()).deployer
  player = (await getNamedAccounts()).player

  await deployments.fixture(["privacy"])
  privacy = await ethers.getContract("Privacy", deployer)


  // const bb = "0x15253545542332325312531653535353"
  // const bb = ethers.utils.hexlify(5)
  const bb = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('three'));
  // console.log("Bb = ", bb)
  const finalMsg = ethers.utils.hexZeroPad(bb, 16)
  // console.log("finalMsg = ", finalMsg)

  const three = "0x74687265650000000000000000000000"
  const one =   "0x6f6e6500000000000000000000000000"
  // const test = ethers.utils.formatBytes32String( "three" );
  // console.log("Three = ", test)

  // const res = await privacy.unlock(three);

  // const res = await getArrayItem(3, privacy.address, 3, 32)
  // console.log("Res: ", res)

  const data = await ethers.provider.getStorageAt(privacy.address, 5);
  console.log("data[]: ", ethers.utils.parseBytes32String(data))
}


async function getArrayItem(slot, contractAddress, item, byteSize) {
  const BigNumber = ethers.BigNumber;
  const hashedSlot = ethers.utils.keccak256(ethers.utils.hexZeroPad(slot, 32));
  const itemsPerSlot = 32 / byteSize;
  let itemPos = item;

  for (let s = 1; s < item; s++) {
    if (item >= itemsPerSlot) {
      itemPos - itemsPerSlot;
    }
  }

  let byteShift = (itemPos / itemsPerSlot) * 64;
  while (byteShift >= 64) {
    byteShift -= 64;
  }
  const hashedSlotByItem = BigNumber.from(hashedSlot).add(Math.floor(item / itemsPerSlot)).toHexString();

  return getBytePackedVar(hashedSlotByItem, contractAddress, byteShift, byteSize);
}


async function getBytePackedVar(slot, contractAddress, byteShift, byteSize) {
  const BigNumber = ethers.BigNumber;
  const paddedSlot = ethers.utils.hexZeroPad(slot, 32);
  const storageLocation = await ethers.provider.getStorageAt(contractAddress, paddedSlot);
  console.log(`Location: ${storageLocation}  PaddedSlot: ${paddedSlot}`)

  let result = "";
  let altByteSize = 0;
  let altByteShift = 0;
  let check = false;

  if (byteSize <= 6) {
    return BigNumber.from(storageLocation).shr(byteShift * 4).mask(byteSize * 4 * 2).toNumber().toString(16);
  } else {
    altByteSize = byteSize - 6;
    altByteShift = byteShift + 12;
    check = true;
    result += await getBytePackedVar(slot, contractAddress, altByteShift, altByteSize);
  }

  if (check) {
    result += await getBytePackedVar(slot, contractAddress, byteShift, 6);
  }
  return result;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
