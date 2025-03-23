### 1. **Project Title**

   - Drug Guardian

### 2. **Description**

   This website is a comprehensive platform developed to ensure the transparency, security, and efficiency of the drug supply chain. Built with HTML, CSS, and JavaScript for the front end, it provides an intuitive and user-friendly interface. The blockchain component, developed using Solidity and deployed on the Sepolia testnet, guarantees immutable and secure transactions, tracking drugs from the manufacturer to the consumer. Docker is used for containerization, ensuring scalability, portability, and easy deployment across different environments. Additionally, Truffle and Ganache UI have been utilized for blockchain development and testing. We also integrated an AI chatbot to enhance user interaction and support within the platform.

### 3. **Features**

   - Secure tracking of drugs from manufacturing to delivery
   - Tamper-proof records
   - Real-time monitoring and verification
   - Compliance with regulations
   - Access controls for different stakeholders
   - AI chatbot for user support

### 4. **Technology Stack**

   - Blockchain platform: Ethereum, Geth (Testnet) 
   - Smart contract languages: Solidity 
   - Frontend technologies: React JS
   - Backend technologies: Node.js
   - Metamask for Geth Testnet interaction ( by adding network manually)
   - Docker for containerization
   - Truffle for smart contract development and migration
   - Ganache UI for blockchain testing
   - AI chatbot for user assistance

