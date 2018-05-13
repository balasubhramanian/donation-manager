import React, { Component } from "react";
import { RightLayout } from "layout/right-layout";
import { toast } from "react-toastify";
import DonorService from "services/donor-service";
import { AddressDetails } from "components/user/address-details";
import { PersonalDetails } from "components/user/personal-details";
import { withFormik } from "formik";
import Yup from "yup";

const AddDonorForm = props => {
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
      <PersonalDetails {...props} />
      <AddressDetails {...props} />
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
export const AddDonorFormik = withFormik({
  mapPropsToValues: props =>
    props.isEdit ? props.donor : Object.assign(defaultData, { ...props.donor }),
  validationSchema: props =>
    Yup.object().shape({
      firstname: Yup.string().required("Firstname is required!"),
      phone: Yup.string().required("Phone is required!"),
      doorno: Yup.string().required("Door no is required!"),
      street: Yup.string().required("Street is required!"),
      city: Yup.string().required("City is required!"),
      state: Yup.string().required("State is required!"),
      country: Yup.string().required("Country is required!")
    }),
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    if (props.props.isEdit) {
      DonorService.updateDonor(values.id, values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success("Donor Updated");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    } else {
      DonorService.addDonor(values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success("Donor Added");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    }
  },
  handleReset: (values, props) => {},
  displayName: "AddDonorForm"
})(AddDonorForm);

export default class AddDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      donor: {
        area: "",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India"
      }
    };
  }
  componentWillMount() {
    if (this.props.match.params.donorId) {
      this.fetchDonor(this.props.match.params.donorId);
    }
  }

  fetchDonor(id) {
    this.setState({ isLoading: true });
    DonorService.getDonor(id)
      .then(response => {
        this.setState({ donor: response.data, isLoading: false, isEdit: true });
      })
      .catch(err => {
        console.log("Error fetching donor", err);
        this.setState({ isLoading: false });
      });
  }

  redirectToDonor() {
    this.props.history.push("/donor");
  }
  render() {
    return (
      <div>
        <RightLayout title="Add Donor" linkTo="/donor" linkText="Manage Donor">
          {this.state.isLoading ? (
            "Loading Donor details"
          ) : (
            <AddDonorFormik
              donor={this.state.donor}
              isEdit={this.state.isEdit}
              onSuccess={() => {
                this.redirectToDonor();
              }}
              onCancel={() => {
                this.redirectToDonor();
              }}
            />
          )}
        </RightLayout>
      </div>
    );
  }
}
