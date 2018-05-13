import React, { Component } from "react";
import { RightLayout } from "layout/right-layout";
import { toast } from "react-toastify";
import UserService from "services/user-service";
import { AddressDetails } from "components/user/address-details";
import { PersonalDetails } from "components/user/personal-details";
import { RoleDetails } from "components/user/role-details";
import { LoginDetails } from "components/user/login-details";
import { withFormik } from "formik";
import Yup from "yup";

const AddUserForm = props => {
  let { dirty, isSubmitting, handleSubmit, setFieldTouched } = props;

  let beforeSubmit = e => {
    handleSubmit(e);
    Object.keys(props.errors).forEach(field => {
      setFieldTouched(field, true);
    });
  };

  dirty = props.isEdit ? true : dirty;
  return (
    <form className="form-horizontal form-label-left" onSubmit={beforeSubmit}>
      {!props.isEdit ? <LoginDetails {...props} /> : null}
      <PersonalDetails {...props} />
      <AddressDetails {...props} />
      <RoleDetails {...props} />
      {/* <div className="ln_solid" />
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
      </FormGroup> */}
      <div className="ln_solid" />
      <div className="form-group">
        <div className="col-md-6 col-md-offset-3">
          <button
            id="send"
            type="submit"
            className="btn btn-success"
            disabled={!dirty || isSubmitting}
          >
            Save
          </button>
          <button
            id="send"
            type="reset"
            className="btn btn-default"
            onClick={() => {
              props.onCancel();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

const defaultData = {
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India"
};

const AddUserFormik = withFormik({
  mapPropsToValues: props =>
    props.isEdit ? props.user : Object.assign(defaultData, { ...props.user }),
  validationSchema: props =>
    Yup.object().shape({
      username: Yup.string().when("firstname", (isBig, schema) => {
        return props.isEdit
          ? schema.notRequired()
          : schema.required("Username is required!");
      }),
      password: Yup.string().when("firstname", (isBig, schema) => {
        return props.isEdit
          ? schema.notRequired()
          : schema.required("Password is required!");
      }),

      firstname: Yup.string().required("Firstname is required!"),
      phone: Yup.string().required("Phone is required!"),
      doorno: Yup.string().required("Door no is required!"),
      street: Yup.string().required("Street is required!"),
      city: Yup.string().required("City is required!"),
      state: Yup.string().required("State is required!"),
      country: Yup.string().required("Country is required!"),
      status: Yup.string()
    }),
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    if (props.props.isEdit) {
      UserService.updateUser(values.id, values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success("User Updated");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    } else {
      UserService.addUser(values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success("User Added");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    }
  },
  handleReset: (values, props) => {},
  displayName: "AddUserForm"
})(AddUserForm);

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false };
  }
  componentWillMount() {
    if (this.props.match.params.userId) {
      this.fetchUser(this.props.match.params.userId);
    }
  }

  fetchUser(id) {
    this.setState({ isLoading: true });
    UserService.getUser(id)
      .then(response => {
        this.setState({ user: response.data, isLoading: false, isEdit: true });
      })
      .catch(err => {
        console.log("Error fetching user", err);
        this.setState({ isLoading: false });
      });
  }

  redirectToUser() {
    this.props.history.push("/user");
  }
  render() {
    return (
      <div>
        <RightLayout title="Add User" linkTo="/user" linkText="Manage User">
          {this.state.isLoading ? (
            "Loading user details"
          ) : (
            <AddUserFormik
              user={this.state.user}
              isEdit={this.state.isEdit}
              onSuccess={() => {
                this.redirectToUser();
              }}
              onCancel={() => {
                this.redirectToUser();
              }}
            />
          )}
        </RightLayout>
      </div>
    );
  }
}
