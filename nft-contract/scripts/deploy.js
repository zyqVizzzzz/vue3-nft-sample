async function main() {
	const myNFTContract = await ethers.getContractFactory("MyNFT");
	const myNFT = await myNFTContract.deploy();
	console.log("Contract deployed to address:", myNFT.target);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
