import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import { RightLayout } from "layout/right-layout";
import donorService from "services/donor-service";
export default class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSearch() {
    let hasData = false;
    Object.keys(this.state).forEach(key => {
      if (this.state[key] && this.state[key].length > 0) {
        hasData = true;
      }
    });
    //if (!hasData) {
    //toast.error("Enter Search Criteria");
    //return;
    //}
    this.props.onSearch(this.state);
  }

  render() {
    return (
      <RightLayout>
        <h4>Search</h4>
        <div className="ln_solid" />

        <form
          className="form-horizontal"
          onSubmit={e => {
            e.preventDefault();
            this.onSearch();
          }}
        >
          <div className="item form-group">
            <div className="col-md-1 col-sm-12 col-xs-12">
              <input
                placeholder="ID"
                className="form-control"
                onChange={e => {
                  this.setState({ id: e.target.value });
                }}
                type="text"
              />
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12">
              <input
                placeholder="Name"
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
                className="form-control "
                type="text"
              />
            </div>
            <div className="col-md-2 col-sm-12 col-xs-12">
              <input
                placeholder="Phone"
                onChange={e => {
                  this.setState({ phone: e.target.value });
                }}
                className="form-control "
                type="text"
              />
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12">
              <input
                onChange={e => {
                  this.setState({ street: e.target.value });
                }}
                placeholder="Street"
                className="form-control "
                type="text"
              />
            </div>

            <div className="col-md-2">
              <button id="send" type="submit" className="btn btn-success">
                Search
              </button>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Download</Tooltip>}
              >
                <button
                  type="submit"
                  className="btn btn-default"
                  onClick={() => {
                    window.open(
                      donorService.getAllDonorDownloadUrl(),
                      "_blank"
                    );
                  }}
                >
                  <i class="fa fa-download" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Upload</Tooltip>}
              >
                <button type="submit" className="btn btn-default">
                  <i class="fa fa-upload" />
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </form>
      </RightLayout>
    );
  }
}
