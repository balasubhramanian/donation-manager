import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";
import {
  TabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";

import User from "./user";
import UserSelect from "./user-select";
import CampaignSelect from "./campaign-select";
import Campaign from "./campaign";
import CollectDonation from "./collection-donation";
import StreetSelect from "./street-select";
import Donation from "./donation";
import Settings from "./settings";

const Drawer = createDrawerNavigator(
  {
    "Collect Donation": {
      screen: CollectDonation
    },
    Donation: {
      screen: Donation
    },
    User: {
      screen: User,
      navigationOptions: {
        title: "User"
      }
    },
    Campaign: {
      screen: Campaign
    },
    Settings: {
      screen: Settings
    }
  },
  { initialRouteName: "Collect Donation" }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {
      screen: Drawer
    },
    UserSelect: {
      screen: UserSelect
    },
    CampaignSelect: {
      screen: CampaignSelect
    },
    StreetSelect: {
      screen: StreetSelect
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        height: 0
      }
    })
  }
);

export default AppNavigator;
