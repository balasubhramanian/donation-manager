import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import LoginPage from "pages/login";
import ListUserPage from "pages/user/list-user";

class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    if (!window.isLoggedIn) {
      this.props.history.replace("/login");
    }
  }

  render() {
    return (
      <div>
        {/* User Routes */}
        <Route path="/user" component={ListUserPage} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={EnsureLoggedInContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
