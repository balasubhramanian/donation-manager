import React, { Component } from "react";
import { StyleSheet, View, Keyboard, AsyncStorage } from "react-native";
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
    this.baseState = this.state;
  }
  showSuccess() {
    Toast.show({
      text: "Donation Saved",
      textStyle: { color: "green" },
      buttonText: "OK",
      position: "bottom"
    });
  }
  componentDidMount() {
    this.refs.dpDate.state.chosenDate = new Date();
    AsyncStorage.getItem("defaultCampaign").then(campaign => {
      this.setState({ selectedCampaign: JSON.parse(campaign) });
    });

    AsyncStorage.getItem("defaultStreet").then(street => {
      this.setState({ selectedStreet: JSON.parse(street) });
    });
  }

  getDefaultStreet() {
    AsyncStorage.getItem("defaultStreet").then(street => {
      this.setState({ selectedStreet: JSON.parse(street) });
    });
  }

  save() {
    this.state.date = this.refs.dpDate.state.chosenDate;
    console.log("donation daa", this.state);

    let donationData = {
      campaignId: this.state.selectedCampaign.id,
      userId: this.state.selectedUser.id,
      date: moment(this.state.date).format("YYYY-MM-DD"),
      amount: this.state.amount,
      createdAt: moment(new Date()).format("YYYY-MM-DD"),
      createdBy: 1
    };

    DonationService.addDonation(donationData)
      .then(() => {
        console.log("donation saved", arguments);

        this.sendMessage(
          this.state.selectedUser,
          this.state.selectedCampaign,
          this.state.amount
        );
        this.showSuccess();
        const blankState = {};
        Object.keys(this.state).forEach(stateKey => {
          blankState[stateKey] = undefined;
        });
        this.refs.dpDate.state.chosenDate = new Date();

        this.setState(blankState);
      })
      .catch(() => {
        console.log("donation saved failed", arguments);
      });
    //console.log(DonationService.getAllDonation());
    /* onChangeText={userId => {
                  this.setState({ userId });
                }} */
  }

  sendMessage(user, campaign, amount) {
    SendSMS.send(
      {
        body: "Thanks for donating Rs." + amount,
        recipients: [user.phone],
        successTypes: ["sent", "queued"]
      },
      (completed, cancelled, error) => {}
    );
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
              textAlign: "right",
              flex: 1,
              color: "#ddd"
            }}
          >
            <DatePicker
              ref="dpDate"
              textStyle={{ fontSize: 16 }}
              modalTransparent={false}
              defaultDate={this.state.date}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText=""
              placeHolderTextStyle={{ opacity: 0 }}
              onDateChange={date => {
                console.log("ddate set ", date);
                this.setState({ date });
              }}
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
