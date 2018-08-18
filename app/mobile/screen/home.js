import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Input,
  Form,
  Item,
  Label,
  Button,
  Header,
  Container,
  Left,
  Title,
  Content,
  Subtitle,
  Icon,
  Body
} from "native-base";
import {
  TabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import UserService from "../service/user-service";

import User from "./user";
import UserSelect from "./user-select";
import CampaignSelect from "./campaign-select";
import Campaign from "./campaign";
import CollectDonation from "./collection-donation";
import UserList from "../components/user-list";
import Donation from "./donation";
import Settings from "./settings";

class SideBar extends Component {
  render() {
    return <Text>test</Text>;
  }
}

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
  //   {
  //     headerMode: "float",
  //     navigationOptions: ({ navigation }) => ({
  //       headerLeft: (
  //         <Button
  //           transparent
  //           onPress={() => {
  //             navigation.toggleDrawer();
  //           }}
  //         >
  //           <Icon name="menu" />
  //         </Button>
  //       )
  //     })
  //   }
);

const MyNavigator = createStackNavigator(
  {
    Drawer: {
      screen: Drawer
    },
    UserSelect: {
      screen: UserSelect
    },
    CampaignSelect: {
      screen: CampaignSelect
    }
    // ,
    // CollectDonation: {
    //   screen: CollectDonation
    // },
    // Donation: {
    //   screen: Donation
    // },
    // Campaign: {
    //   screen: Campaign
    // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        height: 0
      }
    })
  }
);

export default MyNavigator;

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     closeDrawer = () => {
//       this.drawer._root.close();
//     };
//     openDrawer = () => {
//       alert("opening ");
//       console.log(this.drawer);
//       this.drawer._root.open(null, () => {
//         console.log("opened");
//       });
//     };
//     return (
//       <Drawer
//         key="2"
//         ref={ref => {
//           this.drawer = ref;
//         }}
//         content={<SideBar navigator={this.navigator} />}
//         onClose={() => this.closeDrawer()}
//       >
//         <Header>
//           <Left>
//             <Button transparent onPress={openDrawer}>
//               <Icon name="menu" />
//             </Button>
//           </Left>
//           <Body>
//             <Title>Title</Title>
//             <Subtitle>Subtitle</Subtitle>
//           </Body>
//         </Header>

//         <Content>
//           <Text>23Content</Text>
//         </Content>
//       </Drawer>
//     );
//   }
// }
//export default Home;
