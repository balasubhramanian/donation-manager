import React from "react";
import { FormGroup } from "components/form-group";

export const AddressDetails = props => {
  const { values, touched, errors, handleChange, handleBlur } = props;
  return (
    <div>
      <h4>Address</h4>
      <div className="ln_solid" />
      <FormGroup
        label="Door No"
        required={true}
        error={errors.doorno}
        touched={touched.doorno}
      >
        <input
          id="doorno"
          value={values.doorno}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="Street"
        required={true}
        error={errors.street}
        touched={touched.street}
      >
        <input
          id="street"
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup label="Area" error={errors.area} touched={touched.area}>
        <input
          id="area"
          value={values.area}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="City"
        required={true}
        error={errors.city}
        touched={touched.city}
      >
        <input
          id="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="State"
        required={true}
        error={errors.state}
        touched={touched.state}
      >
        <input
          id="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="Country"
        required={true}
        error={errors.country}
        touched={touched.country}
      >
        <input
          id="country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
    </div>
  );
};
