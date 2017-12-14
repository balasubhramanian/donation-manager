import React, { Component } from "react";
import { connect } from "react-redux";

class ListDonor extends Component {
  render() {
    return <h1>List Donor</h1>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListDonor);
