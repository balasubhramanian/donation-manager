import React, { Component } from "react";
import { Text, Input, Form, Item, Label, Button, Content } from "native-base";
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
        this.props.onSuccess(user);
      })
      .catch(e => {
        console.log(e);
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
export default Login;
