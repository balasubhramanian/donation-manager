import React, { Component } from "react";
import { Content } from "native-base";

import AppContainer from "../components/app-container";
import CampaignList from "../components/campaign-list";

export default class Campaign extends Component {
  render() {
    return (
      <AppContainer
        title="Campaign"
        {...this.props}
        showFab
        onFabPress={() => {
          this.props.navigation.push("Add Campaign");
        }}
      >
        <Content>
          <CampaignList />
        </Content>
      </AppContainer>
    );
  }
}
