# start foreign node
cd foreign && \
  parity --config authority.toml --keys-path . --ipc-path ./jsonrpc.ipc \
  --unlock 0x06ecd9d5f588a57d6e696253f95265bd61bee378 --password password
