import { useState, useEffect } from "react";
import { ethers } from "ethers";
import bmad_abi from "../artifacts/contracts/BuyMeADrink.sol/BuyMeADrink.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [bmad, setBMAD] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [notes, setNotes] = useState(undefined);
  const [amount, setAmount] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const bmadABI = bmad_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getBMADContract();
  };

  const getBMADContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const bmadContract = new ethers.Contract(contractAddress, bmadABI, signer);

    setBMAD(bmadContract);
  };

  const getBalance = async () => {
    if (bmad) {
      setBalance((await bmad.getBalance()).toNumber());
    }
  };
  const getNotes = async () => {
    if (bmad) {
      setNotes(await bmad.getNotes());
    }
  };

  const deposit = async () => {
    if (bmad) {
      let tx = await bmad.deposit(name, message, Number(amount));
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (bmad) {
      let tx = await bmad.withdrawFunds();
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this bmad.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Owner/BuyMeADrink Balance: {balance}</p>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <button onClick={deposit}>Buy me a drink</button>
        <button onClick={withdraw}>Withdraw all drinks money</button>
        <button onClick={getNotes}>View all Memos</button>
        <ol>
          {notes &&
            notes.map((note) => (
              <li>
                Address {note[0]} with name {note[2]} bought a drink of{" "}
                {note[1]} with the message {note[3]}
              </li>
            ))}
        </ol>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters BUy me a drink platform!</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
          }
        `}
      </style>
    </main>
  );
}
