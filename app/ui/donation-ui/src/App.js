import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./store";
import { ConnectedRouter } from "react-router-redux";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-table/react-table.css";

import LoginPage from "pages/login";
import AppLayout from "layout/left-nav-layout";
import ListUserPage from "pages/user/list-user";
import AddUserPage from "pages/user/add-user";
import DonorPage from "pages/donor";
import Fundraising from "pages/fundraising";

const ProtectedContainer = props => {
  if (!props.isLoggedIn) {
    history.push("/login");
  }
  return (
    <AppLayout>
      <Route exact path="/" component={Fundraising} />
      <Route exact path="/user" component={ListUserPage} />
      <Route path="/user/add" component={AddUserPage} />
      <Route path="/fundraising" component={Fundraising} />
      <Route path="/donor" component={DonorPage} />
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
