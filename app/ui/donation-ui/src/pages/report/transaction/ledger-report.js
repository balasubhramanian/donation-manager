import React, { Component } from "react";
import ReactTable from "react-table";
import TransactionService from "services/transaction-service";
import { RightLayout } from "layout/right-layout";
import DatePicker from "components/date-picker";
import Select from "react-select";
import { toast } from "react-toastify";
import { Amt } from "common/formatter";
import "../report.css";

export default class LedgerReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      fromDate: null,
      toDate: null,
      selectedReportType: "DAILY",
      reportType: [
        {
          value: "MONTHLY",
          label: "Monthly"
        },
        {
          value: "DAILY",
          label: "Daily"
        }
      ]
    };
  }

  fetchTransactionEntries() {
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
      toDate: toDate
    };

    let promise;
    if (this.state.selectedReportType === "MONTHLY") {
      promise = TransactionService.getMonthlyLedgerEntries(params);
    } else {
      promise = TransactionService.getDailyLedgerEntries(params);
    }

    promise
      .then(response => {
        let data = response.data;
        let runningBalance = data.openingBalance;
        let openingBalance = {
          date: "",
          collectionType: "Opening Balance",
          total: data.openingBalance
        };
        data.entries.forEach(r => {
          const tranasctionAmt =
            r.transactionType == 0 ? r.amount : r.amount * -1;
          runningBalance = runningBalance + tranasctionAmt;
          r.total = runningBalance;
        });
        data.entries = [openingBalance, ...data.entries];

        this.setState({
          data: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log("error fetching fetchTransactionEntries", err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div>
        <RightLayout title={"Ledger Summary"}>
          <h4>Search</h4>
          <div className="ln_solid" />
          <div class="row">
            <div class="col-xs-12 col-md-3">
              <Select
                name="form-field-name"
                placeholder="Report Type"
                value={this.state.selectedReportType}
                onChange={selectedOption => {
                  if (selectedOption) {
                    this.setState({ selectedReportType: selectedOption.value });
                  }
                }}
                multi={false}
                options={this.state.reportType}
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
            <div class="col-xs-12 col-md-2">
              <button
                ref="btnSearch"
                className="btn btn-success"
                onClick={() => {
                  this.fetchTransactionEntries();
                }}
              >
                Search
              </button>
            </div>
          </div>
        </RightLayout>
        {this.state.data && (
          <RightLayout>
            <div>{this.renderTable()}</div>
          </RightLayout>
        )}
      </div>
    );
  }

  renderTable() {
    const { isLoading, data, showFilter } = this.state;

    if (isLoading) return null;

    return (
      <div>
        <ReactTable
          data={data.entries}
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
              Header: "Date",
              accessor: "date",
              filterable: showFilter,
              sortable: true
            },
            {
              Header: "Title",
              accessor: "collectionType",
              filterable: showFilter,
              sortable: true
            },
            {
              Header: "Credit ",
              accessor: "amount",
              filterable: showFilter,
              Cell: row =>
                row.original.transactionType == 0 ? (
                  <Amt value={row.original.amount} />
                ) : (
                  ""
                )
            },
            {
              Header: "Debit",
              accessor: "amount",
              filterable: showFilter,
              Cell: row =>
                row.original.transactionType == 1 ? (
                  <Amt value={row.original.amount} />
                ) : (
                  ""
                )
            },
            {
              Header: "Total",
              accessor: "total",
              filterable: showFilter,
              Cell: row => <Amt value={row.original.total} />
            }
          ]}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
