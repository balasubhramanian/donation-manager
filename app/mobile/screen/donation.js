import React, { Component } from "react";
import {
  Text,
  Content,
  ListItem,
  List,
  Spinner,
  Left,
  Right
} from "native-base";
import { View, FlatList } from "react-native";
import moment from "moment";

import AppContainer from "../components/app-container";
import DonationService from "../service/donation-service";

export default class Donation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: [],
      isLoading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("quering donations");
      DonationService.getAllDonation()
        .then(data => {
          console.log("Get all donations", data);
          this.setState({
            donations: data,
            isLoading: false
          });
        })
        .catch((e, ...args) => {
          console.log(args);
        });
    }, 0);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <AppContainer key="3" title="Donation" {...this.props}>
          <Content>
            <View style={{ flex: 1, alignContent: "flex-start" }}>
              <Spinner color="blue" />
            </View>
          </Content>
        </AppContainer>
      );
    }
    const sumDonation = (a, r) => a + r.amount;

    const total = this.state.donations.reduce(sumDonation, 0);
    const groupByField = "created_at";
    const groupByDate = this.state.donations.reduce((a, r) => {
      a[r[groupByField]] = a[r[groupByField]] || [];
      a[r[groupByField]].push(r);
      return a;
    }, {});

    console.log("grouped by date", groupByDate);

    console.log("donation collection", total);
    return (
      <AppContainer key="3" title="Donation" {...this.props}>
        <Content>
          <List noIndent style={{ padding: 0 }}>
            {Object.keys(groupByDate).map(e => (
              <List>
                <ListItem itemDivider>
                  <Left>
                    <Text>{moment(e).format("DD-MMM-YY")}</Text>
                  </Left>

                  <Right>
                    <Text>{groupByDate[e].reduce(sumDonation, 0)}</Text>
                  </Right>
                </ListItem>
                <DonationList items={groupByDate[e]} showDate />
              </List>
            ))}
          </List>
        </Content>
      </AppContainer>
    );
  }
}

const DonationList = props => {
  const { items, showDate } = props;
  return (
    <FlatList
      data={items}
      renderItem={row => {
        const { item } = row;

        return (
          <ListItem
            key={item.id}
            style={{
              flex: 4,
              flexDirection: "row",
              alignItems: "flex-start"
            }}
          >
            <View style={{ flex: 3 }}>
              <View>
                <Text style={{ textAlign: "left", alignSelf: "stretch" }}>
                  {item.userName}
                </Text>
              </View>
              <View>
                <Text note style={{ textAlign: "left", alignSelf: "stretch" }}>
                  {item.campaignName}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: "stretch",
                    textAlign: "right",
                    color: "steelblue"
                  }}
                >
                  {item.amount}
                </Text>
              </View>
              {showDate && (
                <View style={{ flex: 1 }}>
                  <Text
                    note
                    style={{ textAlign: "right", alignSelf: "stretch" }}
                  >
                    {moment(item.date).format("DD-MMM-YY")}
                  </Text>
                </View>
              )}
            </View>
          </ListItem>
        );
      }}
    />
  );
};
