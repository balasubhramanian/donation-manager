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
      showFilter: false
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
    TransactionService.getAllTransaction({
      transactionType: this.cashflow[this.state.type].transactionType
    })
      .then(response => {
        let data = response.data;
        this.setState({ data: data, isLoading: false });
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
