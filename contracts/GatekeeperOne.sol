// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "hardhat/console.sol";

contract GatekeeperOne {

  using SafeMath for uint256;
  address public entrant;

  modifier gateOne() {
    // console.log("Gate1");
    // console.log("Msg.sender: %s tx.origin: %s", msg.sender, tx.origin);
    require(msg.sender != tx.origin, "wrong cp1");
    _;
  }

  modifier gateTwo() {
    console.log("gasleft1: ", gasleft());
    require(gasleft().mod(8191) == 0, "wrong cp2");
    _;
  }
  //
  // modifier gateThree(bytes8 _gateKey) {
  //     require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
  //     require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
  //     require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three");
  //   _;
  // }

  function enter(bytes8 _gateKey) public gateOne  gateTwo /* gateThree(_gateKey) */ returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
