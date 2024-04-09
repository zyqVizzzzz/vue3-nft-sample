<script setup>
import { ref, onMounted } from "vue";
import {
	connectWallet,
	getCurrentWalletConnected,
	mintNFT,
} from "../utils/interact";
defineProps({
	msg: String,
});
const walletAddress = ref("");
const url = ref("");
const name = ref("");
const description = ref("");
const status = ref("");

const connectWalletPressed = async () => {
	// 处理连接钱包按钮的逻辑
	const walletResponse = await connectWallet();
	status.value = walletResponse.status;
	walletAddress.value = walletResponse.address;
};

const onMintPressed = async () => {
	// 处理 Mint NFT 按钮的逻辑
	const { status } = await mintNFT(url, name, description);
	console.log(status);
	status.value = status;
};

const addWalletListener = () => {
	if (window.ethereum) {
		window.ethereum.on("accountsChanged", (accounts) => {
			if (accounts.length > 0) {
				walletAddress.value = accounts[0];
				status.value = "👆🏽 Write a message in the text-field above.";
			} else {
				setWawalletAddress.value = "";
				status.value = "🦊 Connect to Metamask using the top right button.";
			}
		});
	} else {
		status.value = "You must install Metamask in your browser.";
	}
};

onMounted(async () => {
	const walletResponse = await getCurrentWalletConnected();
	status.value = walletResponse.status;
	walletAddress.value = walletResponse.address;

	addWalletListener();
});
</script>

<template>
	<h1>{{ msg }}</h1>
	<div class="Minter">
		<button id="walletButton" @click="connectWalletPressed">
			<span v-if="walletAddress.length > 0">
				Connected: {{ walletAddress.substring(0, 6) }}...
				{{ walletAddress.substring(38) }}
			</span>
			<span v-else> Connect Wallet </span>
		</button>
		<br />
		<form>
			<h2>🖼 Link to asset:</h2>
			<input
				type="text"
				placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
				v-model="url"
			/>
			<h2>🤔 Name:</h2>
			<input type="text" placeholder="e.g. My first NFT!" v-model="name" />
			<h2>✍️ Description:</h2>
			<input
				type="text"
				placeholder="e.g. Even cooler than cryptokitties ;)"
				v-model="description"
			/>
		</form>
		<button id="mintButton" @click="onMintPressed">Mint NFT</button>
		<p id="status">
			{{ status }}
		</p>
	</div>
</template>

<style scoped></style>
