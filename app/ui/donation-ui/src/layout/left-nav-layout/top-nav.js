import React, { Component } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { NavDropdown, MenuItem } from "react-bootstrap";

class TopNav extends Component {
  componentDidMount() {
    var $BODY = $("#root-container"),
      $SIDEBAR_MENU = $("#sidebar-menu"),
      $MENU_TOGGLE = $("#menu_toggle");

    $MENU_TOGGLE.on("click", function() {
      if ($BODY.hasClass("nav-md")) {
        $SIDEBAR_MENU.find("li.active ul").hide();
        $SIDEBAR_MENU
          .find("li.active")
          .addClass("active-sm")
          .removeClass("active");
      } else {
        $SIDEBAR_MENU.find("li.active-sm ul").show();
        $SIDEBAR_MENU
          .find("li.active-sm")
          .addClass("active")
          .removeClass("active-sm");
      }

      $BODY.toggleClass("nav-md nav-sm");
    });
  }
  render() {
    return (
      <div className="top_nav">
        <div className="nav_menu">
          <nav>
            <div className="nav toggle">
              <a id="menu_toggle">
                <i className="fa fa-bars" />
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <NavDropdown id="user-dp" eventKey={3} title={this.props.user} className="">
                <MenuItem
                  eventKey={3.1}
                  onClick={() => {
                    this.props.logout();
                  }}
                >
                  Logout
                </MenuItem>
              </NavDropdown>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state.auth };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: "LOGOUT" })
});
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
