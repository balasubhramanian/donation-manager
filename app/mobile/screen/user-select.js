import React, { Component } from "react";
import { View, FlatList, StyleSheet, AsyncStorage } from "react-native";
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
import UserList from "../components/user-list";
import Config from "../common/config";

export default class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filter: this.props.navigation.state.params.filter
    };
  }
  render() {
    return (
      <AppContainer
        key="2"
        title="User"
        showDrawer={false}
        showSearch={true}
        onSearchTextChange={text => {
          this.setState({ searchText: text });
        }}
        showFab={false}
        showSettings={true}
        settingsIcon="md-locate"
        onSettings={() => {
          this.props.navigation.push("StreetSelect", {
            onSelect: street => {
              Config.setDefaultStreet(street);
              console.log("setting filter", street);
              this.setState({ filter: street });
            },
            showDrawer: false
          });
        }}
        {...this.props}
      >
        <Content style={{ padding: 0 }}>
          <UserList
            searchText={this.state.searchText}
            filter={this.state.filter}
            onSelect={item => {
              this.props.navigation.state.params.onSelect(item);
              this.props.navigation.goBack();
            }}
          />
        </Content>
      </AppContainer>
    );
  }
}
