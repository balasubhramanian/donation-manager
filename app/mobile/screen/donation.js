import React, { Component } from "react";
import {
  Text,
  Input,
  Form,
  Item,
  Label,
  Button,
  Container,
  Content,
  ListItem,
  List,
  Spinner,
  Left,
  Right
} from "native-base";
import { View, FlatList, StyleSheet } from "react-native";

import AppContainer from "../components/app-container";
import DonationService from "../service/donation-service";
import moment from "moment";

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
      let p = DonationService.getAllDonation();
      p.then(data => {
        console.log("Get all donations", data);
        this.setState({
          donations: data,
          isLoading: false
        });

        // data.forEach(d => {
        //   for (let i = 0; i < 1000; i++) {
        //     DonationService.addDonation({
        //       campaignId: d.campaignId,
        //       userId: d.userId,
        //       date: d.date,
        //       amount: d.amount,
        //       createdAt: d.created_at,
        //       createdBy: 1
        //     });
        //   }
        // });
      }).catch(e => {
        console.log(arguments);
      });
    }, 0);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <AppContainer key="3" title="Donation" {...this.props}>
          <Content>
            <View style={{ flex: 1, alignContent: "flex-start" }}>
              {/* <Text
                style={{
                  fontSize: 20,
                  padding: 10,
                  alignSelf: "flex-start",
                  textAlign: "right",
                  color: "steelblue"
                }}
              >
                Loading ₹
              </Text> */}
              <Spinner color="blue" />
            </View>
          </Content>
        </AppContainer>
      );
    }
    const sumDonation = (a, r) => {
      return a + r.amount;
    };
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
            {Object.keys(groupByDate).map(e => {
              return (
                <List>
                  <ListItem itemDivider>
                    <Left>
                      <Text>{e}</Text>
                    </Left>

                    <Right>
                      <Text> ₹{groupByDate[e].reduce(sumDonation, 0)}</Text>
                    </Right>
                  </ListItem>
                  {this.renderDonations(groupByDate[e], true)}
                </List>
              );
            })}
          </List>
        </Content>
      </AppContainer>
    );
  }

  renderDonations(items, showDate = true) {
    return (
      <FlatList
        data={items}
        renderItem={row => {
          let item = row.item;

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
                    {item.userName} test
                  </Text>
                </View>
                <View>
                  <Text
                    note
                    style={{ textAlign: "left", alignSelf: "stretch" }}
                  >
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
                    ₹{item.amount}
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
  }
}
