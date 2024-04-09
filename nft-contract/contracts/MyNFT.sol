// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 继承 ERC721 标准的所有方法，要制作有效的 NFT ，必须实现所有方法
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
// 跟踪铸造的 NFT 总数，并为新 NFT 设置唯一 ID
import "@openzeppelin/contracts/utils/Counters.sol"; 
// 设置访问控制，只有合约所有者才能铸造 NFT
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}