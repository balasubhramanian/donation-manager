import React, { Component } from "react";
import ReactTable from "react-table";
import TransactionService from "services/transaction-service";
import { RightLayout } from "layout/right-layout";
import DatePicker from "components/date-picker";
import Select from "react-select";
import "./report.css";

export default class LedgerEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      fromDate: null,
      toDate: null
    };
  }

  fetchTransactionEntries() {
    TransactionService.getDailyLedgerEntries({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
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
        <RightLayout title={"Ledger "}>
          <h4>Search</h4>
          <div className="ln_solid" />
          <div class="row">
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
                  this.fetchTransactionEntries();
                }}
              >
                Search
              </button>
            </div>
          </div>
        </RightLayout>
        <RightLayout>
          <div>{this.renderTable()}</div>
        </RightLayout>
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
                row.original.transactionType == 0 ? row.original.amount : ""
            },
            {
              Header: "Debit",
              accessor: "amount",
              filterable: showFilter,
              Cell: row =>
                row.original.transactionType == 1 ? row.original.amount : ""
            },
            {
              Header: "Total",
              accessor: "total",
              filterable: showFilter,
              Cell: row => row.original.total
            }
          ]}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
