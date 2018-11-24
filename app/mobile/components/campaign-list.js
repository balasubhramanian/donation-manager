import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Text, List, ListItem } from "native-base";

import CampaignService from "../service/campaign-service";

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: []
    };
  }

  componentDidMount() {
    this.fetchCampaign();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.searchText !== newProps.searchText) {
      this.onSearch(newProps.searchText);
    }
  }

  fetchCampaign() {
    CampaignService.getAllCampaign().then(campaigns => {
      this.setState({ campaigns });
    });
  }

  render() {
    return (
      <List noIndent style={{ padding: 0 }}>
        <FlatList
          data={this.state.campaigns}
          renderItem={row => {
            const { item } = row;

            return (
              <ListItem
                key={item.id}
                style={{
                  flex: 4,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginLeft: 0
                }}
                onPress={() => {
                  if (this.props.onClick) {
                    this.props.onClick(item);
                  }
                }}
              >
                <View style={{ flex: 3, marginLeft: 17 }}>
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
              </ListItem>
            );
          }}
        />
      </List>
    );
  }
}
