import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "./Navbar";
import Lottery from "./abis/Lottery.json";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [player3, setPlayer3] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractadd, setContractAdd] = useState(null);
  const [bal, setBal] = useState(0);

  const [winner, setWinner] = useState(null);

  const [account, setAccount] = useState(null);

  const [web3, setWeb3] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    setOpen(true);
    try {
      const winner = await contract.methods.winner().call();
      if (player1 === winner) {
        setWinner("Player 1");
      } else if (player2 === winner) {
        setWinner("Player 2");
      } else if (player3 === winner) {
        setWinner("Player 3");
      }
      // console.log(player1);
      // console.log(winner);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const deafaultAcc = "0x602cCc514D059D237A8Feff5c55dce60659400FC";
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
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts);
    // console.log(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Lottery.networks[networkId];
    if (networkData) {
      setContractAdd(networkData.address);
      // console.log(networkData.address);
      const contract = new web3.eth.Contract(Lottery.abi, networkData.address);
      setContract(contract);
    } else {
      alert("Smart Contract not deployed");
    }
  };
  const sendEther = async (event) => {
    if (event.target.id == 1) {
      await web3.eth
        .sendTransaction({
          from: player1,
          to: contractadd,
          value: web3.utils.toWei("1", "ether"),
        })
        .then(() => console.log("successfully transfer 1 ether "));
    } else if (event.target.id == 2) {
      await web3.eth
        .sendTransaction({
          from: player2,
          to: contractadd,
          value: web3.utils.toWei("1", "ether"),
        })
        .then(() => console.log("successfully transfer 1 ether "));
    } else {
      await web3.eth
        .sendTransaction({
          from: player3,
          to: contractadd,
          value: web3.utils.toWei("1", "ether"),
        })
        .then(() => console.log("successfully transfer 1 ether "));
    }
  };
  const pickWinner = async () => {
    try {
      await contract.methods.pickWinner().send({
        from: deafaultAcc,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getBalance = async () => {
    const balance = await contract.methods.getBalance().call();
    const etherValue = web3.utils.fromWei(balance.toString(), "ether");
    //console.log(etherValue.toString());
    setBal(etherValue);
  };

  return (
    <div className="App">
      <ResponsiveAppBar
        loadBlockchainData={loadBlockchainData}
        account={deafaultAcc}
      />
      <br />
      <Button variant="contained" color="primary" onClick={getBalance}>
        Get Balance
      </Button>
      <h1>Balance:{bal + " ether"}</h1>
      <div className="container">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Player 1"
              variant="filled"
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <TextField id="standard-basic" label="ether" variant="standard" />
            <Button
              variant="contained"
              color="primary"
              id="1"
              onClick={sendEther}
            >
              Send
            </Button>
          </Box>

          <br />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Player 2"
              variant="filled"
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <TextField id="standard-basic" label="ether" variant="standard" />
            <Button
              variant="contained"
              color="primary"
              id="2"
              onClick={sendEther}
            >
              Send
            </Button>
          </Box>
          <br />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Player 3"
              variant="filled"
              onChange={(e) => setPlayer3(e.target.value)}
            />
            <TextField id="standard-basic" label="ether" variant="standard" />
            <Button
              variant="contained"
              color="primary"
              id="3"
              onClick={sendEther}
            >
              Send
            </Button>
          </Box>
          <br />
          <Button
            variant="contained"
            color="primary"
            id="3"
            onClick={pickWinner}
          >
            Pick the Winner
          </Button>
        </Box>
        <br />
        <Button onClick={handleOpen}>Check Result</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Lottery Winner
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {winner ? winner + "🥳" : "Please play the game first"}
            </Typography>
          </Box>
        </Modal>
        {/* <Button onClick={check}>Check the result</Button>
        <div>Winner is {winner}</div> */}
      </div>
    </div>
  );
}

export default App;
