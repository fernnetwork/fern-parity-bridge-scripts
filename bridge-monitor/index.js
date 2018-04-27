'use strict'

const { AUTHORITY_ADDRESS } = require('./config')
const homeNetwork = require('./homeNetwork')
const foreignNetwork = require('./foreignNetwork')

const eventLogger = (type) => {
  return (error, event) => {
    if(error) {
      console.error(`[${type}] Error: ${error}`)
    } else {
      console.log(`[${type}] Event: ${event.event}\nData: ${event.returnValues}`)
    }
  }
}

const homeContract = homeNetwork.getContract()
homeContract.events.allEvents(eventLogger('HOME'))
homeContract.events.Deposit(eventLogger('DEPOSIT'))

const foreignContract = foreignNetwork.getContract()
foreignContract.events.allEvents(eventLogger('FOREIGN'))

setInterval(async () => {
  const result = await foreignContract.methods.balanceOf(AUTHORITY_ADDRESS).call()
  console.log(`[BALANCE] ${AUTHORITY_ADDRESS} now has ${result} tokens in foreign network.`)
}, 5000)