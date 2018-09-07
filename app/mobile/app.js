import React, { Component } from "react";
import { Container, Root, Toast } from "native-base";

import Login from "./screen/login";
import Home from "./screen/home";
import { initDatabase } from "./common/db";

class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    // this.state = {}
    this.state = { user: { firstname: "Bala" }, isLoading: true };
  }

  componentDidMount() {
    initDatabase()
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(e => {
        this.setState({
          isLoading: false,
          isAppError: true,
          msg: "Failed to connect database"
        });
        Toast.show({
          text: "Failed to connect database",
          textStyle: { color: "red" },
          buttonText: "Okay",
          position: "top"
        });
      });
  }

  onLoginSuccess(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Container>
        {this.state.user ? (
          <Home />
        ) : (
          <Login
            onSuccess={user => {
              this.onLoginSuccess(user);
            }}
          />
        )}
      </Container>
    );
  }
}

export default () => (
  <Root>
    <App />
  </Root>
);
