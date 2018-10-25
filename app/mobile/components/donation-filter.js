import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Spinner,
  Icon,
  List,
  ListItem,
  Left,
  Body,
  Picker,
  DatePicker,
  Button
} from "native-base";

import moment from "moment";

export default class DonationFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupByField: props.groupByField ? props.groupByField : "created_at",
      startDate: props.startDate,
      endDate: props.endDate
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState(...newProps);
  }

  render() {
    console.log("rendering filters", this.state);
    return (
      <View style={styles.modalContent}>
        <View style={{ alignSelf: "stretch" }}>
          <List>
            <ListItem>
              <Left>
                <Text>Group By</Text>
              </Left>
              <Body>
                <Picker
                  mode="dropdown"
                  style={{}}
                  selectedValue={this.state.groupByField}
                  onValueChange={itemValue => {
                    this.setState({ groupByField: itemValue });
                  }}
                >
                  <Picker.Item label="Created Date" value="created_at" />
                  <Picker.Item label="Donation Date" value="date" />
                  <Picker.Item label="User" value="userId" />
                  <Picker.Item label="Campaign" value="campaignId" />
                </Picker>
              </Body>
            </ListItem>
            <ListItem>
              <Left>
                <Text>From</Text>
              </Left>
              <Body>
                <DatePicker
                  ref={this.datePickerRef}
                  textStyle={{ fontSize: 16 }}
                  modalTransparent={false}
                  defaultDate={this.state.startDate}
                  animationType="fade"
                  androidMode="default"
                  placeHolderText=""
                  placeHolderTextStyle={{ opacity: 0 }}
                  onDateChange={startDate => {
                    this.setState({ startDate });
                  }}
                  formatChosenDate={date => moment(date).format("DD-MMM-YY")}
                />
              </Body>
            </ListItem>
            <ListItem>
              <Left>
                <Text>To</Text>
              </Left>
              <Body>
                <DatePicker
                  ref={this.datePickerRef}
                  textStyle={{ fontSize: 16 }}
                  modalTransparent={false}
                  defaultDate={this.state.endDate}
                  animationType="fade"
                  androidMode="default"
                  placeHolderText=""
                  placeHolderTextStyle={{ opacity: 0 }}
                  onDateChange={endDate => {
                    this.setState({ endDate });
                  }}
                  formatChosenDate={date => moment(date).format("DD-MMM-YY")}
                />
              </Body>
            </ListItem>
            <ListItem>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Button
                  style={{ alignSelf: "center", marginTop: 10 }}
                  onPress={() => {
                    this.props.onApply(this.state);
                  }}
                >
                  <Text>Apply</Text>
                </Button>
                <Button
                  light
                  style={{ alignSelf: "center", marginTop: 10, marginLeft: 10 }}
                  onPress={() => {
                    this.props.onCancel();
                  }}
                >
                  <Text>Close</Text>
                </Button>
              </View>
            </ListItem>
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  modalContent: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
