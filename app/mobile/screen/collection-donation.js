import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  Input,
  View,
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
  Title
} from "native-base";

import DonationForm from "../components/donation-form";
import UserService from "../service/user-service";
import AppContainer from "../components/app-container";
export default class CollectDonation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContainer title="Collect Donation" {...this.props} showFab={false}>
        <Content padder>
          <DonationForm {...this.props} />
        </Content>
      </AppContainer>
    );
  }
}
