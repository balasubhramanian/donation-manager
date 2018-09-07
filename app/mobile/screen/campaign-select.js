import React, { Component } from "react";
import { Content } from "native-base";

import AppContainer from "../components/app-container";
import CampaignList from "../components/campaign-list";

export default class CampaignSelect extends Component {
  render() {
    return (
      <AppContainer
        key="2"
        title="Campaign"
        showDrawer={false}
        showSearch={false}
        {...this.props}
      >
        <Content style={{ padding: 0 }}>
          <CampaignList
            onClick={item => {
              this.props.navigation.state.params.onSelect(item);
              this.props.navigation.goBack();
            }}
          />
        </Content>
      </AppContainer>
    );
  }
}
