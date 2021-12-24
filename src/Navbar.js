import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

const ResponsiveAppBar = ({ loadBlockchainData, account }) => {
  const [text, setText] = React.useState("Connect Wallet");
  const [acc, setAcc] = React.useState(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            🎰 LOTTERY GAME
          </Typography>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                loadBlockchainData();
                if (account != null) {
                  setAcc(account);
                  setText("Wallet Connected");
                }
              }}
            >
              {text}
            </Button>
          </div>
          <div style={{ position: "absolute", right: 0 }}>
            {acc ? "Admin:" + acc : acc}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
