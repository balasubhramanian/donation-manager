/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import Login from "./screen/login";
import Home from "./screen/home";
import {
  Container,
  Icon,
  Right,
  Left,
  Title,
  Header,
  Button,
  CheckBox,
  Form,
  Item,
  List,
  Label,
  ListItem,
  Content,
  Input,
  ActionSheet,
  Text,
  Root,
  Card,
  CardItem,
  Body,
  Fab,
  View,
  Badge,
  Footer,
  FooterTab,
  Toast
} from "native-base";
import { StyleSheet } from "react-native";
import { initDatabase } from "./common/db";

console.disableYellowBox = true;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { firstname: "Bala" }, isLoading: true };
  }

  componentDidMount() {
    console.log("init database");
    //initDatabase();
    var p = initDatabase();
    console.log(p);
    p.then(() => {
      Toast.show({
        text: "Database connected",
        textStyle: { color: "green" },
        buttonText: "OK",
        position: "bottom"
      });
      this.setState({ isLoading: false });
    }).catch(e => {
      alert("init db failed");
      console.log("init db error", e);
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
    console.log("onsucces", user);
    this.setState({ user });
  }

  render() {
    return (
      <Container key="2">
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue"
  },
  layout: {
    margin: 5,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  box: {
    padding: 25,
    backgroundColor: "steelblue",
    margin: 5
  }
});

export default () => (
  <Root>
    <App />
  </Root>
);
