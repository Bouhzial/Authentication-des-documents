const Web3 = require("web3");
const path = require("path");
require('dotenv').config();
// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync(path.join(__dirname, "/build/contracts/DiplomaContract.json")));

async function main() {
    // Configuring the connection to an Ethereum node
    const network = "sepolia";
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            process.env.INFURA_API
        )
    );
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.PRIVATE_KEY_OWNER
    );
    web3.eth.accounts.wallet.add(signer);

    // Using the signing account to deploy the contract
    const contract = new web3.eth.Contract(abi);
    contract.options.data = bytecode;
    const deployTx = contract.deploy();
    const deployedContract = await deployTx
        .send({
            from: signer.address,
            gas: 1000000,
        })
        .once("transactionHash", (txhash) => {
            console.log(`Mining deployment transaction ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        });
    // The contract is now deployed on chain!
    console.log(`Contract deployed at ${deployedContract.options.address}`);
    console.log(
        `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
    );
}

require("dotenv").config();
main();