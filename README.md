# Fern-Kovan Bridge
Scripts and configuration files for testing parity bridge between Fern and Kovan network.

Tested with `9fef322` of [Parity Bridge](https://github.com/paritytech/parity-bridge).

The setup uses a test address `0x06ecd9d5f588a57d6e696253f95265bd61bee378` with some ethers in the Kovan network.

To test this, make sure you create an account and request some ethers from [faucet](https://gitter.im/kovan-testnet/faucet).

## Getting Started

### Start Parity Bridge

#### Steps
1. Copy the `parity-bridge` & `parity-bridge-deploy` binaries from `bin` to a folder in your `PATH`
2. Start a parity node connecting to the home (Kovan) network: 
```
$ sh parity_home_start.sh
```
3. Start a parity node connecting to the foreign (fern) netowork:
```
$ sh parity_foreign_start.sh
``` 
4. Deploy the bridge contracts:
```
$ sh bridge_deploy.sh
```
5. Once contracts are deployed, start the bridge:
```
$ sh bridge_start.sh
```

### Bridge Monitor
Bridge Monitor is a simple nodejs app that monitors the bridge contracts from both networks, and output events to the console.

### Prerequisites
- nodejs >= v8.11.1

### Steps
1. Copy the `.env.example` file to `.env`
2. Replace the `HOME_CONTRACT_ADDRESS` and `FOREIGN_CONTRACT_ADDRESS` with the addresses from the deployment. You can find them under `bridge_db.toml` after parity-bridge contracts are deployed.
3. Run the Bridge Monitor:
```
$ npm start
```

## Steps for Transferring Between the Two Networks

### Prerequisites
- Parity bridge running
- MetaMask installed

### Depositing eth from Home Network into the Foreign Network
1. If you want to see the events and results in action, make sure to start the `Bridge Monitor`.
2. Open MetaMask and switch to Kovan network.
3. Make sure the correct account is selected, transfer a small amount of ether to the `HOME_CONTRACT_ADDRESS` (you can find the address from `bridge_db.toml` after you complete parity bridge deployment)
4. Once the transaction is submitted, you should see the following events from `Bridge Monitor`:
```
[HOME] Event: Deposit
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "1000000000000000",
  "recipient": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "value": "1000000000000000"
}
[BALANCE] 0x06ecd9d5f588a57d6e696253f95265bd61bee378 now has 1000000000000000 tokens in foreign network.
[FOREIGN] Event: Transfer
Data: {
  "0": "0x0000000000000000000000000000000000000000",
  "1": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "2": "1000000000000000",
  "from": "0x0000000000000000000000000000000000000000",
  "to": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "tokens": "1000000000000000"
}
[FOREIGN] Event: Deposit
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "1000000000000000",
  "2": "0x71694415e46e0fc3666ca1c156c8ed6e43ebc31e60240b74795e4855b5b91ba9",
  "recipient": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "value": "1000000000000000",
  "transactionHash": "0x71694415e46e0fc3666ca1c156c8ed6e43ebc31e60240b74795e4855b5b91ba9"
}
[BALANCE] 0x06ecd9d5f588a57d6e696253f95265bd61bee378 now has 2000000000000000 tokens in foreign network.
```

### Withdrawing tokens from Foreign Network back to the Foreign Network
1. If you want to see the events and results in action, make sure to start the `Bridge Monitor`.
2. Follow the steps in the above section to transfer 0.001 eth into the foreign network. Verify that you have at least 0.001 eth worth of tokens (1000000000000000) in the foreign network using `Bridge Monitor`.
3. Run the `npm run withdraw` task to trigger the withdraw. By default, it attempts to withdraw 1000000000000000 tokens.
4. Check the `Bridge Monitor` for results. If you see something like below, the tokens is successfully withdrawn and transferred back to the address in the home network.
```
[BALANCE] 0x06ecd9d5f588a57d6e696253f95265bd61bee378 now has 2000000000000000 tokens in foreign network.
[FOREIGN] Event: Transfer
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "0x0000000000000000000000000000000000000000",
  "2": "1000000000000000",
  "from": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "to": "0x0000000000000000000000000000000000000000",
  "tokens": "1000000000000000"
}
[FOREIGN] Event: Withdraw
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "1000000000000000",
  "2": "200000",
  "recipient": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "value": "1000000000000000",
  "homeGasPrice": "200000"
}
[FOREIGN] Event: CollectedSignatures
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "0x877fecd5316961b99010568cc6a09b5be8a06db7133846d04e35c729963914a4",
  "authorityResponsibleForRelay": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "messageHash": "0x877fecd5316961b99010568cc6a09b5be8a06db7133846d04e35c729963914a4"
}
[BALANCE] 0x06ecd9d5f588a57d6e696253f95265bd61bee378 now has 1000000000000000 tokens in foreign network.
[HOME] Event: Withdraw
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "999960000000000",
  "2": "0x0208b23c0a6eda8fece6a503ecd6cca04bc500d2e87e03fbea709ec5e222ba77",
  "recipient": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "value": "999960000000000",
  "transactionHash": "0x0208b23c0a6eda8fece6a503ecd6cca04bc500d2e87e03fbea709ec5e222ba77"
}
```
5. Verify your balance on [Etherscan](https://kovan.etherscan.io).
