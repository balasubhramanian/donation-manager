import React, { Component } from "react";
import { ActionSheet, Content } from "native-base";

import AppContainer from "../components/app-container";
import UserList from "../components/user-list";

const BUTTONS = ["Collect Donation", "Edit", "Cancel"];
const CANCEL_INDEX = 2;

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  onSearch(text) {
    this.setState({ searchText: text });
  }

  render() {
    return (
      <AppContainer
        key="2"
        title="User"
        showSearch
        onSearchTextChange={text => {
          this.onSearch(text);
        }}
        {...this.props}
      >
        <Content style={{ padding: 0 }}>
          <UserList
            searchText={this.state.searchText}
            onSelect={item => {
              console.log(item.firstname);
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: item.firstname
                }
                // ,
                // buttonIndex => {
                //  this.setState({ clicked: BUTTONS[buttonIndex] });
                // }
              );
            }}
          />
        </Content>
      </AppContainer>
    );
  }
}
