// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

/*
The contract below represents a very simple game: whoever sends it an amount of ether that is larger than the current
 prize becomes the new king. On such an event, the overthrown king gets paid the new prize, making a bit of ether in
 the process! As ponzi as it gets xD

Such a fun game. Your goal is to break it.

When you submit the instance back to the level, the level is going to reclaim kingship.
You will beat the level if you can avoid such a self proclamation.

*/
import "hardhat/console.sol";

contract King {
  // onwer: 0x25141B6345378e7558634Cf7c2d9B8670baFA417
  // king: 0x25141B6345378e7558634Cf7c2d9B8670baFA417
  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    console.log("Receive 1");
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
    console.log("Receive 2");
  }

  function _king() public view returns (address payable) {
    return king;
  }
}
