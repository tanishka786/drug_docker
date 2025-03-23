#!/bin/bash

# Start Ganache in the background
ganache -h 0.0.0.0 -p 7545 -d -i 5777 &

# Wait for Ganache to start
echo "Waiting for Ganache to start..."
sleep 5

# Compile contracts
echo "Compiling contracts..."
truffle compile

# Migrate contracts
echo "Migrating contracts..."
truffle migrate --reset

# Keep container running
tail -f /dev/null