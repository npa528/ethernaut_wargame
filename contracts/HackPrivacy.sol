// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Privacy.sol";
import "hardhat/console.sol";

contract HackPrivacy {

  bool public locked = true;
  uint256 public ID = block.timestamp;
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(block.timestamp);
  bytes32[3] private data;
  Privacy privacy;
  address private owner;

  constructor(address _privacy) public {
    privacy = Privacy(_privacy);
    owner = msg.sender;
  }

  function retHash() public returns(uint32){
    // return keccak256("3");
  }

  function copyVars() public {
    // (bool result,) = address(delegate).delegatecall(msg.data);
  }
}
