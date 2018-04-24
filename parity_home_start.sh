# Start home node
cd home && \
  parity --chain kovan  --keys-path . --ipc-path ./jsonrpc.ipc --port 30302 \
  --unlock 0x06ecd9d5f588a57d6e696253f95265bd61bee378 --password password
