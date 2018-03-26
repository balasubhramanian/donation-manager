import React, { Component } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import ReactTable from "react-table";
import CollapsablePanel from "components/collapsable-panel";
import { toast } from "react-toastify";
import UserService from "services/user-service";
import { Link } from "react-router-dom";

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true, showModal: false, pages: 1 };
    this.fetchData();
  }

  fetchData() {
    UserService.getAllUser()
      .then(response => {
        this.setState({ data: response.data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  buildTest() {
    let counter = (Math.random() * 100).toFixed(0);
    const statusChance = Math.random();
    return {
      firstName: "User" + counter,
      lastName: "last User" + counter,
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      status:
        statusChance > 0.66
          ? "relationship"
          : statusChance > 0.33 ? "complicated" : "single"
    };
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
    const Layout = props => {
      return (
        <div>
          <div className="page-title">
            <div className="title_left">
              <h3>{props.title}</h3>
            </div>

            <div className="title_right">
              <Link to="/user/add" className="btn btn-info pull-right">
                Add
              </Link>
            </div>
          </div>
          <div className="clearfix" />
          {props.searchBox()}
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="x_panel">
                <div className="x_content">
                  <div className="table-responsive">{props.children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <Layout title="Users" searchBox={this.renderSearchBox}>
          <div className="table-responsive">{this.renderTable()}</div>
        </Layout>
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
  fetchData1(state, instance) {
    console.log(state.pageSize, state.page, state.sorted, state.filtered);
  }

  renderTable() {
    const { data, isLoading, pages } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          loading={isLoading}
          pages={pages}
          onFetchData={this.fetchData1}
          columns={[
            {
              Header: "First Name",
              accessor: "firstname"
            },
            {
              Header: "Last Name",
              accessor: "lastname"
            },
            {
              Header: "Phone",
              accessor: "phone"
            },
            {
              Header: "Email",
              accessor: "email"
            },
            {
              /* {
              Header: "Last Name",
              id: "lastname",
              accessor: d => d.lastname,
              Cell: rowMeta => (
                <div>
                  <a
                    onClick={() => {
                      this.toggleModal(rowMeta.row);
                    }}
                  >
                    Edit
                  </a>
                </div>
              )
            } */
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
