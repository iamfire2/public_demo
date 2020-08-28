import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./Home";
import Signin from "./Signin";

import history from "../history";
import { signIn, signOut } from "../actions";

const App = (props) => {
  useEffect(() => {
    const { sessionStorage } = window;

    if (!sessionStorage.getItem("token")) {
      props.signOut();
      history.push("/login");
    } else if (sessionStorage.getItem("token")) {
      props.signOut();
      history.push("/");
    }
  }, []);

  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Signin} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { signIn, signOut })(App);
