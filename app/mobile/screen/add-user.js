import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Text, Input, Item, Label, Button, Content, Toast } from "native-base";
import moment from "moment";

import DonorService from "../service/donor-service";
import AppContainer from "../components/app-container";

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold"
  },
  input: {
    fontSize: 16,
    height: 10
  },
  itemStyle: { marginBottom: 30 }
});

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = this.getBlankState();
  }

  getBlankState() {
    return {
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      doorno: null,
      street: null,
      city: null,
      state: null,
      country: null
    };
  }

  showSuccess() {
    Toast.show({
      text: "User Saved",
      type: "success",
      position: "bottom"
    });
  }

  showErrorMsg(msg) {
    Toast.show({
      text: msg,
      textStyle: { color: "white" },
      buttonText: "OK",
      position: "bottom",
      duration: 0,
      type: "danger"
    });
  }

  isFormInvalid() {
    const {
      firstname,
      phone,
      doorno,
      street,
      city,
      state,
      country
    } = this.state;

    if (!firstname || firstname.length < 2) {
      this.showErrorMsg("Please enter firstname");
      return true;
    }

    if (!phone || phone.length < 2) {
      this.showErrorMsg("Please enter phone");
      return true;
    }

    if (!doorno || doorno.length < 1) {
      this.showErrorMsg("Please enter Door No");
      return true;
    }

    if (!street || street.length < 1) {
      this.showErrorMsg("Please enter street");
      return true;
    }

    if (!city || city.length < 1) {
      this.showErrorMsg("Please enter city");
      return true;
    }

    if (!state || state.length < 1) {
      this.showErrorMsg("Please enter state");
      return true;
    }

    if (!country || country.length < 1) {
      this.showErrorMsg("Please enter country");
      return true;
    }

    return false;
  }

  save() {
    if (this.isFormInvalid()) {
      return;
    }
    this.state.createdBy = 999;
    this.state.createdAt = moment(new Date()).format("YYYY-MM-DD");
    DonorService.addUser(this.state)
      .then((...args) => {
        console.log("User saved", args);

        setTimeout(() => {
          this.showSuccess();
        }, 0);

        this.setState(this.getBlankState());
      })
      .catch((...args) => {
        console.log("User saved failed", args);
      });
  }

  render() {
    return (
      <AppContainer title="Add User" {...this.props} showDrawer={false}>
        <Content padder>
          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>First Name</Label>
            <Input
              style={styles.input}
              onChangeText={firstname => {
                this.setState({ firstname });
              }}
              value={this.state.firstname}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Last Name</Label>
            <Input
              style={styles.input}
              onChangeText={lastname => {
                this.setState({ lastname });
              }}
              value={this.state.lastname}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Phone</Label>
            <Input
              style={styles.input}
              onChangeText={phone => {
                this.setState({ phone });
              }}
              value={this.state.phone}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Email</Label>
            <Input
              style={styles.input}
              onChangeText={email => {
                this.setState({ email });
              }}
              value={this.state.email}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Door No</Label>
            <Input
              style={styles.input}
              onChangeText={doorno => {
                this.setState({ doorno });
              }}
              value={this.state.doorno}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Street</Label>
            <Input
              style={styles.input}
              onChangeText={street => {
                this.setState({ street });
              }}
              value={this.state.street}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>City</Label>
            <Input
              style={styles.input}
              onChangeText={city => {
                this.setState({ city });
              }}
              value={this.state.city}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>State</Label>
            <Input
              style={styles.input}
              onChangeText={state => {
                this.setState({ state });
              }}
              value={this.state.state}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Country</Label>
            <Input
              style={styles.input}
              onChangeText={country => {
                this.setState({ country });
              }}
              value={this.state.country}
            />
          </Item>

          <Button
            full
            block
            style={{ marginTop: 20 }}
            onPress={() => {
              this.save();
            }}
          >
            <Text>Save</Text>
          </Button>
        </Content>
      </AppContainer>
    );
  }
}

AddUser.propTypes = {
  navigation: PropTypes.element.isRequired
};
