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
import CampaignService from "services/campaign-service";
import { Link } from "react-router-dom";
import { RightLayout } from "layout/right-layout";
import DateUtils from "common/date-utils";
import campaignService from "services/campaign-service";
export default class Campaign extends Component {
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
  }
  componentWillMount() {
    this.fetchData();
  }

  fetchData(param) {
    this.setState({ isLoading: true });
    CampaignService.getAllCampaign()
      .then(response => {
        let data = response.data;
        this.setState({ data: data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  onDelete(rowMeta) {
    CampaignService.deleteCampaign(rowMeta.original.id)
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
  renderSearch() {
    return (
      <div>
        <RightLayout
          title="Campaigns"
          linkTo="/campaign/add"
          linkText="Add Campaign"
        />
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

  render() {
    if (!this.state.data) {
      return null;
    }
    const { data, isLoading, showFilter } = this.state;
    return (
      <RightLayout
        title="Campaigns"
        linkText="Add Campaign"
        linkTo="/campaign/add"
      >
        <div class="row">
          <div class="pull-right">
            <button
              type="submit"
              className="btn btn-default"
              onClick={() => {
                window.open(
                  campaignService.getAllCampaignDownloadUrl(),
                  "_blank"
                );
              }}
            >
              <i class="fa fa-download" />
            </button>
          </div>
        </div>
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
                Header: "Name",
                accessor: "name",
                filterable: showFilter
              },
              // {
              //Header: "Description",
              //accessor: "description",
              //filterable: showFilter
              //},
              {
                Header: "Type",
                accessor: "type",
                filterable: showFilter
              },
              {
                Header: "Start Date",
                accessor: "startDate",
                filterable: showFilter,
                Cell: rowMeta => DateUtils.toAppDate(rowMeta.row.startDate)
              },

              {
                Header: "End Date",
                accessor: "endDate",
                filterable: showFilter,
                Cell: rowMeta => DateUtils.toAppDate(rowMeta.row.endDate)
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
                      <Link to={"/campaign/" + rowMeta.original.id + "/edit"}>
                        <i className="fa fa-edit" />
                      </Link>
                    </OverlayTrigger>

                    {/* <OverlayTrigger
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
                        title="Delete Campaign"
                      >
                        <a>
                          <i className="fa fa-trash-o" />
                        </a>
                      </Confirm>
                    </OverlayTrigger> */}
                  </div>
                )
              }
            ]}
            className="-striped -highlight"
          />
        </div>
      </RightLayout>
    );
  }
}
