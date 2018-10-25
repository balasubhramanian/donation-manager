import React, { Component } from "react";
import {
  Text,
  Content,
  ListItem,
  List,
  Spinner,
  Left,
  Right,
  Icon,
  Toast,
  Button
} from "native-base";
import { View, FlatList, StyleSheet } from "react-native";
import moment from "moment";
import Modal from "react-native-modal"; // 2.4.0

import RNFetchBlob from "react-native-fetch-blob";

import RNFS from "react-native-fs";
import Share from "react-native-share";

import AppContainer from "../components/app-container";
import DonationService from "../service/donation-service";
import DonationFilter from "../components/donation-filter";

const { fs } = RNFetchBlob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});

export default class Donation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: [],
      isLoading: true,
      filter: {
        groupByField: "created_at",
        startDate: moment()
          .startOf("year")
          .toDate(),
        endDate: moment()
          .endOf("year")
          .toDate()
      }
    };
  }

  componentDidMount() {
    this.getDonations();
  }

  getDonations() {
    setTimeout(() => {
      this.getDonationSync();
    }, 0);
  }

  getDonationSync() {
    const { startDate, endDate } = this.state.filter;
    return DonationService.getDonationByDate(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    )
      .then(data => {
        this.setState({
          donations: data,
          isLoading: false
        });
        return data;
      })
      .catch((e, ...args) => {
        console.log(args);
      });
  }

  exportDonation() {
    return this.getDonationSync().then(data => {
      console.log(data);
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
        `${fs.dirs.DownloadDir}/donation.txt`,
        csvData.join("\n")
      )
        .then(d => {
          Toast.show({ text: "File written to downloads " });
          //this.setState({ showShareModal: true });
          Share.open({
            url: `file://${fs.dirs.DownloadDir}/donation.csv`
          });
        })
        .catch(err => console.log(err));
    });
  }

  renderHeaderIcons() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 100,
          paddingTop: 30,
          paddingLeft: 50
        }}
      >
        <Button
          transparent
          onPress={() => {
            this.exportDonation();
          }}
        >
          <Icon name="cloud-download" />
        </Button>
        <Button
          transparent
          onPress={() => {
            this.setState({ showModal: true });
          }}
        >
          <Icon name="ios-funnel" />
        </Button>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black"
            }}
          >
            <Modal isVisible={this.state.showModal} transparent>
              <DonationFilter
                {...this.state.filter}
                onApply={filter => {
                  console.log(filter);
                  this.setState(
                    { showModal: false, filter, isLoading: true },
                    () => {
                      this.getDonations();
                    }
                  );
                }}
                onCancel={() => {
                  this.setState({ showModal: false });
                }}
              />
            </Modal>
            <Modal isVisible={this.state.showShareModal} transparent>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 10
                }}
              >
                <Text>Do you want to share?</Text>
                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    marginTop: 20
                  }}
                >
                  <Button
                    style={{ alignSelf: "baseline", marginRight: 10 }}
                    onPress={() => {
                      this.setState({ showShareModal: false }, () => {
                        Share.open({
                          url: `file://${fs.dirs.DownloadDir}/donation.csv`
                        });
                      });
                    }}
                  >
                    <Text> Yes</Text>
                  </Button>
                  <Button
                    light
                    style={{ alignSelf: "baseline", marginTop: 10 }}
                    onPress={() => {
                      this.setState({ showShareModal: false });
                    }}
                  >
                    <Text> No</Text>
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <AppContainer key="3" title="Donation" {...this.props}>
          <Content>
            <View style={{ flex: 1, alignContent: "flex-start" }}>
              <Spinner color="blue" />
            </View>
          </Content>
        </AppContainer>
      );
    }
    const sumDonation = (a, r) => a + r.amount;

    const total = this.state.donations.reduce(sumDonation, 0);
    const { groupByField } = this.state.filter;
    const groupByDate = this.state.donations.reduce((a, r) => {
      a[r[groupByField]] = a[r[groupByField]] || [];
      a[r[groupByField]].push(r);
      return a;
    }, {});

    console.log("grouped by date", groupByDate);

    console.log("donation collection", total);
    return (
      <AppContainer
        key="3"
        title="Donation"
        {...this.props}
        headerActions={this.renderHeaderIcons()}
      >
        <Content>
          <List noIndent style={{ padding: 0 }}>
            {Object.keys(groupByDate).map(e => (
              <List key={e}>
                <ListItem itemDivider>
                  <Left>
                    <Text>
                      {moment(e, "YYYY-MM-DD", true).isValid()
                        ? moment(e).format("DD-MMM-YY")
                        : e}
                    </Text>
                  </Left>

                  <Right>
                    <Text>{groupByDate[e].reduce(sumDonation, 0)}</Text>
                  </Right>
                </ListItem>
                <DonationList items={groupByDate[e]} showDate />
              </List>
            ))}
          </List>
        </Content>
      </AppContainer>
    );
  }
}

const DonationList = props => {
  const { items, showDate } = props;
  return (
    <FlatList
      data={items}
      renderItem={row => {
        const { item } = row;

        return (
          <ListItem
            key={item.id}
            style={{
              flex: 4,
              flexDirection: "row",
              alignItems: "flex-start"
            }}
          >
            <View style={{ flex: 3 }}>
              <View>
                <Text style={{ textAlign: "left", alignSelf: "stretch" }}>
                  {item.userName}
                </Text>
              </View>
              <View>
                <Text note style={{ textAlign: "left", alignSelf: "stretch" }}>
                  {item.campaignName}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: "stretch",
                    textAlign: "right",
                    color: "steelblue"
                  }}
                >
                  {item.amount}
                </Text>
              </View>
              {showDate && (
                <View style={{ flex: 1 }}>
                  <Text
                    note
                    style={{ textAlign: "right", alignSelf: "stretch" }}
                  >
                    {moment(item.date).format("DD-MMM-YY")}
                  </Text>
                </View>
              )}
            </View>
          </ListItem>
        );
      }}
    />
  );
};
