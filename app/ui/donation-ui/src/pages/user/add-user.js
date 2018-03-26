import React, { Component } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import ReactTable from "react-table";
import { FormGroup } from "components/form-group";
import { toast } from "react-toastify";
import UserService from "services/user-service";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import Yup from "yup";

const AddUserForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <form className="form-horizontal form-label-left" onSubmit={handleSubmit}>
      {/* {JSON.stringify(props, null, 2)} */}
      <h4>Login Detailss</h4>
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
      </FormGroup>{" "}
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
      <h4>Roles</h4>
      <div className="ln_solid" />
      <div>
        <span className="badge">
          Admin <small>x</small>
        </span>
        <span className="badge">Fund Collector</span>
      </div>
      <FormGroup label="Roles" required={true} touched={touched.roles}>
        <select
          id="role"
          className="form-control col-md-7 col-xs-12"
          type="text"
        >
          <option>Admin</option>
          <option>Fund Collector</option>
        </select>
      </FormGroup>
      <div className="ln_solid" />
      <FormGroup
        label="Status"
        required={true}
        error={errors.status}
        touched={touched.status}
      >
        <select
          id="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        >
          <option>Active</option>
          <option>Disabled</option>
        </select>
      </FormGroup>
      <div className="ln_solid" />
      <div className="form-group">
        <div className="col-md-6 col-md-offset-3">
          <button
            id="send"
            type="submit"
            className="btn btn-success"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button
            id="send"
            type="reset"
            className="btn btn-default"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

const AddUserFormik = withFormik({
  mapPropsToValues: () => ({}),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
    firstname: Yup.string().required("Firstname is required!"),
    lastname: Yup.string(),
    phone: Yup.string().required("Phone is required!"),
    email: Yup.string(),
    doorno: Yup.string().required("Door no is required!"),
    street: Yup.string().required("Street is required!"),
    area: Yup.string(),
    city: Yup.string().required("City is required!"),
    state: Yup.string().required("State is required!"),
    country: Yup.string().required("State is required!"),
    status: Yup.string()
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(true);
    UserService.addUser(values)
      .then(res => {
        console.log(res);
        setSubmitting(false);
      })
      .catch(res => {
        console.log(res);
        setSubmitting(false);
      });
  },
  displayName: "AddUserForm"
})(AddUserForm);

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      doorno: "",
      street: "",
      area: "",
      city: "",
      state: "",
      country: "",
      roles: [],
      status: ""
    };
    //this.fetchData();
  }

  fetchData() {
    UserService.getAllUser()
      .then(response => {
        this.setState({ data: response.data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    const Layout = props => {
      return (
        <div>
          <div className="page-title">
            <div className="title_left">
              <h3>{props.title}</h3>
            </div>

            <div className="title_right">
              <Link to="/user" className="btn btn-info pull-right">
                Manage
              </Link>
            </div>
          </div>
          <div className="clearfix" />
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="x_panel">
                <div className="x_content">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <Layout title="Add User">
          <AddUserFormik />
        </Layout>
      </div>
    );
  }
}
