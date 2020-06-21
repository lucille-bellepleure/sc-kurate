pragma solidity ^0.5.16;

contract UserRegistry {
    address payable public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function changeOwner(address payable _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    // Threshold for verification status
    uint256 public verificationthresh;

    struct User {
        bool exists;
        address payable userAddress;
        string publicKey;
        string userName;
        string userAvatar;
        mapping(address => bool) verifications;
        uint256 numVerifications;
    }

    mapping(address => User) public users;

    event UserAdded(
        address userAddress,
        string userName,
        string userAvatar,
        string publicKey
    );

    event VerificationAdded(
        address _from,
        address _to,
        uint256 _numverifications
    );

    event UserAdded(address userAddress);

    event Error(string _err);

    constructor() public {
        owner = msg.sender;
        verificationthresh = 2;
        users[msg.sender] = User({
            exists: true,
            userAddress: msg.sender,
            publicKey: "",
            userName: "God",
            userAvatar: "data",
            numVerifications: 10
        });
    }

    function addUser(
        address payable userAddress,
        string memory userName,
        string memory userAvatar,
        string memory publicKey
    ) public returns (bool) {
        require(
            users[msg.sender].numVerifications >= verificationthresh,
            "Only verified users can add new users"
        );
        users[userAddress] = User({
            exists: true,
            userAddress: userAddress,
            publicKey: publicKey,
            userName: userName,
            userAvatar: userAvatar,
            numVerifications: 0
        });
        emit UserAdded(
            users[msg.sender].userAddress,
            users[msg.sender].userName,
            users[msg.sender].userAvatar,
            users[msg.sender].publicKey
        );
        return true;
    }

    function addVerification(address userAddress)
        public
        returns (string memory _feedback)
    {
        // Add a verfier to this user's hash

        // If the verifier isnt verified himself, throw.
        require(
            users[msg.sender].numVerifications >= verificationthresh,
            "verifier has not enough verifications."
        );

        uint256 numval = users[userAddress].numVerifications;
        users[userAddress].verifications[msg.sender] = true;
        users[userAddress].numVerifications = numval + 1;

        emit VerificationAdded(
            msg.sender,
            userAddress,
            users[userAddress].numVerifications
        );
    }

    function giveGodVerification(address payable userAddress)
        public
        onlyOwner
        returns (bool)
    {
        users[userAddress].numVerifications = 10;
        return true;
    }

    function readUser(address userAddress)
        public
        view
        returns (
            string memory userName,
            string memory userAvatar,
            string memory publicKey,
            uint256 numVerifications
        )
    {
        return (
            users[userAddress].userName,
            users[userAddress].userAvatar,
            users[userAddress].publicKey,
            users[userAddress].numVerifications
        );
    }

    function checkVeracity(address payable userAddress)
        public
        view
        returns (uint256 numVerifications)
    {
        return users[userAddress].numVerifications;
    }
}
