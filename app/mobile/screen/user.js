import React, { Component } from "react";
import { ActionSheet, Content } from "native-base";

import AppContainer from "../components/app-container";
import UserList from "../components/user-list";

const BUTTONS = ["Collect Donation", "Cancel"];
const CANCEL_INDEX = 1;

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      selectedUser: null
    };
    this.userListRef = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      if (this.userListRef && this.userListRef.current) {
        this.userListRef.current.componentDidMount();
      }
    });
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
        showFab
        onFabPress={() => {
          this.props.navigation.push("Add User");
        }}
        onSearchTextChange={text => {
          this.onSearch(text);
        }}
        {...this.props}
      >
        <Content style={{ padding: 0 }}>
          <UserList
            ref={this.userListRef}
            searchText={this.state.searchText}
            onSelect={item => {
              this.setState({ selectedUser: item });
              console.log(item.firstname);
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: item.firstname
                },
                buttonIndex => {
                  console.log(buttonIndex);
                  if (buttonIndex === 0) {
                    console.log(this.props.navigation);
                    this.props.navigation.navigate("Collect Donation", {
                      user: this.state.selectedUser
                    });
                  }
                }
              );
            }}
          />
        </Content>
      </AppContainer>
    );
  }
}
