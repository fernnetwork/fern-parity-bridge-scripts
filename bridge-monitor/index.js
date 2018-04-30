'use strict'
/**
 * Bridge Monitor is a simple nodejs app that monitors the bridge contracts from both networks, and
 *  output events to the console.
 *
 * @author Jimmy Chen
 */
const { AUTHORITY_ADDRESS } = require('./config')
const homeBridge = require('./homeNetwork').getContract()
const foreignBridge = require('./foreignNetwork').getContract()

const eventLogger = (type) => {
  return (error, event) => {
    if (error) {
      console.error(`[${type}] Error: ${error}`)
    } else {
      console.log(`[${type}] Event: ${event.event}\nData: ${JSON.stringify(event.returnValues, null, 2)}`)
    }
  }
}

homeBridge.events.allEvents(eventLogger('HOME'))
foreignBridge.events.allEvents(eventLogger('FOREIGN'))

setInterval(async () => {
  const result = await foreignBridge.methods.balanceOf(AUTHORITY_ADDRESS).call()
  console.log(`[BALANCE] ${AUTHORITY_ADDRESS} now has ${result} tokens in foreign network.`)
}, 5000)
