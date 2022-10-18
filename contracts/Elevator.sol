// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    console.log("goTo: %s", _floor);
    console.log("msg.sender: %s", msg.sender);
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      console.log("CP1: %s", floor);
      top = building.isLastFloor(floor);
      console.log("Elevator Hacked, We are at Topfloor: ", top);
    }
  }
}
