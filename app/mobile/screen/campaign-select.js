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

import AppContainer from "../components/app-container";
import CampaignList from "../components/campaign-list";

export default class CampaignSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      donors: [],
      data: [],
      searchText: ""
    };
  }
  render() {
    return (
      <AppContainer
        key="2"
        title="Campaign"
        showDrawer={false}
        showSearch={false}
        onSearchTextChange={text => {
          this.setState({ searchText: text });
        }}
        {...this.props}
      >
        <Content style={{ padding: 0 }}>
          <CampaignList
            onClick={item => {
              this.props.navigation.state.params.onSelect(item);
              this.props.navigation.goBack();
            }}
          />
        </Content>
      </AppContainer>
    );
  }
}
