import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, margin: 15, fontWeight: "700" }}>
          Donation Manager
        </Text>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 14 }}>Username</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 14 }}>Password</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ margin: 15 }}>
          <Button
            title="Login"
            color="steelblue"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
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
