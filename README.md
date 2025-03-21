# From Zero to dApp: Your First Blockchain Application Workshop 🚀

Welcome to the "From Zero to dApp" workshop! In this beginner-friendly, hands-on session, you'll learn the fundamentals of decentralized app development—from understanding smart contracts to integrating a user interface and deploying on-chain. No prior experience is required; just bring your curiosity and readiness to build. By the end of this workshop, you'll have created and deployed your very first dApp and be well on your way to mastering blockchain technology.

We use the [scaffoldeth.io](https://scaffoldeth.io/) framework to streamline development, making it easier than ever to build, test, and deploy your dApp.

## What You'll Learn

- **Local Blockchain Setup:** Run your own development chain using Hardhat.
- **Smart Contract Development:** Write, deploy, and interact with smart contracts.
- **Frontend Integration:** Connect your dApp to the blockchain using Next.js, wagmi, and Scaffold-ETH hooks.
- **Live Deployment:** Deploy your smart contract without managing private keys manually, and host your frontend on Vercel.


## Workshop Contents

This repository contains:
- **Smart Contract:** A Solidity contract that manages a greeting message, allows setting a beneficiary, and handles fund withdrawals.
- **Frontend:** A Next.js application that reads the beneficiary address and includes a button to trigger the withdrawal.
- **Deployment Scripts & Instructions:** Step-by-step guides for local development and deploying to a live network.


## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/sheinix/my-first-dapp.git
cd my-first-dapp
```

### 2. Install Dependencies

Install the required packages:

```bash
yarn install
```

### 3. Running the Local Environment

In three separate terminal windows, start the following:

1. **Start the Local Blockchain:**

   ```bash
   yarn chain
   ```

2. **Launch the Frontend:**

   ```bash
   yarn start
   ```

3. **Deploy the Smart Contract Locally:**

   ```bash
   yarn deploy
   ```


## Workshop Walkthrough

### A. Exploring the Smart Contract

The smart contract (\`YourContract.sol\`) is designed to let anyone change a greeting message while tracking the number of changes. It also allows the owner to update and retrieve a beneficiary address and enables the beneficiary to withdraw funds from the contract.

For the complete smart contract code, please refer to:  
[packages/hardhat/contracts/YourContract.sol](packages/hardhat/contracts/YourContract.sol)

> **Tip:** If you're new to Solidity, visit [Solidity by Example](https://solidity-by-example.org/) for simple, clear examples. This resource is a great starting point and will help you during the hackathon when you're in doubt.


### B. Updating the Frontend

The frontend code is built with Next.js. It uses wagmi and Scaffold-ETH hooks to interact with your smart contract. In this example, the UI displays the current beneficiary and includes a button to trigger the withdrawal function.

For the complete frontend implementation, please see:  
[packages/nextjs/app/page.tsx](packages/nextjs/app/page.tsx)

> **Tip:** Check out [Scaffold-ETH Docs](https://docs.scaffoldeth.io/) for examples of different components and hooks. This will give you a better understanding of how to structure your code and leverage available tools.


### C. Deploying to a Live Network

After testing locally, you can deploy your smart contract to an actual blockchain network without the hassle of manually managing private keys.

1. **Generate Your Deployer Account**

   You can generate a random account / private key by running:

   ```bash
   yarn generate
   ```

    It will automatically add the encrypted private key (DEPLOYER_PRIVATE_KEY_ENCRYPTED) in your .env file.
    
    You will be prompted to enter a password which will be used to encrypt your private key. Make sure to remember this password as you'll need it for future deployments and account queries.

    > **Info** The plain private key is stored in memory, it's never stored in disk files for security reasons.

    If you prefer to import your private key, run:

    ```
    yarn account:import
    ```

2. **Send funds to the account**

    Use the following command to view all available networks and your deployer account address:

    ```bash
    yarn account
    ```

    Copy the deployer account address displayed in the output. Select the network you want to use (e.g., Sepolia) and send some funds to the deployer account. This step ensures your account has enough balance to cover deployment costs.

2. **Deploy the Contract**

   With your deployer account generated, deploy your contract using:

   ```bash
   yarn deploy --network sepolia
   ```

   This command uses your generated account to deploy your smart contracts to the selected network (e.g., Sepolia).

3. **Verify Your Contract (Optional)**

   If desired, follow your network's instructions to verify the deployed contract on a block explorer (such as Etherscan).

### D. Deploying the Frontend on Vercel

To host your frontend application, you'll need a Vercel account linked with your GitHub.

1. **Link Your GitHub Account to Vercel**

   Make sure your GitHub account is connected to Vercel.

2. **Deploy with Vercel**

   Run the following command to deploy your frontend:

   ```bash
   yarn vercel:yolo
   ```

   This command will automatically build and deploy your Next.js application to Vercel.


## Interacting with external smart contracts

- NZDD Sepolia Contract Address: `0xe91d143072fc5e92e6445f18aa35dbd43597340c`
- NZDD Mainnet Contract Address: `0x2dd087589ce9c5b2d1b42e20d2519b3c8cf022b7`
- Openzeppelin ERC20 Docs: https://docs.openzeppelin.com/contracts/2.x/api/token/erc20
- Get information about chain ids: https://chainlist.org/
- Find the getAbi.ts script [here](packages/hardhat/scripts/getAbi.ts)


## Conclusion

By completing this workshop, you have:

- Set up a local blockchain environment using Hardhat.
- Developed and deployed a smart contract with beneficiary and withdrawal functionality.
- Built a React-based frontend to interact with your smart contract.
- Deployed your dApp to a live network using a generated deployer account, and hosted your frontend on Vercel with a single command.
- Interacted with external contracts deployed on the blockchain.
- Interacted with NZDD on your own smart contract.

Feel free to ask questions or reach out for help during the workshop. Enjoy your blockchain journey and happy building!
