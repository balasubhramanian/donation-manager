import React, { Component } from "react";
import { Content } from "native-base";

import AppContainer from "../components/app-container";
import CampaignService from "../service/campaign-service";
import CampaignList from "../components/campaign-list";
export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      campaigns: [],
      data: []
    };
  }
  componentDidMount() {
    this.fetchCampaign();
  }

  fetchCampaign() {
    this.setState({ isLoading: true });
    CampaignService.getAllCampaign().then(campaigns => {
      console.log("fetch campaign", campaigns);
      this.setState({ campaigns, data: campaigns, isLoading: false });
    });
  }

  render() {
    return (
      <AppContainer title="Campaign" {...this.props}>
        <Content>
          <CampaignList />
        </Content>
      </AppContainer>
    );
  }
}
