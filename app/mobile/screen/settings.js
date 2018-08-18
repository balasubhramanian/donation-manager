import React, { Component, Touch } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  Input,
  Form,
  Item,
  Label,
  Button,
  ActionSheet,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Separator,
  Body,
  Left,
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

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  componentDidMount() {}

  importCampaign() {
    return this.readJson().then(data => {
      data.records.forEach(e => {
        campaignService.addCampaign(e);
      });
    });
  }

  importUser() {
    return this.readJson().then(data => {
      data.records.forEach(e => {
        donorService.addUser(e);
      });
      console.log("insert success");
    });
  }

  exportDonation() {
    {
      /* DocumentPicker.show(
  {
    filetype: [DocumentPickerUtil.allFiles()]
  },
  (error, res) => {
    // Android
    console.log(
      res.uri,
      res.type, // mime type
      res.fileName,
      res.fileSize
    ); */
    }

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

  render() {
    return (
      <AppContainer title="Settings" {...this.props}>
        <Content style={{ padding: 0 }}>
          <List>
            <ListItem
              noIndent
              itemHeader
              style={{ paddingBottom: 0, marginBottom: 0 }}
            >
              <Text>EXPORT</Text>
            </ListItem>
            <ListItem icon stackedLabel>
              <Body>
                <TouchableOpacity first>
                  <Text style={{ fontSize: 14 }}>Donation</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Button
                  transparent
                  primary
                  onPress={() => {
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
                  }}
                >
                  <Icon
                    active
                    name="trash"
                    style={{ fontSize: 22, marginRight: 15 }}
                  />
                </Button>
                <Button
                  transparent
                  primary
                  onPress={() => {
                    this.exportDonation();
                  }}
                >
                  <Icon active name="cloud-download" style={{ fontSize: 26 }} />
                </Button>
              </Right>
            </ListItem>

            <ListItem
              noIndent
              itemHeader
              style={{ paddingBottom: 0, marginBottom: 0 }}
            >
              <Text>IMPORT</Text>
            </ListItem>

            <ListItem icon stackedLabel>
              <Body>
                <TouchableOpacity first>
                  <Text style={{ fontSize: 14 }}> User</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Button
                  transparent
                  primary
                  onPress={() => {
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
                  }}
                >
                  <Icon
                    active
                    name="trash"
                    style={{ fontSize: 22, marginRight: 15 }}
                  />
                </Button>
                <Button
                  transparent
                  primary
                  onPress={() => {
                    this.importUser()
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
                  }}
                >
                  <Icon active name="cloud-upload" style={{ fontSize: 26 }} />
                </Button>
              </Right>
            </ListItem>
            <ListItem icon stackedLabel>
              <Body>
                <TouchableOpacity first>
                  <Text style={{ fontSize: 14 }}> Campaign</Text>
                </TouchableOpacity>
              </Body>

              <Right>
                <Button
                  transparent
                  primary
                  onPress={() => {
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
                  }}
                >
                  <Icon
                    name="trash"
                    style={{ fontSize: 22, marginRight: 15 }}
                  />
                </Button>
                <Button
                  transparent
                  primary
                  onPress={() => {
                    this.importCampaign()
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
                  }}
                >
                  <Icon active name="cloud-upload" style={{ fontSize: 26 }} />
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </AppContainer>
    );
  }
}
