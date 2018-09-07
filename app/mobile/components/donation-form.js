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
  }

  getDefaultStreet() {
    Config.getDefaultStreet().then(street => {
      this.setState({ selectedStreet: street });
    });
  }

  showSuccess() {
    this.setState({});
    Toast.show({
      text: "Donation Saved",
      textStyle: { color: "green" },
      buttonText: "OK",
      position: "bottom"
    });
  }

  save() {
    if (this.isFormInvalid()) {

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

        this.showSuccess();
        const blankState = {
          selectedUser: null,
          date: new Date(),
          amount: null
        };

        this.datePickerRef.current.state.chosenDate = blankState.date;

        this.sendMessage(
          this.state.selectedUser,
          this.state.selectedCampaign,
          this.state.amount
        );

        this.setState(blankState);
      })
      .catch((...args) => {
        console.log("donation saved failed", args);
      });
  }

  sendMessage(user, campaign, amount) {
    SendSMS.send(
      {
        body: `Thanks for donating Rs.${amount}`,
        recipients: [user.phone],
        successTypes: ["sent", "queued"]
      }
      // (completed, cancelled, error) => {}
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
