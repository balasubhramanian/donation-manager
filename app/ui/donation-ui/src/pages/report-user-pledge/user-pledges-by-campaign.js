import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import Confirm from "components/confirm";
import CampaignService from "services/campaign-service";
import UserPledgeService from "services/userpledge-service";
import ConfigService from "services/config-service";
import { RightLayout } from "layout/right-layout";
import DatePicker from "components/date-picker";
import Select from "react-select";
import DateUtils from "common/date-utils";
import AddEntry from "pages/cashflow/add-entry";

export default class UserPledgesByCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      campaigns: [],
      isLoading: true,
      selectedCampaign: null,
      fromDate: null,
      toDate: null
    };
  }
  componentWillMount(props) {
    this.fetchCampaign();
  }

  fetchCampaign() {
    CampaignService.getAllCampaign()
      .then(res => {
        const campaigns = res.data.map(c => ({ label: c.name, value: c.id }));
        this.setState({ campaigns: campaigns });
      })
      .catch(err => {
        console.log("Error getting config for cashflow", err);
      });
  }

  fetchUserPledgesForCampaign() {
    UserPledgeService.getCampaignPledgesReport({
      campaignId: this.state.selectedCampaign,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
      .then(response => {
        let data = response.data;
        this.setState({ data: data, isLoading: false });
      })
      .catch(err => {
        console.log("error fetching fetchUserPledgesForCampaign", err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div>
        <RightLayout title={"Campaign - User Payment "}>
          <div>
            <DatePicker
              id="fromDate"
              showMonthDropdown
              showYearDropdown
              value={this.state.fromDate}
              onChange={date => {
                this.setState({ fromDate: date });
              }}
              onBlur={date => {
                this.setState({ fromDate: date });
              }}
            />
            <DatePicker
              id="toDate"
              showMonthDropdown
              showYearDropdown
              value={this.state.toDate}
              onChange={date => {
                this.setState({ toDate: date });
              }}
              onBlur={date => {
                this.setState({ toDate: date });
              }}
            />
            <Select
              name="form-field-name"
              value={this.state.selectedCampaign}
              onChange={selectedOption => {
                this.setState({ selectedCampaign: selectedOption.value });
              }}
              multi={false}
              options={this.state.campaigns}
            />
            <button
              id="send"
              className="btn btn-success"
              onClick={() => {
                this.fetchUserPledgesForCampaign();
              }}
            >
              Save
            </button>
          </div>

          {JSON.stringify(this.state.data)}

          {/* <div>{this.renderTable()}</div> */}
        </RightLayout>
      </div>
    );
  }

  renderTable() {
    const { data, isLoading, showFilter } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id]).indexOf(filter.value) > -1
              : true;
          }}
          loading={isLoading}
          defaultPageSize={10}
          columns={[
            {
              Header: "Id",
              accessor: "id",
              filterable: showFilter
            },
            {
              Header: "Date ",
              accessor: "date",
              filterable: showFilter,
              Cell: rowMeta => DateUtils.toAppDate(rowMeta.row.date)
            },
            {
              Header: "Title",
              accessor: "typeName",
              filterable: showFilter
            },
            {
              Header: "Description",
              accessor: "typeDesc",
              filterable: showFilter
            },
            {
              Header: "Amount",
              accessor: "amount",
              filterable: showFilter,
              Cell: rowMeta => rowMeta.row.amount
            },
            {
              Header: "Account",
              accessor: "accountName",
              filterable: showFilter,
              Cell: rowMeta => rowMeta.row.accountName
            },

            {
              Header: (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.setState({ showFilter: !this.state.showFilter });
                  }}
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id={"filter"}>Search</Tooltip>}
                  >
                    <i className="fa fa-filter" />
                  </OverlayTrigger>
                </span>
              )
            }
          ]}
          className="-striped -highlight"
        />
        <AddEntry
          showModal={this.state.showModal}
          onCancel={() => {
            this.toggleModal();
          }}
          onSuccess={() => {
            this.toggleModal();
            this.fetchData();
          }}
          type={this.cashflow[this.state.type]}
          types={this.state.types}
          accounts={this.state.accounts}
        />
      </div>
    );
  }
}
