import React, { useState } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import TodoDialog from "./diaglogs/TodoDialog";
import FlaskItemListDialog from "./diaglogs/FlaskItemListDialog";
import FlaskItemAddDialog from "./diaglogs/FlaskItemAddDialog";

import { signOut } from "../actions";
import { testUrl } from "../api/api";

function Home(props) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoDialogState, setTodoDialogState] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [flaskItemListState, setFlaskItemListState] = useState(false);
  const [flaskItemAddedState, setFlaskItemAddedState] = useState(false);

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
                  return Promise.reject(e);
                })
                .then((response) => {
                  setTodoList(response.data);
                  setTodoDialogState(true);
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
                  return Promise.reject(e);
                })
                .then((response) => {
                  setItemList(response.data.items);
                  setFlaskItemListState(true);
                  return response;
                });
            }}
          >
            Get Flask API Items
          </Button>
        </Grid>
        <br />

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await testUrl()
              .post(`/item/${itemName}`, { price })
              .catch((e) => {
                console.log(e.response);
                return e;
              })
              .then((res) => {
                return res;
              });
            if (response.status === 201) {
              setItemList([response.data]);
              setFlaskItemAddedState(true);
            }
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
      {todoList.length && todoDialogState > 0 ? (
        <TodoDialog
          todoList={todoList}
          state={todoDialogState}
          setState={setTodoDialogState}
        />
      ) : null}
      {flaskItemListState ? (
        <FlaskItemListDialog
          itemList={itemList}
          state={flaskItemListState}
          setState={setFlaskItemListState}
        />
      ) : null}
      {flaskItemAddedState ? (
        <FlaskItemAddDialog
          itemList={itemList}
          state={flaskItemAddedState}
          setState={setFlaskItemAddedState}
        />
      ) : null}
    </Grid>
  );
}

export default connect(null, { signOut })(Home);
