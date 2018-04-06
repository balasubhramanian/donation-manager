import React, { Component } from "react";
import { Collapse } from "react-bootstrap";

export default class CollapsablePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen ? true : false
    };
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState({ isOpen: nextProps.isOpen });
  }

  render() {
    let lineStyle = this.state.isOpen
      ? {
          borderBottom: "1px solid #e5e5e5",
          marginBottom: "10px"
        }
      : {};
    lineStyle = { ...lineStyle, cursor: "pointer" };

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="x_panel" style={{ paddingLeft: "15px" }}>
            <div
              className="x_title"
              style={lineStyle}
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen });
              }}
            >
              <h2 style={{ marginTop: "5px" }} className="collapse-link">
                {this.props.title}
              </h2>
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a className="collapse-link">
                    <i className="fa fa-chevron-down" />
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            <Collapse in={this.state.isOpen}>
              <div className="x_content">{this.props.children}</div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
