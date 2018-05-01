import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import Confirm from "components/confirm";
import AccountService from "services/account-service";
import { RightLayout } from "layout/right-layout";
import DateUtils from "common/date-utils";
import AddEntry from "pages/account/add-entry";

export default class AccountList extends Component {
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

    this.fetchData();
  }

  fetchData() {
    this.setState({
      isLoading: true
    });
    AccountService.getAllAccount()
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        console.log("Error getting account", err);
      });
  }

  onDelete(rowMeta) {
    AccountService.deleteTransaction(rowMeta.original.id)
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
          title={"Manage Accounts"}
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
          showPaginationBottom={false}
          style={{ height: "500px" }}
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id]).indexOf(filter.value) > -1
              : true;
          }}
          loading={isLoading}
          columns={[
            {
              Header: "Id",
              accessor: "id",
              filterable: showFilter
            },
            {
              Header: "Name",
              accessor: "name",
              filterable: showFilter
            },
            {
              Header: "Description",
              accessor: "description",
              filterable: showFilter
            },
            {
              Header: "Account Number",
              accessor: "accountNo",
              filterable: showFilter
            },
            {
              Header: "Balance",
              accessor: "balance",
              filterable: showFilter
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
          types={this.state.types}
          accounts={this.state.accounts}
        />
      </div>
    );
  }
}
