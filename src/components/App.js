import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
