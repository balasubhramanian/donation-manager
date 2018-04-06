import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import Confirm from "components/confirm";
import UpdatePasswordModal from "components/user/update-password-modal";
import UserService from "services/user-service";
import { Link } from "react-router-dom";
import { RightLayout } from "layout/right-layout";

const ActionControls = props => {
  const { rowMeta, onDelete, onUpdatePassword } = props;
  return (
    <div class="row-action">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id={"edit" + rowMeta.original.id}> Edit</Tooltip>}
      >
        <Link to={"/user/" + rowMeta.original.id + "/edit"}>
          <i className="fa fa-edit" />
        </Link>
      </OverlayTrigger>

      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id={"password" + rowMeta.original.id}>
            Update Password
          </Tooltip>
        }
      >
        <a
          onClick={() => {
            onUpdatePassword(rowMeta.original.id);
          }}
        >
          <i className="fa fa-key" />
        </a>
      </OverlayTrigger>

      <Confirm
        onConfirm={() => {
          onDelete(rowMeta.row.id);
        }}
        body="Are you sure you want to delete?"
        confirmText="Confirm Delete"
        title="Delete User"
      >
        <a>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={"delete" + rowMeta.original.id}>Delete</Tooltip>
            }
          >
            <i className="fa fa-trash-o" />
          </OverlayTrigger>
        </a>
      </Confirm>
    </div>
  );
};

export default class ListUser extends Component {
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
    UserService.getAllUser()
      .then(response => {
        let data = response.data;
        this.setState({ data: data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  onDelete(rowMeta) {
    UserService.deleteUser(rowMeta.original.id)
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

  render() {
    return (
      <div>
        <RightLayout title="Users" linkTo="/user/add" linkText="Add User">
          <div className="table-responsive">{this.renderTable()}</div>
          <UpdatePasswordModal
            showModal={this.state.showModal}
            toggleModal={() => {
              this.toggleModal();
            }}
            user={this.state.selectedRow}
          />
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
              Header: "Username",
              accessor: "username",
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
                    overlay={<Tooltip id={"filter"}>Search User</Tooltip>}
                  >
                    <i className="fa fa-filter" />
                  </OverlayTrigger>
                </span>
              ),
              sortable: false,
              id: "id",
              accessor: d => d.id,
              Cell: rowMeta => (
                <ActionControls
                  rowMeta={rowMeta}
                  onDelete={rowMeta => {
                    this.onDelete(rowMeta);
                  }}
                  onUpdatePassword={userId => {
                    this.setState({
                      showModal: true,
                      selectedRow: userId
                    });
                  }}
                />
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
