import React, { Component } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(this.buildTest(i));
    }
    this.state = { data: arr, showModal: false, searchShow: false };
  }

  buildTest(counter) {
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

  render() {
    return (
      <div>
        <div className="page-title">
          <div className="title_left">
            <h3>Users</h3>
          </div>

          <div className="title_right">
            <a href="add-user.html" className="btn btn-info pull-right">
              Add
            </a>
          </div>
        </div>
        <div className="clearfix" />
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel" style={{ height: "auto" }}>
              <div
                className="x_title"
                onClick={() => {
                  this.setState({ searchShow: !this.state.searchShow });
                }}
              >
                <h2 className="collapse-link">Search</h2>
                <ul className="nav navbar-right panel_toolbox">
                  <li>
                    <a className="collapse-link">
                      <i className="fa fa-chevron-down" />
                    </a>
                  </li>
                </ul>
                <div className="clearfix" />
              </div>
              <Collapse in={this.state.searchShow}>
                <div className="x_content">
                  <form
                    className="form-horizontal form-label-left"
                    noValidate=""
                  >
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
                        <button
                          id="send"
                          type="submit"
                          className="btn btn-success"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">{this.render1()}</div>
              </div>
            </div>
          </div>
        </div>
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

  render1() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "First Name",
              accessor: "firstName"
            },
            {
              Header: "Last Name",
              id: "lastName",
              accessor: d => d.lastName,
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
