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

### 环境变量

在 nft-contract 目录下创建 .env 文件，其中有三个变量：

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

## nft-minter：铸造 NFT

这里的代码参考了 Alchemy 的教程和源码，地址：[[text](https://github.com/alchemyplatform/nft-minter-tutorial)](https://github.com/alchemyplatform/nft-minter-tutorial)，源码使用 React 和 Alchemy SDK 实现，nft-minter 用 Vue3 和 Ethers.js 重新实现了一次。

### 安装依赖

```sh
npm install
```

### 环境变量

在 nft-contract 目录下创建 .env 文件，其中有两个变量：

```
VITE_PINATA_KEY = <your-pinata-key>
VITE_PINATA_SECRET = <your-pinata-secret>
```

这里要去 [pinata 官网](https://app.pinata.cloud/pinmanager) 注册一个账户，获得 Key 和 Secret 之后，把你想要制作成 NFT 的图片上传到 pinata，上传成功后，可以得到一个图片地址，例如：https://gateway.pinata.cloud/ipfs/image-hash-code

### `utils/<contract-abi>.json`

上一步部署合约后，Hardhat 会在 artifacts 文件夹里自动生成一个 json 文件，就是合约 ABI，我们把这个 json 文件复制到 `src/utils/` 文件夹里。

### 运行代码

```sh
npm run dev
```

![01](https://cholaz.xyz/_astro/article_013_01.DG27-lbD_Z1w5Ksw.webp)

先连接钱包，然后在 `Link to asset` 里输入刚才得到的图片地址，再填写其他表单项，最后点击 `Mint NFT`。

成功之后的状态如下图：

![02](https://cholaz.xyz/_astro/article_013_04.B4vjBBdS_ZgO98G.webp)

同样，也可以到 Opensea 测试网上找到刚才铸造的 NFT 。

![03](https://cholaz.xyz/_astro/article_013_05.NcqBCb55_BDxrw.webp)
