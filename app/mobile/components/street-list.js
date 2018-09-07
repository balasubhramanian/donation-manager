import React, { Component } from "react";
import { View, FlatList } from "react-native";
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

  componentWillReceiveProps(newProps) {
    if (this.props.searchText !== newProps.searchText) {
      this.onSearch(newProps.searchText);
    }
  }

  onSearch(text) {
    const filteredStreets = this.state.data.filter(
      d => d.street.indexOf(text) >= 0
    );
    this.setState({ streets: filteredStreets });
  }

  fetchStreets() {
    this.setState({ isLoading: true });
    DonorService.getAllStreet().then(streets => {
      console.log("fetch streets", streets);
      this.setState({ streets, data: streets, isLoading: false });
    });
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
            const { item } = row;

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
                      {item.street}
                      {item.area ? `, ${item.area}` : null}
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
