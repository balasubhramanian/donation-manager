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
import DonorService from "services/donor-service";
import { Link } from "react-router-dom";
import { RightLayout } from "layout/right-layout";

export default class ListDonor extends Component {
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
    DonorService.getAllDonor()
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

  toggleModal(row) {
    this.setState({ showModal: !this.state.showModal, selectedRow: row });
  }

  renderSearchBox() {
    return (
      <CollapsablePanel title="Search">
        <form className="form-horizontal form-label-left" noValidate="">
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="name"
            >
              Id <span className="required" />
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                id="name"
                className="form-control col-md-7 col-xs-12"
                name="name"
                type="text"
              />
            </div>
            <div className="alert" />
          </div>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="name"
            >
              Name <span className="required" />
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                id="name"
                className="form-control col-md-7 col-xs-12"
                name="name"
                type="text"
              />
            </div>
            <div className="alert" />
          </div>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="name"
            >
              Phone <span className="required" />
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                id="name"
                className="form-control col-md-7 col-xs-12"
                name="name"
                type="text"
              />
            </div>
            <div className="alert" />
          </div>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="name"
            >
              Street <span className="required" />
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                id="name"
                className="form-control col-md-7 col-xs-12"
                name="name"
                type="text"
              />
            </div>
            <div className="alert" />
          </div>

          <div className="ln_solid" />
          <div className="form-group">
            <div className="col-md-6 col-md-offset-3">
              <button id="send" type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </CollapsablePanel>
    );
  }

  render() {
    return (
      <div>
        <RightLayout title="Donors" linkTo="/donor/add" linkText="Add Donor">
          <div className="table-responsive">{this.renderTable()}</div>
        </RightLayout>
        {this.renderModal()}
      </div>
    );
  }

  renderModal() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={() => {
          this.toggleModal();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>
            {this.state.selectedRow ? this.state.selectedRow.firstName : ""}
          </h1>
          <h1>
            {this.state.selectedRow ? this.state.selectedRow.lastName : ""}
          </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.toggleModal();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
              Header: "First Name",
              accessor: "firstname",
              filterable: showFilter
            },
            {
              Header: "Last Name",
              accessor: "lastname",
              filterable: showFilter
            },
            {
              Header: "Phone",
              accessor: "phone",
              filterable: showFilter
            },
            {
              Header: "Email",
              accessor: "email",
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
                  <i className="fa fa-filter" />
                </span>
              ),
              sortable: false,
              id: "id",
              accessor: d => d.id,
              Cell: rowMeta => (
                <div>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={"edit" + rowMeta.original.id}> Edit</Tooltip>
                    }
                  >
                    <Link to={"/donor/" + rowMeta.original.id + "/edit"}>
                      <i className="fa fa-edit" />
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={"delete" + rowMeta.original.id}>
                        Delete
                      </Tooltip>
                    }
                  >
                    <Confirm
                      onConfirm={() => {
                        this.onDelete(rowMeta);
                      }}
                      body="Are you sure you want to delete?"
                      confirmText="Confirm Delete"
                      title="Delete Donor"
                    >
                      <a>
                        <i className="fa fa-trash-o" />
                      </a>
                    </Confirm>
                  </OverlayTrigger>
                </div>
              )
            }
          ]}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
