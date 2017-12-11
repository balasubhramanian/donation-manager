import React, { Component } from "react";
import $ from "jquery";
export default class TopNav extends Component {
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
              <li className="">
                <a
                  href="javascript:;"
                  className="user-profile dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Abdullah
                  <span className=" fa fa-angle-down" />
                </a>
                <ul className="dropdown-menu dropdown-usermenu pull-right">
                  <li>
                    <a href="javascript:;"> Profile</a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <span className="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">Help</a>
                  </li>
                  <li>
                    <a href="login.html">
                      <i className="fa fa-sign-out pull-right" /> Log Out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
