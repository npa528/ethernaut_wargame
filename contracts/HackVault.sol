// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Vault.sol";
import "hardhat/console.sol";

contract HackVault {

  address immutable i_onwer;

  constructor(address owner) {
    i_onwer = owner;
  }

}
