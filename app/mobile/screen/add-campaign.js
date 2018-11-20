import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import {
  Text,
  Input,
  Item,
  Label,
  Button,
  Content,
  Toast,
  Picker
} from "native-base";
import moment from "moment";

import CampaignService from "../service/campaign-service";
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

export default class AddCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = this.getBlankState();
  }

  getBlankState() {
    return {
      name: null,
      description: null,
      type: "YEARLY"
    };
  }

  showSuccess() {
    Toast.show({
      text: "Campaign Saved",
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
    // const { amount, selectedCampaign, selectedUser, date } = this.state;

    // if (amount <= 0) {
    //   this.showErrorMsg("Amount should be greater than 0");
    //   return true;
    // }

    return false;
  }

  save() {
    if (this.isFormInvalid()) {
      return;
    }
    this.state.createdBy = 999;
    this.state.createdAt = moment(new Date()).format("YYYY-MM-DD");
    CampaignService.addCampaign(this.state)
      .then((...args) => {
        console.log("Campaign saved", args);

        setTimeout(() => {
          this.showSuccess();
        }, 0);

        this.setState(this.getBlankState());
      })
      .catch((...args) => {
        console.log("Campaign saved failed", args);
      });
  }

  render() {
    return (
      <AppContainer title="Add Campaign" {...this.props} showDrawer={false}>
        <Content padder>
          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Name</Label>
            <Input
              style={styles.input}
              keyboardType="numeric"
              onChangeText={name => {
                this.setState({ name });
              }}
              value={this.state.name}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Description</Label>
            <Input
              style={styles.input}
              keyboardType="numeric"
              onChangeText={description => {
                this.setState({ description });
              }}
              value={this.state.description}
            />
          </Item>

          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.label}>Type</Label>
            <Picker
              mode="dropdown"
              style={{
                margin: 0,
                padding: 0,
                width: 320,
                fontSize: 16,
                height: 10
              }}
              selectedValue={this.state.type}
              onValueChange={type => {
                this.setState({ type });
              }}
            >
              <Picker.Item label="Yearly" value="YEARLY" />
              <Picker.Item label="Montly" value="MONTHLY" />
            </Picker>
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

AddCampaign.propTypes = {
  navigation: PropTypes.element.isRequired
};
