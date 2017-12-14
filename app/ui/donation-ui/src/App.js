import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./store";
import { ConnectedRouter } from "react-router-redux";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import LoginPage from "pages/login";
import AppLayout from "layout/left-nav-layout";
import ListUserPage from "pages/user/list-user";

const ProtectedContainer = props => {
  if (!props.isLoggedIn) {
    history.push("/login");
  }
  return (
    <AppLayout>
      <Route path="/user" component={ListUserPage} />
    </AppLayout>
  );
};

const ConnectedProtectedContainer = connect(state => ({ ...state.auth }), {})(
  ProtectedContainer
);

class App extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={ConnectedProtectedContainer} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
