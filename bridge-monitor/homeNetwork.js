'use strict'
/**
 * Creates a contract instance for interacting with the HomeBridge smart contract.
 *
 * @author Jimmy Chen
 */
const fs = require('fs')
const path = require('path')
const Web3 = require('web3')
const { HOME_PARITY_WS, HOME_CONTRACT_ADDRESS } = require('./config')

const CONTRACTS_DIR = '../compiled_contracts'
const CONTRACT_NAME = 'HomeBridge'

const web3 = new Web3(HOME_PARITY_WS)
const abiJSON = fs.readFileSync(path.join(__dirname, CONTRACTS_DIR, `${CONTRACT_NAME}.abi`))
const abi = JSON.parse(abiJSON)

module.exports = {
  getContract: () => {
    console.log(`Retrieving contract ${CONTRACT_NAME} (${HOME_CONTRACT_ADDRESS}) from ${HOME_PARITY_WS}.`)
    return new web3.eth.Contract(abi, HOME_CONTRACT_ADDRESS)
  }
}
