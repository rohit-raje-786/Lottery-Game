// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery{
    address payable[] public players;
    address payable public admin;
    address payable public winner;
    constructor(){
        admin=payable(msg.sender);
    }

    receive() external payable
    {
        require(msg.sender!=admin,"Owner can't play the game");
        require(msg.value == 1 ether,"Please pay Only 1 ether to play the game");

        players.push(payable(msg.sender));
    }
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public{
        // require(admin==msg.sender,"You are not the owner");
        // require(players.length>=3,"Players should be atleast 3");
       
       winner=players[random()%players.length];
       winner.transfer(getBalance());

       players=new address payable[](0);
       
    }
    
}