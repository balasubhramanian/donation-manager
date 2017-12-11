import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import LoginPage from "pages/login"
import ListUserPage from "pages/user/list-user"

class App extends Component {
  render() {
    return (
      <div>
      <LoginPage/>
      </div>
    );
  }
}

export default App;
