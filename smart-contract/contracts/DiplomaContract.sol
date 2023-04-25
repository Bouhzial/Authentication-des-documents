// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DiplomaContract {
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    struct Diploma {
        string studentName;
        string birthDate;
        string diplomaType;
        string dateOfIssue;
        string speciality;
    }

    address owner;

    mapping(string => Diploma) private diplomasList;

    function createDiploma(
        string calldata diplomaHash,
        Diploma calldata diplomaData
    ) external onlyOwner {
        diplomasList[diplomaHash] = diplomaData;
    }

    function getDiploma(
        string calldata diplomaHash
    ) external view returns (Diploma memory) {
        return diplomasList[diplomaHash];
    }
}
