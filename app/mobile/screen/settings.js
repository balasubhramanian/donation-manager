import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import {
  Text,
  Button,
  Content,
  Icon,
  List,
  ListItem,
  Body,
  Right,
  Toast,
  View,
  Picker,
  Input
} from "native-base";
import RNFetchBlob from "react-native-fetch-blob";
import Share from "react-native-share";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNFS from "react-native-fs";
import Csv2Json from "csvtojson";

import AppContainer from "../components/app-container";
import donorService from "../service/donor-service";
import campaignService from "../service/campaign-service";
import donationService from "../service/donation-service";
import Config from "../common/config";

const { fs } = RNFetchBlob;

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStreet: null,
      selectedCampaign: null,
      hideDelete: true,
      smsText: null
    };
  }

  componentDidMount() {
    Config.getDefaultStreet().then(street => {
      this.setState({ selectedStreet: street });
    });

    Config.getDefaultCampaign().then(campaign => {
      this.setState({ selectedCampaign: campaign });
    });

    Config.getDefaultSMS()
      .then(sms => {
        const msg = sms ? sms : "Thanks for donating Rs. {amount}";
        this.setState({
          smsText: msg
        });
      })
      .catch(() => {
        console.log("error getting default sms", arguments);
      });
  }

  importCampaign() {
    return this.readJson()
      .then(data => {
        console.log(data);
        data.forEach(e => {
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
        data.forEach(e => {
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
      let csvData = data.map(d => {
        const row = [
          d.id,
          d.date,
          d.amount,
          d.userId,
          d.campaignId,
          d.createdAt,
          d.userName,
          d.campaignName
        ];
        return row.join(",");
      });

      csvData = ["id,date,amount,donorId,campaignId,createdAt"].concat(csvData);
      console.log("Download Dir", fs.dirs.DownloadDir, csvData.join("\n"));
      return RNFS.writeFile(
        `${fs.dirs.DownloadDir}/donation.csv`,
        csvData.join("\n")
      )
        .then(d => {
          Toast.show({ text: "File written to downloads " });
          Share.open({
            url: `file://${fs.dirs.DownloadDir}/donation.csv`
          });
          console.log(d, "log writter");
        })
        .catch(err => console.log(err));
    });
  }

  exportCampaign() {
    return campaignService.getAllCampaign().then(data => {
      let csvData = data.map(campaign => {
        const row = [
          campaign.id,
          campaign.name,
          campaign.description,
          campaign.status,
          campaign.type
        ];
        return row.join(",");
      });

      csvData = ["id,name,description,status,type"].concat(csvData);
      console.log("Download Dir", fs.dirs.DownloadDir, csvData.join("\n"));
      return RNFS.writeFile(
        `${fs.dirs.DownloadDir}/app-campaign.csv`,
        csvData.join("\n")
      )
        .then(d => {
          Toast.show({ text: "File written to downloads " });
        })
        .catch(err => console.log(err));
    });
  }

  exportUser() {
    return donorService.getAllDonors().then(data => {
      let csvData = data.map(d => {
        const row = [
          d.id,
          d.firstname,
          d.lastname,
          d.email,
          d.phone,
          d.doorno,
          d.street,
          d.area,
          d.city,
          d.state,
          d.country
        ];
        return row.join(",");
      });

      csvData = [
        "id,firstname,lastname,email,phone,doorno,street,area,city,state,country"
      ].concat(csvData);
      console.log("Download Dir", fs.dirs.DownloadDir, csvData.join("\n"));
      return RNFS.writeFile(
        `${fs.dirs.DownloadDir}/app-donors.csv`,
        csvData.join("\n")
      )
        .then(d => {
          Toast.show({ text: "File written to downloads " });
        })
        .catch(err => console.log(err));
    });
  }

  readJson() {
    return new Promise((resolve, reject) => {
      console.log("showing picker");
      return DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.allFiles()]
        },
        (error, res) => {
          if (res) {
            return RNFS.readFile(res.uri, "utf8")
              .then(d => {
                if (res.uri.indexOf(".csv") >= 0) {
                  console.log(Csv2Json);
                  Csv2Json()
                    .fromString(d)
                    .then(jsonObj => {
                      resolve(jsonObj);
                    });
                } else {
                  const data = JSON.parse(d);
                  resolve(data);
                }
              })
              .catch((...args) => {
                console.log("csvtojson err", args);
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          }
          return null;
        }
      );
    });
  }

  deleteAllDonation() {
    donationService
      .deleteAll()
      .then(() => {
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
                  hide={this.state.hideDelete}
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
                  hide={this.state.hideDelete}
                  icon="trash"
                  onPress={() => {
                    this.deleteAllUser();
                  }}
                />
                <IconButton
                  hide={this.state.hideDelete}
                  icon="cloud-download"
                  onPress={() => {
                    this.exportUser();
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
                  hide={this.state.hideDelete}
                  icon="trash"
                  onPress={() => {
                    this.deleteAllCampaign();
                  }}
                />
                <IconButton
                  hide={this.state.hideDelete}
                  icon="cloud-download"
                  onPress={() => {
                    this.exportCampaign();
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
            <ListItem icon stackedLabel>
              <Body>
                <TouchableOpacity
                  first
                  onPress={() => {
                    this.setState(prevState => ({
                      hideDelete: !prevState.hideDelete
                    }));
                  }}
                >
                  <Text style={styles.listItemText}>
                    {this.state.hideDelete ? "Show Advanced" : "Hide Advanced"}
                  </Text>
                </TouchableOpacity>
              </Body>
              <Right />
            </ListItem>
            <ListHeader text="SMS TEXT" />
            <ListItem>
              <Input
                style={{
                  fontSize: 16,
                  color: "#000"
                }}
                onChangeText={smsText => {
                  Config.setDefaultSMS(smsText);
                  this.setState({ smsText });
                }}
                value={this.state.smsText}
              />
            </ListItem>
          </List>
        </Content>
      </AppContainer>
    );
  }
}

const ListHeader = props => (
  <ListItem noIndent itemHeader style={styles.listHeader}>
    <Text>{props.text}</Text>
  </ListItem>
);

const IconButton = props => {
  if (!props.hide) {
    return (
      <Button transparent primary onPress={props.onPress}>
        <Icon active name={props.icon} style={styles.listItemIcon} />
      </Button>
    );
  }
  return null;
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
