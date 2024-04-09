require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
	solidity: "0.8.24",
	defaultNetwork: "sepolia",
	networks: {
		hardhat: {},
		sepolia: {
			url: API_URL,
			accounts: [PRIVATE_KEY],
		},
	},
};
