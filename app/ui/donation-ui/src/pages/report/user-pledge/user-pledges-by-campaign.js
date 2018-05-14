import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactTable from "react-table";
import CampaignService from "services/campaign-service";
import UserPledgeService from "services/userpledge-service";
import { RightLayout } from "layout/right-layout";
import DatePicker from "components/date-picker";
import Select from "react-select";
import { toast } from "react-toastify";
import "../report.css";
import { Amt } from "common/formatter";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const exportBtn = props => {};

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
    if (!this.state.selectedCampaign) {
      toast.error("Campaign is required");
      return;
    }
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
      campaignId: this.state.selectedCampaign,
      fromDate: fromDate,
      toDate: toDate
    };

    UserPledgeService.getCampaignPledgesReport(params)
      .then(response => {
        let data = response.data;
        let pending = data.filter(d => d.paidAmount == null);
        let paid = data.filter(d => d.paidAmount >= d.pledgedAmount);
        let partiallyPaid = data.filter(
          d =>
            d.paidAmount &&
            d.pledgedAmount - (d.paidAmount ? d.paidAmount : 0) > 0
        );
        this.setState({
          data: data,
          pending,
          paid,
          partiallyPaid,
          isLoading: false
        });
      })
      .catch(err => {
        console.log("error fetching fetchUserPledgesForCampaign", err);
        this.setState({ isLoading: false });
      });
  }
  exportToCsv(data, showPending) {
    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent +=
      "Period,User,Phone,Pledged,Paid" +
      (showPending ? ",Pending" : "") +
      "\r\n";

    let rows = data.map(d => {
      let row = [];
      row.push(d.period);
      row.push(d.firstname);
      row.push(d.phone);
      row.push(d.pledgedAmount);
      row.push(d.paidAmount);
      if (showPending) {
        row.push(d.pledgedAmount - d.paidAmount);
      }
      return row.join(",");
    });

    csvContent += rows.join("\r\n");

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  render() {
    return (
      <div>
        <RightLayout title={"Campaign - User Payment "}>
          <h4>Search</h4>
          <div className="ln_solid" />
          <div class="row">
            <div class="col-xs-12 col-md-3">
              <Select
                name="form-field-name"
                placeholder="Campaign"
                value={this.state.selectedCampaign}
                onChange={selectedOption => {
                  this.setState({
                    selectedCampaign: selectedOption
                      ? selectedOption.value
                      : null
                  });
                }}
                multi={false}
                options={this.state.campaigns}
              />
            </div>
            <div class="col-xs-12 col-md-3">
              <DatePicker
                id="fromDate"
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

            <div class="col-xs-12 col-md-3">
              <button
                id="send"
                className="btn btn-success"
                onClick={() => {
                  this.fetchUserPledgesForCampaign();
                }}
              >
                Search
              </button>
            </div>
          </div>
        </RightLayout>

        {!this.state.isLoading && (
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab
              eventKey={1}
              title={"Pending Donation (" + this.state.pending.length + ")"}
            >
              <RightLayout>
                <h4>
                  Pending Amount &nbsp;
                  <Amt
                    value={this.state.pending.reduce(
                      (a, c) => a + c.pledgedAmount,
                      0
                    )}
                  />
                  &nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id={"1"}>Download</Tooltip>}
                  >
                    <button
                      style={{ border: "none" }}
                      class="btn btn-default"
                      onClick={() => {
                        this.exportToCsv(this.state.pending);
                      }}
                    >
                      <i className="fa fa-download"> </i>
                    </button>
                  </OverlayTrigger>
                </h4>
                <div>{this.renderTable(this.state.pending, true)}</div>
              </RightLayout>
            </Tab>
            <Tab
              eventKey={2}
              title={
                "Partially Donated (" + this.state.partiallyPaid.length + ")"
              }
            >
              <RightLayout>
                <h4>
                  Pending Amount &nbsp;
                  <Amt
                    value={this.state.partiallyPaid.reduce(
                      (a, c) => a + (c.pledgedAmount - c.paidAmount),
                      0
                    )}
                  />
                  &nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id={"1"}>Download</Tooltip>}
                  >
                    <button
                      style={{ border: "none" }}
                      class="btn btn-default"
                      onClick={() => {
                        this.exportToCsv(this.state.partiallyPaid, true);
                      }}
                    >
                      <i className="fa fa-download"> </i>
                    </button>
                  </OverlayTrigger>
                </h4>

                <h4>
                  Collected Amount &nbsp;
                  <Amt
                    value={this.state.partiallyPaid.reduce(
                      (a, c) => a + c.paidAmount,
                      0
                    )}
                  />
                  &nbsp;
                </h4>
                <div>{this.renderTable(this.state.partiallyPaid)}</div>
              </RightLayout>
            </Tab>
            <Tab
              eventKey={3}
              title={"Fully Donated (" + this.state.paid.length + ")"}
            >
              <RightLayout>
                <h4>
                  Collected Amount &nbsp;
                  <Amt
                    value={this.state.paid.reduce(
                      (a, c) => a + c.paidAmount,
                      0
                    )}
                  />
                  &nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id={"1"}>Download</Tooltip>}
                  >
                    <button
                      style={{ border: "none" }}
                      class="btn btn-default"
                      onClick={() => {
                        this.exportToCsv(this.state.paid);
                      }}
                    >
                      <i className="fa fa-download"> </i>
                    </button>
                  </OverlayTrigger>
                </h4>
                <div>{this.renderTable(this.state.paid, true)}</div>
              </RightLayout>
            </Tab>
          </Tabs>
        )}
      </div>
    );
  }

  renderTable(data, hidePending) {
    const { isLoading, showFilter } = this.state;

    if (isLoading) return null;

    // return (
    //   <table class="table table-bordered table-condensed ">
    //     <thead>
    //       <tr>
    //         <th>Period</th>
    //         <th>User</th>
    //         <th>Pledged Amount</th>
    //         <th>Donated Amount</th>
    //       </tr>
    //     </thead>

    //     {data.map(row => (
    //       <tr>
    //         <td>{row.period}</td>
    //         <td>{row.firstname}</td>
    //         <td>{row.pledgedAmount}</td>
    //         <td>{row.paidAmount}</td>
    //       </tr>
    //     ))}
    //   </table>
    // );

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
          minRows={5}
          showPagination={false}
          columns={[
            {
              Header: "Period",
              accessor: "period",
              filterable: showFilter,
              sortable: true
            },
            {
              Header: "User",
              accessor: "firstname",
              filterable: showFilter,
              sortable: true
            },
            {
              Header: "Phone",
              accessor: "phone",
              filterable: showFilter,
              sortable: true
            },
            {
              Header: "Pledged ",
              accessor: "pledgedAmount",
              sortable: true,
              Cell: rowMeta => <Amt value={rowMeta.original.pledgedAmount} />
            },
            {
              Header: "Paid",
              accessor: "paidAmount",
              filterable: showFilter,
              Cell: row => (
                <Amt
                  value={row.original.paidAmount ? row.original.paidAmount : 0}
                />
              )
            },
            {
              Header: "Pending",
              show: !hidePending,
              Cell: row => {
                let pendingAmount =
                  row.original.pledgedAmount -
                  (row.original.paidAmount ? row.original.paidAmount : 0);
                return pendingAmount > 0 ? <Amt value={pendingAmount} /> : "";
              }
            }
          ]}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
