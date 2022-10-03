// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract Delegate {

  address public owner;

  constructor(address _owner) public {
    owner = _owner;
    console.log("CP1: %s", owner);
  }

  function pwn() public {
    owner = msg.sender;
    console.log("CP2: %s", owner);
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) public {
    delegate = Delegate(_delegateAddress); // this address becomes owner of Delegate
    owner = msg.sender;
    console.log("CP3: %s", owner);
    // console.log("delegate Add: %s", address(delegate));
  }

  fallback() external {
    console.log("FALLBACK");
    // console.log("CPR: %s", msg.sender);
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      console.log("CPR");
      this;
    }
  }
}
