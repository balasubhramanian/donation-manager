import React, { Component } from "react";
import $ from "jquery";

export default class Sidebar extends Component {
  bindMenuHandlers() {
    var $SIDEBAR_MENU = $("#sidebar-menu");

    $SIDEBAR_MENU.find("a").on("click", function(ev) {
      var $li = $(this).parent();

      if ($li.is(".active")) {
        $li.removeClass("active active-sm");
        $("ul:first", $li).slideUp(function() {
          //setContentHeight();
        });
      } else {
        // prevent closing menu if we are on child menu
        if (!$li.parent().is(".child_menu")) {
          $SIDEBAR_MENU.find("li").removeClass("active active-sm");
          $SIDEBAR_MENU.find("li ul").slideUp();
        }

        $li.addClass("active");

        $("ul:first", $li).slideDown(function() {
          //setContentHeight();
        });
      }
    });
  }
  componentDidMount() {
    this.bindMenuHandlers();
  }
  render() {
    return (
      <div className="col-md-3 left_col">
        <div className="left_col scroll-view">
          <div className="navbar nav_title" style={{ border: 0 }}>
            <a className="site_title">
              <span>Donation Manager</span>
            </a>
          </div>

          <div className="clearfix" />

          <div
            id="sidebar-menu"
            className="main_menu_side hidden-print main_menu"
          >
            <div className="menu_section">
              <ul className="nav side-menu">
                <li>
                  <a>
                    <i className="fa fa-home" /> Fundraising{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="index.html">All Fundraising</a>
                    </li>
                    <li>
                      <a href="index2.html">Add New </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-edit" /> Donors{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="form.html">All Donors</a>
                    </li>
                    <li>
                      <a href="form_advanced.html">Add New</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-desktop" />Settings{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="user.html">User</a>
                    </li>
                    <li>
                      <a href="roles.html">Roles & Permission</a>
                    </li>
                    <li>
                      <a href="media_gallery.html">Config</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
