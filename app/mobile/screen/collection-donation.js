import React, { Component } from "react";
import { Content } from "native-base";

import DonationForm from "../components/donation-form";
import AppContainer from "../components/app-container";

export default class CollectDonation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContainer title="Collect Donation" {...this.props} showFab={false}>
        <Content padder>
          <DonationForm {...this.props} />
        </Content>
      </AppContainer>
    );
  }
}
