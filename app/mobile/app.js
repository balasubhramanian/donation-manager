import React, { Component } from "react";
import Login from "./screen/login";
import Home from "./screen/home";
import { Container, Root, Toast } from "native-base";
import { StyleSheet } from "react-native";
import { initDatabase } from "./common/db";

console.disableYellowBox = true;
class App extends Component {
  constructor(props) {
    super(props);
    //this.state = {}
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
