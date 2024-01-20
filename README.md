# Buy Me a Drink Platform

## Description

This project implements a "Buy Me a Drink" smart contract on the Ethereum blockchain. Users can contribute funds to the contract with personalized messages, view all transactions, and withdraw the collected funds.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Metamask browser extension

### Installation

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Usage

1. Connect your Metamask wallet to the dApp( on local host network).
2. Enter your name, message, and the amount you want to contribute.
3. Click "Buy me a drink" to contribute funds with a personalized message.
4. Click "Withdraw all drinks money" to withdraw all funds.
5. Click "View all Memos" to see a list of all contributions with names, amounts, and messages.

## Authors

Otaiki Sadiq  

## License

This project is licensed under the unlicensed License 



