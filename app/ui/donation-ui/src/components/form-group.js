import React from "react";

export const FormGroup = props => {
  return (
    <div>
      <div className="item form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12">
          {props.label}
          {props.required ? <span className="required"> *</span> : ""}
        </label>
        <div
          className={
            "col-md-6 col-sm-6 col-xs-12 " +
            (props.inputClassName ? props.inputClassName : "")
          }
        >
          {props.children}
        </div>
        {props.touched && props.error ? (
          <div className="alert" style={{ opacity: 1 }}>
            {props.error}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
