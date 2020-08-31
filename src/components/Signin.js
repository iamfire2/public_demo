import React, { useState } from "react";
import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import GoogleAuth from "./GoogleAuth";

import { testUrl } from "../api/api";
import { signIn } from "../actions";
import history from "../history";

function Home(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    const { sessionStorage } = window;

    e.preventDefault();
    testUrl()
      .post("/auth", { username, password })
      .catch((e) => console.log(e))
      .then((res) => {
        history.push("/");
        sessionStorage.setItem("token", res.data.access_token);
        props.signIn();
        window.location.reload();
      });
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

export default connect(null, { signIn })(Home);
