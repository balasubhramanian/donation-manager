import React, { Component, Touch } from "react";
import { AsyncStorage } from "react-native";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  Button,
  Content,
  Icon,
  List,
  ListItem,
  Body,
  Right,
  Toast
} from "native-base";
import RNFetchBlob from "react-native-fetch-blob";
import Share from "react-native-share";

const { fs } = RNFetchBlob;

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

var RNFS = require("react-native-fs");

import AppContainer from "../components/app-container";
import donorService from "../service/donor-service";
import campaignService from "../service/campaign-service";
import donationService from "../service/donation-service";
import Config from "../common/config";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedStreet: null,
      selectedCampaign: null
    };
  }

  componentDidMount() {
    Config.getDefaultStreet().then(street => {
      this.setState({ selectedStreet: street });
    });

    Config.getDefaultCampaign().then(campaign => {
      this.setState({ selectedCampaign: campaign });
    });
  }

  importCampaign() {
    return this.readJson()
      .then(data => {
        data.records.forEach(e => {
          campaignService.addCampaign(e);
        });
      })
      .then(() => {
        Toast.show({ text: "Campaign data Imported" });
      })
      .catch(e => {
        console.log("Error Importing Campaign", e);
        Toast.show({
          text: "Error Importing Campaign data",
          type: "danger"
        });
      });
  }

  importUser() {
    return this.readJson()
      .then(data => {
        data.records.forEach(e => {
          donorService.addUser(e);
        });
        console.log("insert success");
      })
      .then(() => {
        Toast.show({ text: "User data Imported" });
      })
      .catch(e => {
        console.log("Error Importing user", e);
        Toast.show({
          text: "Error Importing User data",
          type: "danger"
        });
      });
  }

  exportDonation() {
    return donationService.getAllDonation().then(data => {
      var jsonString = JSON.stringify(data);
      return RNFS.writeFile(fs.dirs.DownloadDir + "/donation.txt", jsonString)
        .then(d => {
          Toast.show({ text: "File written to downloads " });
          Share.open({
            url: "file://" + fs.dirs.DownloadDir + "/donation.txt"
          });
          console.log(d, "log writter");
        })
        .catch(err => console.log(err));
    });
  }

  readJson() {
    return new Promise((resolve, reject) => {
      return DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.allFiles()]
        },
        (error, res) => {
          if (!res) return;
          return RNFS.readFile(res.uri, "utf8")
            .then(d => {
              let data = JSON.parse(d);
              resolve(data);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      );
    });
  }

  deleteAllDonation() {
    donationService
      .deleteAll()
      .then(() => {
        alert("success");
        Toast.show({ text: "Donation data deleted" });
      })
      .catch(e => {
        console.log("Error deleting Donation", e);
        Toast.show({
          text: "Error deleting Donation data",
          type: "danger"
        });
      });
  }

  deleteAllUser() {
    donorService
      .deleteAll()
      .then(() => {
        alert("success");
        Toast.show({ text: "User data deleted" });
      })
      .catch(e => {
        console.log("Error deleting user", e);
        Toast.show({
          text: "Error deleting User data",
          type: "danger"
        });
      });
  }

  deleteAllCampaign() {
    campaignService
      .deleteAll()
      .then(() => {
        alert("success");
        Toast.show({ text: "Campaign data deleted" });
      })
      .catch(e => {
        console.log("Error deleting Campaign", e);
        Toast.show({
          text: "Error deleting Campaign data",
          type: "danger"
        });
      });
  }

  showCampaignSelect() {
    this.props.navigation.push("CampaignSelect", {
      onSelect: campaign => {
        Config.setDefaultCampaign(campaign);
        this.setState({ selectedCampaign: campaign });
      },
      showDrawer: false
    });
  }

  showStreetSelect() {
    this.props.navigation.push("StreetSelect", {
      onSelect: street => {
        Config.setDefaultStreet(street);
        this.setState({ selectedStreet: street });
      },
      showDrawer: false
    });
  }

  render() {
    return (
      <AppContainer title="Settings" {...this.props}>
        <Content style={{ padding: 0 }}>
          <List>
            <ListHeader text="EXPORT" />
            <ListItem icon stackedLabel>
              <Body>
                <Text style={styles.listItemText}>Donation</Text>
              </Body>
              <Right>
                <IconButton
                  icon="trash"
                  onPress={() => {
                    this.deleteAllDonation();
                  }}
                />
                <IconButton
                  icon="cloud-download"
                  onPress={() => {
                    this.exportDonation();
                  }}
                />
              </Right>
            </ListItem>

            <ListHeader text="IMPORT" />
            <ListItem icon stackedLabel>
              <Body>
                <Text style={styles.listItemText}> User</Text>
              </Body>
              <Right>
                <IconButton
                  icon="trash"
                  onPress={() => {
                    this.deleteAllUser();
                  }}
                />
                <IconButton
                  icon="cloud-upload"
                  onPress={() => {
                    this.importUser();
                  }}
                />
              </Right>
            </ListItem>

            <ListItem icon stackedLabel>
              <Body>
                <Text style={styles.listItemText}> Campaign</Text>
              </Body>

              <Right>
                <IconButton
                  icon="trash"
                  onPress={() => {
                    this.deleteAllCampaign();
                  }}
                />
                <IconButton
                  icon="cloud-upload"
                  onPress={() => {
                    this.importCampaign();
                  }}
                />
              </Right>
            </ListItem>

            <ListHeader text="DEFAULT" />
            <ListItem icon stackedLabel style={styles.listItem}>
              <Body>
                <TouchableOpacity
                  first
                  onPress={() => {
                    this.showCampaignSelect();
                  }}
                >
                  <Text style={styles.listItemText}>Campaign</Text>
                  <Text style={styles.listItemSubText}>
                    {this.state.selectedCampaign &&
                      this.state.selectedCampaign.name}
                  </Text>
                </TouchableOpacity>
              </Body>
              <Right />
            </ListItem>
            <ListItem icon stackedLabel style={styles.listItem}>
              <Body>
                <TouchableOpacity
                  first
                  onPress={() => {
                    this.showStreetSelect();
                  }}
                >
                  <Text style={styles.listItemText}>
                    Donation Collection Street
                  </Text>
                  <Text style={styles.listItemSubText}>
                    {this.state.selectedStreet &&
                      this.state.selectedStreet.street}
                  </Text>
                </TouchableOpacity>
              </Body>
              <Right />
            </ListItem>
          </List>
        </Content>
      </AppContainer>
    );
  }
}

const ListHeader = props => {
  return (
    <ListItem noIndent itemHeader style={styles.listHeader}>
      <Text>{props.text}</Text>
    </ListItem>
  );
};

const IconButton = props => {
  return (
    <Button transparent primary onPress={props.onPress}>
      <Icon active name={props.icon} style={styles.listItemIcon} />
    </Button>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    paddingBottom: 0,
    marginBottom: 0
  },
  listItem: {
    marginBottom: 15,
    marginTop: 15
  },
  listItemText: {
    fontSize: 14
  },
  listItemSubText: {
    fontSize: 14,
    color: "grey",
    paddingBottom: 10
  },
  listItemIcon: {
    fontSize: 22,
    marginRight: 15
  }
});
