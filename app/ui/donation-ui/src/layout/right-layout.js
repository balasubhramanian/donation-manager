import React from "react";
import { Link } from "react-router-dom";

export const RightLayout = props => {
  return (
    <div>
      {props.title ? (
        <div className="page-title">
          <div className="title_left">
            <h3>{props.title}</h3>
          </div>
          {props.onClick ? (
            <div className="title_right">
              <a
                onClick={() => {
                  props.onClick();
                }}
                className="btn btn-info pull-right"
              >
                {props.linkText}
              </a>
            </div>
          ) : null}
          {props.linkTo ? (
            <div className="title_right">
              <Link to={props.linkTo} className="btn btn-info pull-right">
                {props.linkText}
              </Link>
            </div>
          ) : null}
          <div className="clearfix" />
        </div>
      ) : null}

      {props.children ? (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
              {props.panelTitle ? (
                <div className="x_title">
                  <h2>{props.panelTitle}</h2>
                  <div className="clearfix" />
                </div>
              ) : null}
              <div className="x_content">{props.children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
