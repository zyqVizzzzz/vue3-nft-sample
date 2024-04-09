import axios from "axios";

const key = import.meta.env.VITE_PINATA_KEY;
const secret = import.meta.env.VITE_PINATA_SECRET;

export const pinJSONToIPFS = async (JSONBody) => {
	const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
	console.log(key, secret);
	return axios
		.post(url, JSONBody, {
			headers: {
				pinata_api_key: key,
				pinata_secret_api_key: secret,
			},
		})
		.then(function (response) {
			return {
				success: true,
				pinataUrl:
					"https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
			};
		})
		.catch(function (error) {
			console.log(error);
			return {
				success: false,
				message: error.message,
			};
		});
};

// https://gateway.pinata.cloud/ipfs/QmSnVy4jcHn5uYSL91vc1SfC3Wpom4d3BGdf4SD9cn5Yfy
