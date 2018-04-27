# Fern-Kovan Bridge
Experimental scripts and configuration files for running a parity bridge instance between Fern and Kovan network.

The setup uses a test address `0x06ecd9d5f588a57d6e696253f95265bd61bee378` with some ethers in the Kovan network.

To test this, make sure you create an account and request some ethers from [faucet](https://gitter.im/kovan-testnet/faucet).

# Getting Started

## Start Parity Bridge

### Prerequisites
- parity
- parity-bridge

### Steps
1. Copy the `parity-bridge` & `parity-bridge-deploy` binaries from `bin` to a folder in your `PATH`
2. Start a parity node connecting to the home (Kovan) network: 
```
$ ./parity_home_start.sh
```
3. Start a parity node connecting to the foreign (fern) netowork:
```
$ ./parity_foreign_start.sh
``` 
4. Deploy the bridge contracts:
```
$ ./bridge_deploy.sh
```
5. Once contracts are deployed, start the bridge:
```
$ ./bridge_start.sh
```

## Start Bridge Monitor

### Prerequisites
- nodejs >= v8.11.1

### Steps
1. Copy the `.env.example` file to `.env`
2. Replace the `HOME_CONTRACT_ADDRESS` and `FOREIGN_CONTRACT_ADDRESS` with the addresses from the deployment. You can find it under `bridge_db.toml` after parity-bridge contracts are deployed.
3. Run the Bridge Monitor:
```
$ npm start
```

## Transferring eth into the Foreign Contract

### Prerequisites
- Parity bridge running
- MetaMask installed

### Steps
1. If you want to see the events and results in action, mmake sure to start the `Bridge Monitor`.
2. Open MetaMask and switch to Kovan network.
3. Make sure the correct account is selected, transfer a small amount of ether to the `HOME_CONTRACT_ADDRESS` (you can find the address from `bridge_db.toml` after you complete parity bridge deployment)
4. You should see the following events from `Bridge Monitor`:
```
[HOME] Event: Deposit
Data: {
  "0": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "1": "1000000000000000",
  "recipient": "0x06EcD9D5F588a57d6E696253f95265Bd61bEe378",
  "value": "1000000000000000"
}
[DEPOSIT] Event: Deposit
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

Yay!