import React, { Component } from "react";
import { connect } from "react-redux";

class ListFudraising extends Component {
  render() {
    return <h1>List Fundraising</h1>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListFudraising);
