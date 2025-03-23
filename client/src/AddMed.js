import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddMed() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedName, setMedName] = useState();
  const [MedDes, setMedDes] = useState();
  const [MedStage, setMedStage] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const getProviderUrl = () => {
    // For MetaMask, we'll use localhost since that's how it's configured in your MetaMask
    if (window.ethereum || window.web3) {
      return 'http://localhost:8545';
    }
    // For direct connections from inside Docker
    return process.env.REACT_APP_GANACHE_URL || 'http://ganache:8545';
  };


  const loadBlockchaindata = async () => {
    try {
      setloader(true);
      console.log("Starting blockchain data load");
      
      // Check if Web3 is injected by MetaMask
      if (window.ethereum) {
        console.log("Found window.ethereum - MetaMask detected");
        window.web3 = new Web3(window.ethereum);
        
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("MetaMask account access granted");
        } catch (error) {
          console.error("MetaMask account access denied:", error);
        }
      } else if (window.web3) {
        console.log("Found window.web3 - Legacy Web3 detected");
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log("No Web3 detected - using direct connection to Ganache");
        const provider = new Web3.providers.HttpProvider('http://localhost:8545');
        window.web3 = new Web3(provider);
      }
      
      const web3 = window.web3;
      
      // Log Web3 connection info
      console.log("Web3 version:", web3.version);
      console.log("Is connected:", await web3.eth.net.isListening());
      
      // Get accounts
      const accounts = await web3.eth.getAccounts();
      console.log("Available accounts:", accounts);
      
      const account = accounts[0];
      setCurrentaccount(account);
      console.log("Using account:", account);
      
      // Get network info
      const networkId = await web3.eth.net.getId();
      console.log("Connected to network ID:", networkId);
      
      // Debug contract ABI info
      console.log("Supply Chain ABI networks:", Object.keys(SupplyChainABI.networks));
      
      // Check if contract exists for this network
      const networkData = SupplyChainABI.networks[networkId];
      
      if (networkData) {
        console.log("Found contract deployment on current network:", networkData.address);
        
        // Verify contract exists at the specified address
        const code = await web3.eth.getCode(networkData.address);
        console.log("Contract code at address:", code.substring(0, 20) + "...");
        
        if (code === '0x' || code === '0x0') {
          console.error("No contract found at the specified address!");
          window.alert("Smart contract not found at the specified address. The address in your contract JSON may be incorrect.");
          setloader(false);
          return;
        }
        
        const supplychain = new web3.eth.Contract(
          SupplyChainABI.abi,
          networkData.address
        );
        
        console.log("Contract instance created");
        setSupplyChain(supplychain);
        
        try {
          // Try a simple call first to verify connection
          console.log("Testing contract connection...");
          const hasMethod = supplychain.methods.medicineCtr ? true : false;
          console.log("Has medicineCtr method:", hasMethod);
          
          if (!hasMethod) {
            throw new Error("Contract does not have required methods");
          }
          
          const medCtr = await supplychain.methods.medicineCtr().call({from: account});
          console.log("Medicine counter:", medCtr);
          
          const med = {};
          const medStage = [];
          
          for (let i = 0; i < medCtr; i++) {
            med[i] = await supplychain.methods.MedicineStock(i + 1).call({from: account});
            medStage[i] = await supplychain.methods.showStage(i + 1).call({from: account});
          }
          
          setMED(med);
          setMedStage(medStage);
          console.log("Successfully loaded medicine data");
        } catch (error) {
          console.error("Error calling contract methods:", error);
          
          // More specific error message
          if (error.message.includes("Out of Gas")) {
            window.alert("Error: Contract call ran out of gas. The contract might not be initialized correctly.");
          } else if (error.message.includes("not a function")) {
            window.alert("Error: Contract method doesn't exist. The contract ABI might not match the deployed contract.");
          } else {
            window.alert("Error interacting with the smart contract: " + error.message);
          }
        }
      } else {
        console.error("Contract not deployed to current network. Connected network ID:", networkId);
        console.error("Available networks in ABI:", Object.keys(SupplyChainABI.networks));
        
        window.alert(`Smart contract not found on network ${networkId}. Available networks: ${Object.keys(SupplyChainABI.networks).join(', ')}. Please make sure you're connected to the right network in MetaMask.`);
      }
      
      setloader(false);
    } catch (error) {
      console.error("Error in loadBlockchaindata:", error);
      setloader(false);
      window.alert("Error connecting to blockchain: " + error.message);
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeNameMED = (event) => {
    setMedName(event.target.value);
  };
  const handlerChangeDesMED = (event) => {
    setMedDes(event.target.value);
  };
  const handlerSubmitMED = async (event) => {
    event.preventDefault();
    try {
      console.log(MedName, MedDes);
      console.log(SupplyChain);
      var reciept = await SupplyChain.methods
        .addMedicine(MedName, MedDes)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      console.log(err);
      alert("An error occured!!!");
    }
  };
  return (
    <div>
      <span>
        <b>Current Account Address:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        {" "}
        HOME
      </span>
      <br />
      <h5>Add Medicine Order:</h5>
      <form onSubmit={handlerSubmitMED}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameMED}
          placeholder="Medicine Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeDesMED}
          placeholder="Medicine Description"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitMED}
        >
          Order
        </button>
      </form>
      <br />
      <h5>Ordered Medicines:</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AddMed;
