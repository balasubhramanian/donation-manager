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
import UserList from "../components/user-list";
import DonorService from "../service/donor-service";

var BUTTONS = ["Collect Donation", "Edit", "Cancel"];
var CANCEL_INDEX = 2;

export default class UserSelect extends Component {
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
    const getAddress = this.getAddress;
    console.log(this.state);

    return (
      <AppContainer
        key="2"
        title="User"
        showDrawer={false}
        showSearch={true}
        onSearchTextChange={text => {
          this.setState({ searchText: text });
        }}
        {...this.props}
      >
        <Content style={{ padding: 0 }}>
          <UserList
            searchText={this.state.searchText}
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
