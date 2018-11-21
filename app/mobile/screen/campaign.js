import React, { Component } from "react";
import { Content } from "native-base";

import AppContainer from "../components/app-container";
import CampaignList from "../components/campaign-list";

export default class Campaign extends Component {
  constructor(props) {
    super(props);

    this.campaignListRef = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      if (this.campaignListRef && this.campaignListRef.current) {
        this.campaignListRef.current.componentDidMount();
      }
    });
  }

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
          <CampaignList ref={this.campaignListRef} />
        </Content>
      </AppContainer>
    );
  }
}
