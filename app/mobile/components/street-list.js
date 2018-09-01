import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Spinner, List, ListItem } from "native-base";

import DonorService from "../service/donor-service";

export default class StreetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      streets: [],
      data: []
    };
  }
  componentDidMount() {
    this.fetchStreets();
  }

  fetchStreets() {
    this.setState({ isLoading: true });
    DonorService.getAllStreet().then(streets => {
      console.log("fetch streets", streets);
      this.setState({ streets, data: streets, isLoading: false });
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.searchText != newProps.searchText) {
      this.onSearch(newProps.searchText);
    }
  }

  onSearch(text) {
    let filteredStreets = this.state.data.filter(d => {
      return d.street.indexOf(text) >= 0;
    });
    this.setState({ streets: filteredStreets });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner color="blue" />;
    }

    return (
      <List noIndent style={{ padding: 0 }}>
        <FlatList
          data={this.state.streets}
          renderItem={row => {
            let item = row.item;

            return (
              <ListItem
                key={item.street}
                onPress={() => {
                  this.props.onSelect(item);
                }}
              >
                <View>
                  <View>
                    <Text style={{ textAlign: "left", alignSelf: "stretch" }}>
                      {item.street} {item.area ? ", " + item.area : null}
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
