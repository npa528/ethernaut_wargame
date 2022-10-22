// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperOne.sol";
import "hardhat/console.sol";

contract AttackGatekeeperOne {

  GatekeeperOne public gkone;

  constructor(address _gkone) public {
    gkone = GatekeeperOne(_gkone);
  }

  function attack() public {
    // console.log("gasleft2: ", gasleft());
    gkone{gas: 100};
    bool res = gkone.enter("123");
  }
}
