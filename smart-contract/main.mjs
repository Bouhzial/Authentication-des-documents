import Web3 from 'web3'
// const artifacts = require('./build/Inbox.json');

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

const accounts = await web3.eth.getAccounts();

console.log(accounts)