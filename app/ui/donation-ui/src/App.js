import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./store";
import { ConnectedRouter } from "react-router-redux";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-table/react-table.css";
import "react-select/dist/react-select.css";
import "react-datepicker/dist/react-datepicker.css";

import LoginPage from "pages/login";
import AppLayout from "layout/left-nav-layout";
import ListUserPage from "pages/user/list-user";
import AddUserPage from "pages/user/add-user";

import AddDonorPage from "pages/donor/add-donor";
import ListDonorPage from "pages/donor/list-donor";
import Fundraising from "pages/fundraising";
import Campaign from "pages/fundraising/campaign";
import AddCampaign from "pages/fundraising/add-campaign";

import ListCashFlow from "pages/cashflow/list-entry";
import ListDonation from "pages/donation/list-entry";
import ListAccount from "pages/account/list-entry";

import ListConfig from "pages/config/list-config";
import UserPledgesByCampaign from "pages/report/user-pledge/user-pledges-by-campaign";
import LedgerReport from "pages/report/transaction/ledger-report";

const ProtectedContainer = props => {
  if (!props.isLoggedIn) {
    history.push("/login");
  }
  return (
    <AppLayout>
      <Route exact path="/" component={ListDonorPage} />
      <Route exact path="/user" component={ListUserPage} />
      <Route exact path="/user/add" component={AddUserPage} />
      <Route exact path="/user/:userId/edit" component={AddUserPage} />

      <Route exact path="/fundraising" component={Fundraising} />

      <Route exact path="/donor" component={ListDonorPage} />
      <Route exact path="/donor/add" component={AddDonorPage} />
      <Route exact path="/donor/:donorId/edit" component={AddDonorPage} />

      <Route exact path="/campaign" component={Campaign} />
      <Route exact path="/campaign/add" component={AddCampaign} />
      <Route exact path="/campaign/:campaignId/edit" component={AddCampaign} />

      <Route exact path="/config/:module" component={ListConfig} />

      <Route exact path="/cashflow/:type" component={ListCashFlow} />

      <Route exact path="/donation" component={ListDonation} />

      <Route exact path="/account" component={ListAccount} />

      <Route
        exact
        path="/reports/campaign-pledges"
        component={UserPledgesByCampaign}
      />
      <Route exact path="/reports/daily-ledger" component={LedgerReport} />
    </AppLayout>
  );
};

const ConnectedProtectedContainer = connect(state => ({ ...state.auth }), {})(
  ProtectedContainer
);

class App extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={ConnectedProtectedContainer} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
