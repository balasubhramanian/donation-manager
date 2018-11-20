import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Campaign from "./campaign";
import CollectDonation from "./collection-donation";
import Donation from "./donation";
import Settings from "./settings";
import User from "./user";
import AddUser from "./add-user";
// import Login from "./custom-login";
// import Login1 from "./login";

import CampaignSelect from "./campaign-select";
import StreetSelect from "./street-select";
import UserSelect from "./user-select";
import AddCampaign from "./add-campaign";

/*
 * Drawer Navigator to add drawer with links to screen
 */
const Drawer = createDrawerNavigator(
  {
    "Collect Donation": {
      screen: CollectDonation
    },
    Donation: {
      screen: Donation
    },
    // Login: {
    //  screen: Login
    // },
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
  { initialRouteName: "Donation" }
);

/*
 * Stack Navigator to open screens as stacks
 */
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
    },
    "Add User": {
      screen: AddUser
    },
    "Add Campaign": {
      screen: AddCampaign
    }
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        height: 0
      }
    })
  }
);

export default AppNavigator;
