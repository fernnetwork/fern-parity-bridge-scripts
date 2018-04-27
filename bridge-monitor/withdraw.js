'use strict'
const { AUTHORITY_ADDRESS } = require('./config')
const foreignContract = require('./foreignNetwork').getContract()

const WITHDRAW_AMOUNT = 1000000000000000
const HOME_GAS_PRICE = 200000

const transfer = async (authorityAddress, value, homeGasPrice) => {
  try {
    await foreignContract.methods.transferHomeViaRelay(authorityAddress, value, homeGasPrice)
      .send({ from: authorityAddress })
    console.log(`Successfully transferred ${WITHDRAW_AMOUNT} back to home network.`)
  } catch (err) {
    console.error(`Unable to make a transfer to home network via relay: ${err}`)
  }
}

transfer(AUTHORITY_ADDRESS, WITHDRAW_AMOUNT, HOME_GAS_PRICE)
