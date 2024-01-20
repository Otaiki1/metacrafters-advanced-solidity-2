//SPDX-License-Identifier: Unlicense

// contracts/BuyMeADrink.sol
pragma solidity ^0.8.9;

contract BuyMeADrink {
    // Event to emit when a Note is created.
    event NewNote(
        address indexed from,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount
    );

    // Note struct.
    struct Note {
        address from;
        uint256 amount;
        string name;
        string message;
    }

    uint256 balance;

    // List of all Notes received from coffee purchases.
    Note[] notes;

    function getNotes() public view returns (Note[] memory) {
        return notes;
    }

    function buyDrink(
        string memory _name,
        string memory _message,
        uint256 _amount
    ) public payable {
        // Add the memo to storage!
        notes.push(Note(msg.sender, _amount, _name, _message));

        // Emit a NewNote event with details about the Note.
        emit NewNote(msg.sender, block.timestamp, _name, _message, _amount);
    }

    function withdrawFunds() public {
        balance = 0;
    }

    function getBalance() public view returns (uint) {
        return balance;
    }
}
