'use strict'

const { HOME_PARITY_WS, HOME_CONTRACT_ADDRESS } = require('./config')
const CONTRACTS_DIR = '../compiled_contracts'
const CONTRACT_NAME = 'HomeBridge'

const Web3 = require('web3')
const web3 = new Web3(HOME_PARITY_WS)

const fs = require('fs')
const path = require('path')
const abiJSON = fs.readFileSync(path.join(__dirname, '../compiled_contracts/HomeBridge.abi'))
const abi = JSON.parse(abiJSON)

module.exports = {
  web3,
  getContract: () => {
    console.log(`Retrieving contract ${CONTRACT_NAME} (${HOME_CONTRACT_ADDRESS}) from ${HOME_PARITY_WS}.`)
    return new web3.eth.Contract(abi, HOME_CONTRACT_ADDRESS)
  }
}
