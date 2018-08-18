import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Input,
  Form,
  Item,
  Label,
  Button,
  Container,
  Content
} from "native-base";
import UserService from "../service/user-service";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  doLogin() {
    UserService.login(this.state.username, this.state.password)
      .then(user => {
        alert(user);
        alert("Success");
        this.props.onSuccess(user);
      })
      .catch(e => {
        console.log(e);
        alert("failed");
      });
  }

  render() {
    return (
      <Content>
        <Text style={{ fontSize: 20, margin: 10, fontWeight: "700" }}>
          Donation Manager
        </Text>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              onChangeText={username => {
                this.setState({ username });
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              onChangeText={password => {
                this.setState({ password });
              }}
            />
          </Item>
        </Form>
        <Button
          onPress={() => {
            this.doLogin();
          }}
          full
          style={{ margin: 10, marginTop: 30 }}
        >
          <Text>Login</Text>
        </Button>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#fff"
  },

  input: {
    padding: 5,
    // borderBottomWidth: 1,
    marginTop: 2
  },
  inputContainer: {
    margin: 10,
    alignItems: "stretch",
    padding: 5
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default Login;
