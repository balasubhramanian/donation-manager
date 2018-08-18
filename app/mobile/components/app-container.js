import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Input,
  Form,
  Item,
  Label,
  Button,
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Body,
  Title,
  Fab
} from "native-base";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false,
      showDrawer:
        this.props.showDrawer != undefined ? this.props.showDrawer : true,
      showSearch: this.props.showSearch,
      showFab: this.props.showFab != undefined ? this.props.showFab : true
    };
  }

  toggleSearchBar() {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  }

  renderHeader() {
    return (
      <Header>
        <Left>
          {this.state.showDrawer ? (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" />
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body style={{ flex: 2 }}>
          <Title>{this.props.title}</Title>
        </Body>

        {this.state.showSearch && (
          <Right>
            <Icon
              style={{ color: "#fff" }}
              name="ios-search"
              onPress={() => {
                this.toggleSearchBar();
              }}
            />
          </Right>
        )}
      </Header>
    );
  }

  renderSearchBar() {
    return (
      <Header searchBar>
        <Item>
          <Icon
            name="md-arrow-back"
            onPress={() => {
              this.toggleSearchBar();
            }}
          />
          <Input
            placeholder="Search"
            onChangeText={this.props.onSearchTextChange}
          />
          <Button transparent>
            <Icon name="ios-search" style={{ fontSize: 23, fontWeight: 700 }} />
          </Button>
        </Item>
      </Header>
    );
  }

  render() {
    return (
      <Container
        key="3"
        style={{ paddingBottom: 40, backgroundColor: "white" }}
      >
        {this.state.showSearchBar
          ? this.renderSearchBar()
          : this.renderHeader()}
        {this.props.children}
        {this.state.showFab && (
          <Fab
            direction="up"
            containerStyle={{}}
            style={{
              backgroundColor: "#5067FF",
              height: 50,
              width: 50,
              opacity: 0.7
            }}
            position="bottomRight"
            onPress={() => {
              console.log("fab press");
              this.props.navigation.navigate("Collect Donation");
            }}
          >
            <Icon name="add" style={{ fontSize: 14 }} />
          </Fab>
        )}
      </Container>
    );
  }
}
