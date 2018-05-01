import React, { Component } from "react";
import {
  Modal,
  Button,
  Collapse,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import ReactTable from "react-table";
import CollapsablePanel from "components/collapsable-panel";
import Confirm from "components/confirm";
import SearchUser from "components/user/search";
import DonorService from "services/donor-service";
import { Link } from "react-router-dom";
import { RightLayout } from "layout/right-layout";
import DonationCollection from "components/donation-collection";
import PledgeModal from "pages/donor/pledges";

export default class ListDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      showModal: false,
      showPledgeModal: false,
      pages: 1,
      showConfirm: false,
      idToDelete: null,
      showFilter: false
    };
    this.fetchData({});
  }

  fetchData(param) {
    this.setState({ isLoading: true });
    DonorService.getAllDonor(param)
      .then(response => {
        let data = response.data;
        this.setState({ data: data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  onDelete(rowMeta) {
    DonorService.deleteDonor(rowMeta.original.id)
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
  render() {
    return (
      <div>
        <RightLayout title="Donors" linkTo="/donor/add" linkText="Add Donor" />
        <CollapsablePanel
          isOpen={this.state.data ? false : true}
          title="Search"
        >
          <SearchUser onSearch={param => this.fetchData(param)} />
        </CollapsablePanel>
        {this.renderTable()}
      </div>
    );
  }

  renderTable() {
    if (!this.state.data) {
      return null;
    }
    const { data, isLoading } = this.state;
    return (
      <RightLayout>
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
                Header: "Donor",
                accessor: "id",
                Cell: rowMeta => {
                  return (
                    <div>
                      <b>
                        {rowMeta.original.firstname} {rowMeta.original.lastname}
                      </b>
                      <br />
                      {rowMeta.original.street}
                      <br />
                      {rowMeta.original.area}
                      <br />
                      {rowMeta.original.phone} {rowMeta.original.email}
                    </div>
                  );
                }
              },
              {
                id: "id",
                accessor: d => d.id,
                Cell: rowMeta => (
                  <div className="row-action">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={"edit" + rowMeta.original.id}>
                          Collect Donation
                        </Tooltip>
                      }
                    >
                      <a
                        onClick={() => {
                          this.setState({
                            showModal: true,
                            selectedDonor: rowMeta.original
                          });
                        }}
                      >
                        <i className="fa fa-money" />
                      </a>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={"edit" + rowMeta.original.id}>
                          Pledges
                        </Tooltip>
                      }
                    >
                      <a
                        onClick={() => {
                          this.setState({
                            showPledgeModal: true,
                            selectedDonor: rowMeta.original
                          });
                        }}
                      >
                        <i className="fa fa-money" />
                      </a>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={"edit" + rowMeta.original.id}>
                          Previous Donation
                        </Tooltip>
                      }
                    >
                      <Link to={"/donor/" + rowMeta.original.id + "/details"}>
                        <i className="fa fa-money" />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={"edit" + rowMeta.original.id}>
                          Pending Donation
                        </Tooltip>
                      }
                    >
                      <Link to={"/donor/" + rowMeta.original.id + "/details"}>
                        <i className="fa fa-money" />
                      </Link>
                    </OverlayTrigger>
                  </div>
                )
              },
              {
                id: "id",
                accessor: d => d.id,
                Cell: rowMeta => (
                  <div className="row-action">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={"edit" + rowMeta.original.id}>
                          Edit
                        </Tooltip>
                      }
                    >
                      <Link to={"/donor/" + rowMeta.original.id + "/edit"}>
                        <i className="fa fa-edit" />
                      </Link>
                    </OverlayTrigger>

                    <Confirm
                      onConfirm={() => {
                        this.onDelete(rowMeta);
                      }}
                      body="Are you sure you want to delete?"
                      confirmText="Confirm Delete"
                      title="Delete Donor"
                    >
                      <a>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id={"delete" + rowMeta.original.id}>
                              Delete
                            </Tooltip>
                          }
                        >
                          <i className="fa fa-trash-o" />
                        </OverlayTrigger>
                      </a>
                    </Confirm>
                  </div>
                )
              }
            ]}
            className="-striped -highlight"
          />
        </div>
        <DonationCollection
          donor={this.state.selectedDonor}
          showModal={this.state.showModal}
          onSuccess={() => {
            this.setState({ showModal: false, selectedDonor: null });
          }}
          onCancel={() => {
            this.setState({ showModal: false, selectedDonor: null });
          }}
        />

        <PledgeModal
          showModal={this.state.showPledgeModal}
          donor={this.state.selectedDonor}
          onSuccess={() => {
            this.setState({ showPledgeModal: false, selectedDonor: null });
          }}
          onCancel={() => {
            this.setState({ showPledgeModal: false, selectedDonor: null });
          }}
        />
      </RightLayout>
    );
  }
}
