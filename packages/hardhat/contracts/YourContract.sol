//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
    // State Variables
    address public immutable owner;

    // Beneficiary:
    address public beneficiary;

    // NZDD token (or any erc20):
    IERC20 public nzddToken;

    string public greeting = "Building Unstoppable Apps!!!";
    bool public premium = false;
    uint256 public totalCounter = 0;
    mapping(address => uint) public userGreetingCounter;

    // Events: a way to emit log statements from smart contract that can be listened to by external parties
    event GreetingChange(address indexed greetingSetter, string newGreeting, bool premium, uint256 value);

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner, address _tokenAddress) {
        owner = _owner;

        /// Pass the NZDD address as parameter on deployment!
        nzddToken = IERC20(_tokenAddress);
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    modifier isBeneficiary() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == beneficiary, "Not the Beneficiary");
        _;
    }

    /**
     * @dev Sets the address of the beneficiary.
     * @notice Only the contract owner can call this function.
     * @param _beneficiary The address of the new beneficiary.
     */
    function setBeneficiary(address _beneficiary) public isOwner {
        beneficiary = _beneficiary;
    }

    /**
     * @dev Returns the address of the beneficiary.
     * @return The address of the beneficiary.
     */
    function getBeneficiary() public view returns (address) {
        return beneficiary;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    /**
     * @dev Sets the address of the payment token contract.
     * @notice Only the contract owner can call this function.
     * @param _token The address of the ERC-20 token contract.
     */
    function setPaymentToken(address _token) public isOwner {
        nzddToken = IERC20(_token);
    }

    /**
     * @dev Returns the NZDD token balance of this contract.
     * @return The balance of the contract in NZDD tokens.
     */ function getNZDDContractBalance() public view returns (uint256) {
        return nzddToken.balanceOf(address(this));
    }

    /**
     * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
     *
     * @param _newGreeting (string memory) - new greeting to save on the contract
     */
    function setGreeting(string memory _newGreeting) public payable {
        // Print data to the hardhat chain console. Remove when deploying to a live network.
        console.log("Setting new greeting '%s' from %s", _newGreeting, msg.sender);

        // Change state variables
        greeting = _newGreeting;
        totalCounter += 1;
        userGreetingCounter[msg.sender] += 1;

        // msg.value: built-in global variable that represents the amount of ether sent with the transaction
        if (msg.value > 0) {
            premium = true;
        } else {
            premium = false;
        }

        // emit: keyword used to trigger an event
        emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, msg.value);
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the beneficiary of the contract as defined by the isBeneficiary modifier
     */
    function withdraw() public isBeneficiary {
        (bool success, ) = beneficiary.call{ value: address(this).balance }("");
        require(success, "Failed to send Ether");
    }

    /**
     * @dev Withdraws a specified amount of NZDD tokens from the contract to the beneficiary.
     * @notice Only the beneficiary can call this function to withdraw NZDD tokens.
     * @param amount The amount of NZDD tokens to withdraw.
     */
    function withdrawNZDD(uint256 amount) public isBeneficiary {
        require(amount > 0, "amount must be greater than 0");

        uint256 contractBalance = nzddToken.balanceOf(address(this));

        require(amount <= contractBalance, "Not enough tokens in contract");

        bool success = nzddToken.transfer(beneficiary, amount);

        require(success, "Token withdrawal failed");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
