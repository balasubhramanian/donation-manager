import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css'

import LoginPage from "pages/login"

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
