pragma solidity ^0.8.0;

contract UserRegistry {
    address public owner;

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
        address userAddress;
        string publicKey;
        string userName;
        string userAvatar;
        mapping(address => bool) verifications;
        uint256 numVerifications;
    }

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

    uint256 numUsers;
    mapping(address => User) users;

    function createUser(
        address userAddress,
        string memory publicKey,
        string memory userName,
        string memory userAvatar
    ) public returns (bool) {
        require(
            users[msg.sender].numVerifications >= verificationthresh,
            "Only verified users can add new users"
        );
        User storage r = users[userAddress];
        r.userAddress = userAddress;
        r.publicKey = publicKey;
        r.userName = userName;
        r.userAvatar = userAvatar;
        r.exists = true;
        r.numVerifications = 0;

        emit UserAdded(
            users[msg.sender].userAddress,
            users[msg.sender].userName,
            users[msg.sender].userAvatar,
            users[msg.sender].publicKey
        );
    }

    event Error(string _err);

    constructor() public {
        owner = msg.sender;
        verificationthresh = 2;
        User storage r = users[owner];
        r.userAddress = owner;
        r.publicKey = "";
        r.userName = "Root";
        r.userAvatar = "data";
        r.exists = true;
        r.numVerifications = 10;
    }

    function addVerification(address userAddress)
        public
        returns (string memory _feedback)
    {
        // Add a verfier to this user's hash
        // If the verifier isnt verified himself, throw.
        User storage adder = users[msg.sender];

        require(
            users[msg.sender].numVerifications >= verificationthresh,
            "Only verified users can add new users"
        );

        //require(adder.numVerifications >= verificationthresh);

        User storage user = users[userAddress];
        uint256 numval = user.numVerifications;
        user.verifications[msg.sender] = true;
        user.numVerifications = numval + 1;

        emit VerificationAdded(msg.sender, userAddress, user.numVerifications);
    }

    function giveGodVerification(address payable userAddress)
        public
        onlyOwner
        returns (bool)
    {
        User storage user = users[userAddress];
        user.numVerifications = 10;
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
