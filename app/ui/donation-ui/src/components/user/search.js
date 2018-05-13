import React, { Component } from "react";
import { toast } from "react-toastify";
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
      <form
        className="form-horizontal form-label-left"
        onSubmit={e => {
          e.preventDefault();
          this.onSearch();
        }}
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
              onChange={e => {
                this.setState({ id: e.target.value });
              }}
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
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
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
              onChange={e => {
                this.setState({ phone: e.target.value });
              }}
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
              onChange={e => {
                this.setState({ street: e.target.value });
              }}
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
              Search
            </button>
          </div>
        </div>
      </form>
    );
  }
}
