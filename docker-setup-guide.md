# Blockchain+ React Project

This project combines a Truffle-based blockchain environment with a React frontend application to create a decentralized application (DApp). The entire setup is dockerized to provide a consistent development environment.

## Project Structure

```
/blockchain-react-project
│── /client (React Frontend)
│── /contracts (Solidity contracts)
│── /migrations (Truffle migrations)
│── /test (Truffle tests)
│── truffle-config.js (Truffle Configuration)
│── Dockerfile (For Truffle/Ganache)
│── docker-entrypoint.sh (Startup script)
│── docker-compose.yml (For managing multiple containers)
```

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29.0 or higher)
- [MetaMask](https://metamask.io/download/) browser extension (for interacting with the blockchain)

## Getting Started with Docker

Docker makes it easy to run this project without installing all the dependencies directly on your machine. Here's how to get started:

### Step 1: Clone the Repository

```bash
git clone https://github.com/tanishka786/Drug_Blockchain.git
cd Drug_Blockchain
```

### Step 2: Start the Docker Containers

This command will build and start all necessary containers:

```bash
docker-compose up --build
```

This will:
1. Start a Ganache blockchain on port 7545
2. Compile and deploy your smart contracts
3. Start the React frontend on port 3000

> **Note for beginners:** When you run this command, Docker will download necessary images and build your project containers. This might take a few minutes the first time.

### Running in Detached Mode

To run the application in the background (detached mode):

```bash
docker-compose up -d
```

This is useful when you want to continue using your terminal for other tasks. The containers will run in the background.

### Step 3: Access the Application

Once the containers are running:

- The React frontend will be available at: http://localhost:3000
- The Ganache blockchain will be available at: http://localhost:7545

### Step 4: Configure MetaMask with Ganache Accounts

To interact with your blockchain from the browser, you'll need to set up MetaMask with one of the pre-funded Ganache accounts.

#### First, configure the network:

1. Open MetaMask in your browser
2. Click on the network dropdown at the top
3. Select "Add Network" or "Custom RPC"
4. Enter the following details:
   - Network Name: `Local Ganache`
   - RPC URL: `http://localhost:7545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
5. Click "Save"

#### Then, import a Ganache account:

1. View the Ganache logs to see available accounts and private keys (see "Viewing Logs" section below)
2. In MetaMask, click on your account icon in the top-right corner
3. Select "Import Account"
4. Change the "Select Type" to "Private Key"
5. Copy a private key from the Ganache logs (without the "0x" prefix)
6. Paste it into MetaMask and click "Import"

You now have a pre-funded account with 1000 ETH for testing!

#### Example of Ganache account information from logs:

```
Available Accounts
==================
(0) 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 (1000 ETH)
(1) 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0 (1000 ETH)
...

Private Keys
==================
(0) 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
(1) 0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
...
```

## Viewing Logs

### If running in foreground mode:

The logs will automatically display in your terminal.

### If running in detached mode:

To view logs from all containers:

```bash
docker-compose logs
```

To view logs from a specific service:

```bash
# View Ganache logs (including account information)
docker-compose logs ganache

# View React client logs
docker-compose logs client
```

### To follow logs in real-time:

```bash
docker-compose logs -f
```

Or for a specific service:

```bash
docker-compose logs -f ganache
```

> **Tip:** To find the Ganache account information, look for the "Available Accounts" and "Private Keys" sections in the Ganache logs. These contain the addresses and private keys you'll need for MetaMask.

## Docker Commands Reference

Here are some useful Docker commands for managing your project:

### Start the application

```bash
docker-compose up
```

### Start in detached mode (run in background)

```bash
docker-compose up -d
```

### Stop the application

```bash
docker-compose down -v
```

### Restart a specific service

```bash
docker-compose restart ganache
```

### Rebuild containers after making changes

```bash
docker-compose up --build
```

### Check container status

```bash
docker-compose ps
```

## Understanding the Docker Setup

For those new to Docker, here's a breakdown of how our setup works:

### docker-compose.yml

This file defines our multi-container application:

- **ganache service**: Runs a local Ethereum blockchain for development
- **client service**: Runs the React frontend application

Each service is built from its own Dockerfile and has specific port mappings and volume mounts.

### Volumes

We use Docker volumes to:

1. Share contract artifacts between the blockchain and frontend containers
2. Enable hot-reloading of code changes without restarting containers
3. Persist blockchain data between sessions

### Networks

Both containers are on the same Docker network, allowing them to communicate with each other securely.

## Troubleshooting

### MetaMask can't connect to the network

- Make sure the Ganache container is running
- Verify you've entered the correct RPC URL (http://localhost:7545) and Chain ID (5777)
- Try resetting your MetaMask account (Settings → Advanced → Reset Account)

### Contracts not appearing in the frontend

- Check the Docker logs to ensure contracts were compiled and migrated successfully
- Verify that the artifacts volume is properly mounted in both containers
- Try rebuilding the containers: `docker-compose up --build`

### Changes to your code aren't reflected

- For contract changes: You'll need to restart the ganache service to recompile and redeploy
- For frontend changes: They should automatically reload, but you may need to hard refresh your browser

### Cannot import account in MetaMask

- Make sure you're copying only the private key without the "0x" prefix
- Ensure you're selecting "Private Key" as the import type in MetaMask
- Verify the Ganache container is running properly

### Transactions failing or being rejected

- Check that you're connected to the correct network in MetaMask
- Ensure you're using an account with sufficient ETH
- Try resetting your MetaMask account if you've previously used a different Ganache instance

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Truffle Documentation](https://trufflesuite.com/docs/)
- [Ganache Documentation](https://trufflesuite.com/docs/ganache/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MetaMask Documentation](https://docs.metamask.io/)

## Mnemonic Phrase for Account Recovery

If you need to recover all the Ganache accounts at once, you can use the HD Wallet mnemonic phrase from the logs:

```
Mnemonic: myth like bonus scare over problem client lizard pioneer submit female collect
```

This can be imported into MetaMask to recover all accounts at once instead of importing individual private keys.