import React, { useState } from "react";
import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";

import GoogleAuth from "./GoogleAuth";
import { testUrl } from "../api/api";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    testUrl()
      .post("/auth", { username, password })
      .catch((e) => console.log(e))
      .then((res) => console.log(res.data.access_token));
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{
        left: "25%",
        top: "50%",
        marginLeft: "-25%",
        position: "absolute",
        marginTop: "-25%",
      }}
    >
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h6">Sign in</Typography>
        <form onSubmit={login}>
          <Grid item lg={12}>
            <TextField
              required
              id="standard-required"
              label="Username"
              defaultValue={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={12} style={{ marginTop: "2rem" }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Grid>
        </form>
        <GoogleAuth style={{ marginTop: "1rem", width: "100%" }} />
      </Paper>
    </Grid>
  );
}

export default Home;