### 5. **Installation Instructions**
### Prerequisites
- Install [Truffle](https://archive.trufflesuite.com/docs/truffle/how-to/install/)
- Install [Ganache UI](https://youtu.be/4LOeclXIxXA?si=p7j7ZVITWPBFv651)
- Install [Metamask](https://youtu.be/c7-IsFNbBZE?si=AhPFUawtZvcldh6o)

### Additional Dependencies
- Install the correct Node.js version:
  - [Node.js v14 - v18](https://archive.trufflesuite.com/docs/truffle/how-to/install/#install-nodejs)
- Install Metamask Snap Box:
  - [Metamask Snap Box](https://archive.trufflesuite.com/boxes/metamask-snap-box/)

### Steps
1. Clone the project.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the blockchain network:
   - Install Ganache.
   - Install Metamask and create an account.
   - Connect Metamask to Ganache by importing accounts into Metamask.
   - Connect Ganache with the Truffle configuration file (`truffle-config.js`) by adding the port number and network ID.

5. Initialize the project with Metamask Snap Box:
   ```bash
   truffle unbox metamask/snap-box <dir_name>
   ```
6. Compile and migrate smart contracts:
   ```bash
   npx truffle compile
   npx truffle migrate
   ```
7. Navigate to the client directory:
   ```bash
   cd client
   ```
8. Install client dependencies:
   ```bash
   yarn
   npm install
   ```
9. Start the application:
   ```bash
   yarn start
   npm start
   ```

### 6. **Usage**

   - **Interacting with the blockchain network**:
     - Access the Metamask wallet linked to the Geth Testnet to monitor transactions
     - Use the AI chatbot to guide you through the process
   - **Managing drug supply chain records**:
     - View and update drug records on the platform, which are securely stored and tracked on the blockchain
   - **Verifying transactions**:
     - Verify the authenticity of transactions using the blockchain explorer linked with Sepolia Testnet

### 7. **Smart Contracts**

   - **Description**:
     - The smart contracts handle drug creation, tracking, and delivery verification
   - **Deployment**:
     - Contracts are deployed on the Sepolia testnet using Truffle and Ganache UI
   - **Functions**:
     - Functions include adding drugs to the supply chain, tracking their movement, and verifying delivery

### 8. **Contributing**

   - **Submit issues**: Please open an issue via the GitHub repository.
   - **Propose changes**: Submit pull requests for review.
   - **Code of conduct**: Follow the project’s code of conduct, which is available in the repository.

### 9. **License**

   - Distributed under the MIT License.

### 10. **Future Work**

   - Integrating AI-based analytics to predict supply chain delays
   - Expanding the platform for global drug tracking across multiple countries
   - Additional user roles for greater access control

### 11. **Resources**

   - Demo Video link:
   - GitHub desktop:https://youtu.be/UGokwtIn1Hk?si=JfcXl4_qFmUxgPA5 
   - Fork a repo :https://youtu.be/-9ftoxZ2X9g?si=hLexg4KH1rTzl314
   - Working with multiple developers on the same project:https://youtu.be/k5D37W6h56o?si=10djRvnQSssk_FUR
   - Make a Pull Request:https://youtu.be/8lGpZkjnkt4?si=YnwM8XKevArtoOdX
   - Metamask extension installation:https://youtu.be/c7-IsFNbBZE?si=AhPFUawtZvcldh6o
   - To connect metamask with ganache:https://www.youtube.com/watch?v=lv4HEyiw4EQ
   - To remove network chain from metamask:https://www.youtube.com/watch?v=1Zg_IfUZuRU
   - Etherscan:https://sepolia.etherscan.io/
   - Web3 Faucet:https://cloud.google.com/application/web3/faucet
   - Truffle document:https://archive.trufflesuite.com/docs/
   - How to deploy a smart contract on ganache:https://youtu.be/UnNPv6zEbwc?si=FrfUOIY3FMBl-gc0
   - Tutorial for truffle:https://youtu.be/62f757RVEvU?si=35ucZDBa7wd1QgmR
   - Ganache installation:https://youtu.be/4LOeclXIxXA?si=p7j7ZVITWPBFv651
   - How to deploy your website on Netlify:https://www.youtube.com/watch?v=qAcOhFdC0-k
   - How to update the website after deploying it on Netlify:https://youtu.be/KKdTIabnFNk?si=VuSlaQncR8d_MO4k
   - Make a customized chatbot for the website:https://youtu.be/zAfLcKrbSps?si=-1kBaGwHURIPNlkG
   - Make a chatbot using chatbase.co:https://www.chatbase.co/
   - Learn docker:https://youtu.be/gAkwW2tuIqE?si=3WOS1KS0os94WQCa
   - Dockerize and deploy a react website:https://youtu.be/dfTco9hmXEM?si=wiRWo8xUbmrduito | https://youtu.be/RL31Kv_PHTw?si=A5Uo6fYZwyEkK9Iy

### 12. **Development Process**

   - **Blockchain setup**:
     - We used **Ganache UI** to simulate the Ethereum blockchain locally.
     - Contracts were written in Solidity and migrated using **Truffle**.
     - Interactions between the front end and blockchain were made possible with **Web3.js**.
   - **AI Chatbot**:
     - An AI-powered chatbot is integrated for user support, assisting with navigating the platform and providing guidance on supply chain interactions.
    
### 13. **To run the floowing project you can use docker file by performing the follwing steps:**

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Slacky300/DrugBlockchain.git
   ```

2. **Navigate to the Project Directory**
   ```sh
   cd DrugBlockchain
   ```

3. **Run the Project using Docker**
   ```sh
   docker-compose up --build
   ```

4. **Ganache Setup**
   - Once the above command runs successfully, **Ganache CLI will launch automatically**.
   - Private keys will be set automatically.
   - **ETH accounts will be generated**, and private keys will be provided.
   - You need to **import each account's private key into MetaMask** manually.
   - *(Refer to the resource link for more details on importing private keys in MetaMask.)*

5. **Access the Project**
   - The project will be available at: 
     ```
     http://localhost:3000
     ```

🎉 **Tadaa! Your project is now running!** 🎉

---

### Notes
- If you encounter issues with Docker, ensure it is running and properly configured.
- Check the `.env` file for environment variable configurations if needed.
- Make sure ports required by Docker and Ganache are not being used by other processes.


### 14. **Contribution**

   - As an open source project feel free to fork, modify, and contribute to it 😎 .

   
### 15. **Setps to run the project**
 
   - Step1: Clone the project: https://github.com/tanishka786/Drug_Blockchain.git (use GitHub desktop which enables collaboration from the desktop, allowing users to create issues or pull requests to work with others on projects.)

   - Step2: Watch the video tutorial : !!!!!!!!!BAKI CHE !!!!!!

   - Step3: Enjoy!!!😎 your project is now fully set up and ready to use ✌🏻. 

### 16. **Live Website:**

   -  https://drugguardian.netlify.app
