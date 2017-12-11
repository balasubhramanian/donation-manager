import React, { Component } from "react";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";
import Footer from "./footer";
import "./theme.css";
import "./main.css";
import $ from "jquery";

export default class LeftNavLayout extends Component {
  setContentHeight() {
    var $BODY = $("#root-container"),
      $SIDEBAR_FOOTER = $(".sidebar-footer"),
      $LEFT_COL = $(".left_col"),
      $RIGHT_COL = $(".right_col"),
      $NAV_MENU = $(".nav_menu"),
      $FOOTER = $("footer");

    $RIGHT_COL.css("min-height", $(window).height());

    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass("footer_fixed") ? -10 : $FOOTER.height(),
      leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css("min-height", contentHeight);
  }

  componentDidMount() {
    this.setContentHeight();
  }

  render() {
    return (
      <div id="root-container" className="nav-md">
        <div className="container body">
          <div className="main_container">
            <Sidebar />
            <TopNav />
            <div className="right_col" role="main">
              {this.props.children}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
