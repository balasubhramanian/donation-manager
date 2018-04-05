import React from "react";
import { FormGroup } from "components/form-group";

export const PersonalDetails = props => {
  const { values, touched, errors, handleChange, handleBlur } = props;

  return (
    <div>
      <h4>Personal Details</h4>
      <div className="ln_solid" />
      <FormGroup
        label="Firstname"
        required={true}
        error={errors.firstname}
        touched={touched.firstname}
      >
        <input
          id="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="Lastname"
        error={errors.lastname}
        touched={touched.lastname}
      >
        <input
          id="lastname"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="Phone"
        required={true}
        error={errors.phone}
        touched={touched.phone}
      >
        <input
          id="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup label="Email" error={errors.email} touched={touched.email}>
        <input
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
    </div>
  );
};
