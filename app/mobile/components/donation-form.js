import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Keyboard } from "react-native";
import {
  Text,
  Input,
  DatePicker,
  Item,
  Label,
  Button,
  Content,
  Toast
} from "native-base";
import moment from "moment";
import SendSMS from "react-native-sms";

import DonationService from "../service/donation-service";
import Config from "../common/config";

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

export default class DonationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      amount: null,
      selectedUser: null,
      selectedCampaign: null
    };
    this.datePickerRef = React.createRef();
  }

  componentDidMount() {
    Config.getDefaultCampaign().then(campaign => {
      this.setState({ selectedCampaign: campaign });
    });

    this.getDefaultStreet();

    const user = this.props.navigation.getParam("user", null);
    this.setState({ selectedUser: user });
    this.props.navigation.setParams({ user: null });
  }

  getDefaultStreet() {
    Config.getDefaultStreet().then(street => {
      this.setState({ selectedStreet: street });
    });
  }

  showSuccess() {
    Toast.show({
      text: "Donation Saved",
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
    const { amount, selectedCampaign, selectedUser, date } = this.state;

    if (amount <= 0) {
      this.showErrorMsg("Amount should be greater than 0");
      return true;
    }

    if (!selectedUser) {
      this.showErrorMsg("Please select user");
      return true;
    }

    if (!selectedCampaign) {
      this.showErrorMsg("Please select campaign");
      return true;
    }

    if (!date) {
      this.showErrorMsg("Please select date");
      return true;
    }

    return false;
  }

  save() {
    if (this.isFormInvalid()) {
      return;
    }

    const donationData = {
      campaignId: this.state.selectedCampaign.id,
      userId: this.state.selectedUser.id,
      date: moment(this.state.date).format("YYYY-MM-DD"),
      amount: this.state.amount,
      createdAt: moment(new Date()).format("YYYY-MM-DD"),
      createdBy: 1
    };

    DonationService.addDonation(donationData)
      .then((...args) => {
        console.log("donation saved", args);

        setTimeout(() => {
          this.showSuccess();
        }, 0);

        const oldState = Object.assign({}, this.state);

        const blankState = {
          selectedUser: null,
          date: new Date(),
          amount: null
        };

        this.datePickerRef.current.state.chosenDate = blankState.date;

        this.setState(blankState);

        setTimeout(() => {
          this.sendMessage(
            oldState.selectedUser,
            oldState.selectedCampaign,
            oldState.amount
          );
        }, 0);
      })
      .catch((...args) => {
        console.log("donation saved failed", args);
      });
  }

  sendMessage(user, campaign, amount) {
    Config.getDefaultSMS().then(smsText => {
      console.log(smsText);
      SendSMS.send(
        {
          body: smsText.replace("{amount}", amount),
          recipients: [user.phone],
          successTypes: ["sent", "queued"]
        }
        // (completed, cancelled, error) => {}
      );
    });
  }

  render() {
    return (
      <Content>
        <Item stackedLabel style={styles.itemStyle}>
          <Label style={styles.label}>Amount</Label>
          <Input
            style={styles.input}
            keyboardType="numeric"
            onChangeText={amount => {
              this.setState({ amount });
            }}
            value={this.state.amount}
          />
        </Item>
        <Item stackedLabel style={styles.itemStyle}>
          <Label style={styles.label}>User</Label>
          <Input
            style={styles.input}
            onFocus={() => {
              console.log("onfocus", this.props);
              this.props.navigation.push("UserSelect", {
                onSelect: user => {
                  this.setState({ selectedUser: user });
                  this.getDefaultStreet();
                },
                filter: this.state.selectedStreet,
                showDrawer: false
              });
            }}
            value={
              this.state.selectedUser ? this.state.selectedUser.firstname : ""
            }
          />
        </Item>
        <Item stackedLabel style={styles.itemStyle}>
          <Label style={styles.label}>Campaign</Label>
          <Input
            style={styles.input}
            onFocus={() => {
              this.props.navigation.push("CampaignSelect", {
                onSelect: user => {
                  this.setState({ selectedCampaign: user });
                },
                showDrawer: false
              });
              Keyboard.dismiss();
            }}
            value={
              this.state.selectedCampaign
                ? this.state.selectedCampaign.name
                : ""
            }
          />
        </Item>
        <Item stackedLabel style={styles.itemStyle}>
          <Label style={styles.label}>Date</Label>

          <View
            style={{
              alignSelf: "stretch",
              flex: 1
            }}
          >
            <DatePicker
              ref={this.datePickerRef}
              textStyle={{ fontSize: 16 }}
              modalTransparent={false}
              defaultDate={this.state.date}
              animationType="fade"
              androidMode="default"
              placeHolderText=""
              placeHolderTextStyle={{ opacity: 0 }}
              onDateChange={date => {
                this.setState({ date });
              }}
              formatChosenDate={date => moment(date).format("DD-MMM-YY")}
            />
          </View>
        </Item>

        <Button
          full
          block
          style={{ marginTop: 20 }}
          onPress={() => {
            this.save();
          }}
        >
          <Text>Collect</Text>
        </Button>
      </Content>
    );
  }
}

DonationForm.propTypes = {
  navigation: PropTypes.element.isRequired
};
