import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import Confirm from "components/confirm";
import TransactionService from "services/transaction-service";
import AccountService from "services/account-service";
import ConfigService from "services/config-service";
import { RightLayout } from "layout/right-layout";
import DateUtils from "common/date-utils";
import AddEntry from "pages/cashflow/add-entry";
import Select from "react-select";
import { Amt } from "common/formatter";
import DatePicker from "components/date-picker";
import moment from "moment";
import { toast } from "react-toastify";

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

    this.cashflow = {
      expense: {
        title: "Expense",
        transactionType: "DEBIT",
        configType: "expense_type"
      },
      income: {
        title: "Income",
        transactionType: "CREDIT",
        configType: "income_type"
      }
    };
    if (this.props.match.params.type) {
      this.state.type = this.props.match.params.type;
    }
    this.fetchConfigType();
    this.fetchData();
    this.fetchAccounts();
  }
  componentWillReceiveProps(props) {
    this.setState({ type: props.match.params.type }, () => {
      this.fetchConfigType();
      this.fetchData();
    });
  }

  fetchConfigType() {
    ConfigService.getConfigByModule(this.cashflow[this.state.type].configType)
      .then(res => {
        this.setState({
          types: res.data.map(t => ({ label: t.name, value: t.id }))
        });
      })
      .catch(err => {
        console.log("Error getting config for cashflow", err);
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

  fetchData() {
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
      typeId: this.state.selectedType,
      transactionType: this.cashflow[this.state.type].transactionType
    };

    this.setState({ isLoading: true });

    TransactionService.getAllTransaction(params)
      .then(response => {
        let data = response.data;
        let totalDonation = data.reduce((a, v) => a + v.amount, 0);
        this.setState({
          data: data,
          totalCashFlow: totalDonation,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  onDelete(rowMeta) {
    TransactionService.deleteTransaction(rowMeta.original.id)
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
          title={"Manage " + this.cashflow[this.state.type].title}
          linkText="Add"
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
                placeholder={this.cashflow[this.state.type].title + " Type"}
                value={this.state.selectedType}
                onChange={selectedOption => {
                  if (selectedOption) {
                    this.setState({ selectedType: selectedOption.value });
                  } else {
                    this.setState({ selectedType: null });
                  }
                }}
                multi={false}
                options={this.state.types}
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
            </div>
          </div>
        </RightLayout>
        {!this.state.isLoading && (
          <h4>
            Total {this.cashflow[this.state.type].title}
            &nbsp; <Amt value={this.state.totalCashFlow} />
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
              accessor: "description",
              filterable: showFilter
            },
            {
              Header: "Amount",
              accessor: "amount",
              filterable: showFilter,
              Cell: rowMeta => <Amt value={rowMeta.row.amount} />
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
