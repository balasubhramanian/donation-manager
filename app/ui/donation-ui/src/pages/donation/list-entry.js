import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import Confirm from "components/confirm";
import DonationService from "services/donation-service";
import AccountService from "services/account-service";
import ConfigService from "services/config-service";
import { RightLayout } from "layout/right-layout";
import DateUtils from "common/date-utils";
import DonationCollection from "components/donation-collection";
import Select from "react-select";
import { Amt } from "common/formatter";
import DatePicker from "components/date-picker";
import moment from "moment";
import { toast } from "react-toastify";
import CampaignService from "services/campaign-service";

export default class ListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      showModal: false,
      pages: 1,
      showConfirm: false,
      idToDelete: null,
      showFilter: false,
      fromDate: moment(),
      toDate: moment()
    };
    this.fetchAccounts();
    this.fetchAllCampaign();
    this.fetchData();
  }

  fetchAllCampaign() {
    CampaignService.getActiveCampaign()
      .then(res => {
        this.setState({
          campaigns: res.data.map(c => ({ label: c.name, value: c.id }))
        });
      })
      .catch(err => {
        console.log("erro fetching campaign", err);
      });
  }
  fetchAccounts() {
    AccountService.getAllAccount()
      .then(res => {
        this.setState({
          accounts: res.data.map(t => ({ label: t.name, value: t.id }))
        });
      })
      .catch(err => {
        console.log("Error getting account for cashflow", err);
      });
  }

  fetchData(isExport) {
    if (!this.state.fromDate) {
      toast.error("Start Date is required");
      return;
    }

    if (!this.state.toDate) {
      toast.error("End Date is required ");
      return;
    }

    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;

    if (typeof fromDate === "object") {
      fromDate = this.state.fromDate.format("YYYY-MM-DD");
    }

    if (typeof toDate === "object") {
      toDate = this.state.toDate.format("YYYY-MM-DD");
    }

    const params = {
      fromDate: fromDate,
      toDate: toDate,
      campaignId: this.state.campaignId
    };

    if (isExport) {
      window.open(DonationService.getAllDonationUrl(params), "_blank");
      return;
    }

    this.setState({ isLoading: true });
    DonationService.getAllDonation(params)
      .then(response => {
        let data = response.data;
        let totalDonation = data.reduce((a, v) => a + v.amount, 0);
        this.setState({
          data: data,
          totalDonation: totalDonation,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  onDelete(rowMeta) {
    DonationService.deleteDonation(rowMeta.original.id)
      .then(response => {
        let data = [
          ...this.state.data.slice(0, rowMeta.index),
          ...this.state.data.slice(rowMeta.index + 1)
        ];
        this.setState({
          data: data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  toggleModal(row) {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div>
        <RightLayout
          title="Manage Donation"
          linkText="Collect Donation"
          onClick={() => {
            this.toggleModal();
          }}
        >
          <h4>Search</h4>
          <div className="ln_solid" />
          <div class="row">
            <div class="col-xs-12 col-md-3">
              <Select
                name="form-field-name"
                placeholder="Campaign"
                value={this.state.campaignId}
                onChange={selectedOption => {
                  this.setState({
                    campaignId: selectedOption ? selectedOption.value : null
                  });
                }}
                multi={false}
                options={this.state.campaigns}
              />
            </div>
            <div class="col-xs-12 col-md-3">
              <DatePicker
                id="fromDate"
                defaultToday
                placeholderText="Start Date"
                showMonthDropdown
                showYearDropdown
                value={this.state.fromDate}
                onChange={date => {
                  this.setState({ fromDate: date });
                }}
                onBlur={date => {
                  this.setState({ fromDate: date });
                }}
                showQuickLinks={true}
                onQuickLink={(fromDate, toDate) => {
                  this.setState({ fromDate, toDate }, () => {});
                }}
              />
            </div>
            <div class="col-xs-12 col-md-3">
              <DatePicker
                id="toDate"
                placeholderText="End Date"
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
            </div>
            <div class="col-xs-12 col-md-2">
              <button
                ref="btnSearch"
                className="btn btn-success"
                onClick={() => {
                  this.fetchData();
                }}
              >
                Search
              </button>
              <button
                ref="btnSearch"
                className="btn btn-default"
                onClick={() => {
                  this.fetchData(true);
                }}
              >
                <i className="fa fa-download" />
              </button>
            </div>
          </div>
        </RightLayout>
        {!this.state.isLoading && (
          <h4>
            Total Donation : <Amt value={this.state.totalDonation} />
          </h4>
        )}
        <RightLayout>
          <div>{this.renderTable()}</div>
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
          defaultPageSize={100}
          minRows={5}
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
              Header: "Donor",
              accessor: "donorName",
              filterable: showFilter
            },
            {
              Header: "Campaign",
              accessor: "campaignName",
              filterable: showFilter
            },
            {
              Header: "Amount",
              accessor: "amount",
              filterable: showFilter,
              Cell: rowMeta => <Amt value={rowMeta.original.amount} />
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
        <DonationCollection
          showModal={this.state.showModal}
          onCancel={() => {
            this.toggleModal();
          }}
          onSuccess={() => {
            this.toggleModal();
            this.fetchData();
          }}
        />
      </div>
    );
  }
}
