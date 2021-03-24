pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract KurateNFT is ERC721URIStorage {
    constructor() public ERC721("Kurate by swarm.city", "KURA") {}

    function mintToken(
        address receiver,
        uint256 serial,
        string memory tokenURI
    ) 
    public 
    returns (uint256) 
    {
        _safeMint(receiver, serial);
        _setTokenURI(serial, tokenURI);
        return serial;
    }
}