import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactTable from "react-table";
import Confirm from "components/confirm";
import DonorService from "services/donor-service";
import ConfigService from "services/config-service";
import { Link } from "react-router-dom";
import { RightLayout } from "layout/right-layout";
import { AppConfig } from "constant";
import AddConfigModal from "pages/config/add-config-modal";
export default class ListConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      showModal: false,
      pages: 1,
      showConfirm: false,
      idToDelete: null,
      showFilter: false
    };
    this.supportedModules = [
      {
        name: "Campaign Types",
        value: "campaign_type"
      },
      {
        name: "Income Types",
        value: "income_type",
        nameLabel: "Type"
      },

      {
        name: "Expenses Types",
        value: "expense_type",
        nameLabel: "Type"
      },
      {
        name: "SMS Notes",
        value: "sms_notes",
        nameLabel: "Notes",
        type: "text"
      }
    ];
    this.modules = {};
    this.supportedModules.forEach(module => {
      this.modules[module.value] = module;
    });
    if (this.props.match.params.module) {
      this.state.module = this.props.match.params.module;
      this.state.moduleConfig = this.modules[this.state.module];
    }
    this.fetchData({});
  }

  componentWillReceiveProps(newProps) {
    const newModule = newProps.match.params.module;
    this.setState(
      { module: newModule, moduleConfig: this.modules[newModule] },
      this.fetchData
    );
  }

  toggleModal(row) {
    this.setState({ showModal: !this.state.showModal, selectedRow: row });
  }

  fetchData(param) {
    this.setState({ isLoading: true });
    ConfigService.getConfigByModule(this.state.module)
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
    if (!this.state.data) {
      return null;
    }
    //console.log(this.modules);
    const { data, isLoading, showFilter, moduleConfig } = this.state;
    return (
      <RightLayout
        title={"Manage " + this.state.moduleConfig.name}
        linkText="Add"
        onClick={() => {
          this.toggleModal();
        }}
      >
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
                Header: moduleConfig.nameLabel
                  ? moduleConfig.nameLabel
                  : "Name",
                accessor: "name",
                filterable: showFilter,
                className: "table-cell-wrap"
              },
              {
                Header: "Status",
                accessor: "status",
                filterable: showFilter,
                Cell: rowMeta =>
                  rowMeta.row.status === "A" ? "Active" : "Disabled"
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
                  <div className="row-action">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={"edit" + rowMeta.original.id}>
                          Edit
                        </Tooltip>
                      }
                    >
                      <a
                        onClick={() => {
                          this.setState({
                            showModal: true,
                            selectedRow: rowMeta.original
                          });
                        }}
                      >
                        <i className="fa fa-edit" />
                      </a>
                    </OverlayTrigger>
                  </div>
                )
              }
            ]}
            className="-striped -highlight"
          />
        </div>
        <AddConfigModal
          showModal={this.state.showModal}
          module={this.state.module}
          moduleName={this.state.moduleConfig.name}
          nameLabel={this.state.moduleConfig.nameLabel}
          type={this.state.moduleConfig.type}
          toggleModal={() => {
            this.toggleModal();
          }}
          config={this.state.selectedRow}
          onSuccess={() => {
            this.fetchData();
            this.toggleModal();
          }}
        />
      </RightLayout>
    );
  }
}
