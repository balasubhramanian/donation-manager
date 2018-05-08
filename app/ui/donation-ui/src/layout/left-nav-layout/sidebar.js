import React, { Component } from "react";
import { Link } from "react-router-dom";

import $ from "jquery";

const Menus = [
  {
    title: "Donors",
    icon: "fa-male",
    path: "/donor"
  },
  {
    title: "Donation",
    path: "/donation"
  },
  {
    title: "Cash Flow",
    icon: "fa-user-o",
    children: [
      {
        title: "Income",
        path: "/cashflow/income"
      },
      {
        title: "Expense",
        path: "/cashflow/expense"
      }
    ]
  },
  {
    title: "Campaign",
    path: "/campaign"
  },

  {
    title: "Reports",
    icon: "fa-line-chart",
    children: [
      {
        title: "Income vs Expense",
        path: "/user"
      },
      {
        title: "Campaign Pledges",
        path: "/reports/campaign-pledges"
      },
      {
        title: "Ledger",
        path: "/reports/daily-ledger"
      },
      {
        title: "Actual vs Expected ",
        path: "/user"
      }
    ]
  },
  {
    title: "Settings",
    icon: "fa-gear",
    children: [
      {
        title: "Users",
        icon: "fa-user-o",
        path: "/user"
      },
      {
        title: "Campaign Types",
        path: "/config/campaign_type"
      },
      {
        title: "Income Types",
        path: "/config/income_type"
      },
      {
        title: "Expense Types",
        path: "/config/expense_type"
      },
      {
        title: "Accounts",
        path: "/account"
      }
    ]
  }
];
const SubMenu = props => {
  if (!props.items) {
    return <span />;
  }

  return (
    <ul className="nav child_menu">
      {props.items.map(item => {
        return (
          <li key={item.title}>
            {item.path ? (
              <Link to={item.path}>{item.title}</Link>
            ) : (
              <a>{item.title}</a>
            )}
          </li>
        );
      })}
    </ul>
  );
};
const Menu = props => {
  return (
    <ul className="nav side-menu">
      {props.items.map(item => {
        return (
          <li key={item.title}>
            {item.path ? (
              <Link to={item.path}>
                <i className={"fa " + item.icon} />
                {item.title}
              </Link>
            ) : (
              <a>
                <i className={"fa " + item.icon} /> {item.title}
                {item.children ? (
                  <span className="fa fa-chevron-down" />
                ) : (
                  <span />
                )}
              </a>
            )}

            <SubMenu key={item.title} items={item.children} />
          </li>
        );
      })}
    </ul>
  );
};

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
              <Menu items={Menus} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
