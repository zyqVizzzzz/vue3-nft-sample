# vue3-nft-sample

Vue3 x Ethers.js, building an NFT application from 0 to 1

## 概述

nft-contract：编写 NFT 合约并部署。

nft-mint：铸造 NFT 的 Web 应用。

## nft-contract：部署合约

### 安装依赖

```sh
npm install
```

### 在 nft-contract 目录下创建 .env 文件，其中有三个变量：

```
API_URL = <your-alchemy-rpc-url>
API_KEY = <your-alchemy-api-key>
PRIVATE_KEY = <your-metamask-wallet-privatekey>
```

首先，到 Alchemy 网站上创建一个账号，地址：[Alchemy](https://dashboard.alchemy.com/apps/51spyw2famppd7rh)。

进入 Apps Dashboard，点击 `Create new app`，chain 选择 `Ethereum`，Network 选择 `Sepolia`，然后就可以获取到 `API_URL` 和 `API_KEY` 了。

PRIVATE_KEY 是以太坊的钱包私钥，在 Metamask 的`账户详情`里可以获得。最好创建一个专门用来测试的钱包，然后到[[text](https://www.alchemy.com/faucets/ethereum-sepolia)](https://www.alchemy.com/faucets/ethereum-sepolia) 领一点测试币。

### 部署

打开命令行：`npx hardhat run scripts/deploy.js --network sepolia`

成功之后应该会输出：

```
Compiled 18 Solidity files successfully (evm target: paris).
Contract deployed to address: 0x7130Df343097ED88d112Cec1B366bDaa3530a67e
```

复制合约地址，到 Sepolia 浏览器检查一下：[Sepolia Etherscan](https://sepolia.etherscan.io/)。
