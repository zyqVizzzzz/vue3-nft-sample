import { ethers } from "ethers";
import { pinJSONToIPFS } from "./pinata.js";
import contract from "./MyNFT.json";

const contractABI = contract.abi;
const contractAddress = "0x7130Df343097ED88d112Cec1B366bDaa3530a67e";

export const connectWallet = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const obj = {
				status: "👆🏽 Write a message in the text-field above.",
				address: addressArray[0],
			};
			return obj;
		} catch (err) {
			return {
				address: "",
				status: "😥 " + err.message,
			};
		}
	} else {
		return {
			address: "",
			status: "you must install Metamask in your browser",
		};
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: "👆🏽 Write a message in the text-field above.",
				};
			} else {
				return {
					address: "",
					status: "🦊 Connect to Metamask using the top right button.",
				};
			}
		} catch (err) {
			return {
				address: "",
				status: "😥 " + err.message,
			};
		}
	} else {
		return {
			address: "",
			status: "you must install Metamask in your browser",
		};
	}
};

export const mintNFT = async (url, name, description) => {
	const metadata = new Object();
	metadata.name = name;
	metadata.image = url;
	metadata.description = description;
	const pinataResponse = await pinJSONToIPFS(metadata);
	if (!pinataResponse.success) {
		return {
			success: false,
			status: "😢 Something went wrong while uploading your tokenURI.",
		};
	}
	const tokenURI = pinataResponse.pinataUrl;

	try {
		const web3Provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await web3Provider.getSigner();

		// 连接钱包到合约
		const nftContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer
		);

		// 执行合约方法
		let nftTx = await nftContract.mintNFT(
			window.ethereum.selectedAddress,
			tokenURI
		);

		// 等待交易确认
		await nftTx.wait();

		return {
			success: true,
			status: `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/${nftTx.hash}`,
		};
	} catch (error) {
		return {
			success: false,
			status: "😥 Something went wrong: " + error.message,
		};
	}
};
