import React from "react";
import { FormGroup } from "components/form-group";

export const LoginDetails = props => {
  const { values, touched, errors, handleChange, handleBlur } = props;

  return (
    <div>
      <h4>Login Details</h4>
      <div className="ln_solid" />
      <FormGroup
        label="Username"
        required={true}
        error={errors.username}
        touched={touched.username}
      >
        <input
          id="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="Password"
        required={true}
        error={errors.password}
        touched={touched.password}
      >
        <input
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
    </div>
  );
};
