import React, { useState } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import { signOut } from "../actions";
import { testUrl } from "../api/api";

function Home(props) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

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
        <Grid item lg={12}>
          Home Page
        </Grid>
        <br />
        <Grid item lg>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await testUrl()
                .get("/todos")
                .catch((e) => {
                  console.log(e);
                  return e;
                })
                .then((response) => {
                  console.log(response.data);
                  return response;
                });
            }}
          >
            Get Outside API ToDos
          </Button>
        </Grid>
        <br />
        <Grid item lg>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await testUrl()
                .get("/items")
                .catch((e) => {
                  console.log(e);
                  return e;
                })
                .then((response) => {
                  console.log(response.data);
                  return response;
                });
            }}
          >
            Get Flask API Items
          </Button>
        </Grid>
        <br />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(itemName, price);
          }}
        >
          <Grid item lg>
            <TextField
              required
              id="outlined-required"
              label="Item Name"
              variant="outlined"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </Grid>
          <br />
          <Grid item lg>
            <TextField
              required
              id="outlined-required"
              label="Price"
              variant="outlined"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Grid>
          <br />
          <Grid item lg>
            <Button variant="contained" color="primary" type="submit">
              Create Flask API Item
            </Button>
          </Grid>
        </form>
        <br />
        <Grid item lg>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const { sessionStorage } = window;

              sessionStorage.removeItem("token");
              props.signOut();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default connect(null, { signOut })(Home);
