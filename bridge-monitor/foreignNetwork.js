'use strict'

const { FOREIGN_PARITY_WS, FOREIGN_CONTRACT_ADDRESS } = require('./config')
const CONTRACTS_DIR = '../compiled_contracts'
const CONTRACT_NAME = 'ForeignBridge'

const Web3 = require('web3')
const web3 = new Web3(FOREIGN_PARITY_WS)

const fs = require('fs')
const path = require('path')
const abiJSON = fs.readFileSync(path.join(__dirname, '../compiled_contracts/ForeignBridge.abi'))
const abi = JSON.parse(abiJSON)

module.exports = {
  getContract: () => {
    console.log(`Retrieving contract ${CONTRACT_NAME} (${FOREIGN_CONTRACT_ADDRESS}) from ${FOREIGN_PARITY_WS}.`)
    return new web3.eth.Contract(abi, FOREIGN_CONTRACT_ADDRESS)
  }
}
