import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  Text,
  Input,
  Form,
  Item,
  Label,
  Button,
  ActionSheet,
  Container,
  Content,
  Icon,
  List,
  ListItem
} from "native-base";

import CampaignService from "../service/campaign-service";

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      campaigns: [],
      data: []
    };
  }
  componentDidMount() {
    this.fetchCampaign();
  }

  fetchCampaign() {
    this.setState({ isLoading: true });
    CampaignService.getAllCampaign().then(campaigns => {
      console.log("fetch campaign", campaigns);
      this.setState({ campaigns, data: campaigns, isLoading: false });
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.searchText != newProps.searchText) {
      this.onSearch(newProps.searchText);
    }
  }

  render() {
    return (
      <List noIndent style={{ padding: 0 }}>
        <FlatList
          data={this.state.campaigns}
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
                onPress={() => {
                  if (this.props.onClick) {
                    this.props.onClick(item);
                  }
                }}
              >
                <View style={{ flex: 3 }}>
                  <View>
                    <Text style={{ textAlign: "left", alignSelf: "stretch" }}>
                      {item.name}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      note
                      style={{ textAlign: "left", alignSelf: "stretch" }}
                    >
                      {item.type}
                    </Text>
                  </View>
                </View>
                {/* <View style={{ flex: 1, alignContent: "flex-start" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          padding: 10,
                          alignSelf: "flex-start",
                          textAlign: "right",
                          color: "steelblue"
                        }}
                      >
                        ₹
                        {item.amount}
                      </Text>
                    </View> */}
              </ListItem>
            );
          }}
        />
      </List>
    );
  }
}
