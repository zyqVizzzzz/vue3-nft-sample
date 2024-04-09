require("dotenv").config();
const ethers = require("ethers");

const API_KEY = process.env.API_KEY;
const provider = new ethers.AlchemyProvider("sepolia", API_KEY);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// 创建 signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// 定义 abi 和 address
const abi = contract.abi;
const contractAddress = "0x7130Df343097ED88d112Cec1B366bDaa3530a67e";

// 创建合约实例
const myNftContract = new ethers.Contract(contractAddress, abi, signer);

const tokenUri =
	"https://gateway.pinata.cloud/ipfs/QmWz4AEJSYmLbZmASezdChbKxTc6gh6fnzjuJtXftsq2uc";

const mintNFT = async () => {
	let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri);
	await nftTxn.wait();
	console.log(
		`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
	);
};

mintNFT()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
