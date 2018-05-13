import React, { Component } from "react";
import { RightLayout } from "layout/right-layout";
import { toast } from "react-toastify";
import CampaignService from "services/campaign-service";
import ConfigService from "services/config-service";
import { withFormik } from "formik";
import Yup from "yup";
import { FormGroup } from "components/form-group";
import DatePicker from "components/date-picker";

const AddCampaignForm = props => {
  let {
    dirty,
    isSubmitting,
    handleSubmit,
    setFieldTouched,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue
  } = props;

  let beforeSubmit = e => {
    console.log(values, errors);
    handleSubmit(e);
    Object.keys(props.errors).forEach(field => {
      setFieldTouched(field, true);
    });
  };

  dirty = props.isEdit ? true : dirty;
  return (
    <form className="form-horizontal form-label-left" onSubmit={beforeSubmit}>
      <div>
        <FormGroup
          label="Name"
          required={true}
          error={errors.name}
          touched={touched.name}
        >
          <input
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control col-md-7 col-xs-12"
            type="text"
          />
        </FormGroup>

        <FormGroup
          label="Description"
          error={errors.description}
          touched={touched.description}
        >
          <textarea
            id="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control col-md-7 col-xs-12"
            type="text"
          />
        </FormGroup>

        <FormGroup
          label="Type"
          required={true}
          error={errors.typeId}
          touched={touched.typeId}
        >
          <select
            id="typeId"
            value={values.typeId}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control col-md-7 col-xs-12"
          >
            <option selected disabled>
              Select
            </option>
            {props.campaignTypes.map(c => {
              return <option value={c.id}> {c.name} </option>;
            })}
          </select>
        </FormGroup>

        <FormGroup
          label="Start Date"
          error={errors.startDate}
          touched={touched.startDate}
        >
          <DatePicker
            id="startDate"
            selectsStart={true}
            startDate={values.startDate}
            endDate={values.endDate}
            value={values.startDate}
            onChange={date => {
              setFieldValue("startDate", date);
              console.log("startdate", values);
            }}
            onBlur={date => {
              setFieldValue("startDate", date);
            }}
          />
        </FormGroup>

        <FormGroup
          label="End Date"
          error={errors.endDate}
          touched={touched.endDate}
        >
          <DatePicker
            id="endDate"
            selectsEnd={true}
            startDate={values.startDate}
            endDate={values.endDate}
            value={values.endDate}
            onChange={date => {
              setFieldValue("endDate", date);
              console.log("enddate", values);
            }}
            onBlur={date => {
              setFieldValue("endDate", date);
            }}
          />
        </FormGroup>

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
            <option selected disabled>
              Select
            </option>
            <option value="A">Active</option>
            <option value="D">Disabled</option>
          </select>
        </FormGroup>
      </div>
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

const AddCampaignFormik = withFormik({
  mapPropsToValues: props => ({ ...props.campaign }),
  validationSchema: props =>
    Yup.object().shape({
      name: Yup.string().required("Name is required!"),
      typeId: Yup.number().required("Type is required!"),
      startDate: Yup.mixed().notRequired(),
      endDate: Yup.mixed().notRequired(),
      status: Yup.string().required("Status is required")
    }),
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    if (props.props.isEdit) {
      CampaignService.updateCampaign(values.id, values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success("Campaign Updated");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    } else {
      CampaignService.addCampaign(values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success("Campaign Added");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    }
  },
  handleReset: (values, props) => {},
  displayName: "AddCampaignForm"
})(AddCampaignForm);

export default class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false, campaignTypes: [] };
  }
  componentWillMount() {
    this.fetchCampaignTypes();
    if (this.props.match.params.campaignId) {
      this.fetchCampaign(this.props.match.params.campaignId);
    }
  }

  fetchCampaignTypes() {
    ConfigService.getConfigByModule("campaign_type")
      .then(response => {
        this.setState({
          campaignTypes: response.data
        });
      })
      .catch(err => {
        console.log("Error fetching campaign type", err);
        this.setState({ isLoading: false });
      });
  }

  fetchCampaign(id) {
    this.setState({ isLoading: true });
    CampaignService.getCampaign(id)
      .then(response => {
        this.setState({
          campaign: response.data,
          isLoading: false,
          isEdit: true
        });
      })
      .catch(err => {
        console.log("Error fetching campaign", err);
        this.setState({ isLoading: false });
      });
  }

  redirectToCampaign() {
    this.props.history.push("/campaign");
  }
  render() {
    return (
      <div>
        <RightLayout
          title="Add Campaign"
          linkTo="/campaign"
          linkText="Manage Campaign"
        >
          {this.state.isLoading ? (
            "Loading Campaign details"
          ) : (
            <AddCampaignFormik
              campaignTypes={this.state.campaignTypes}
              campaign={this.state.campaign}
              isEdit={this.state.isEdit}
              onSuccess={() => {
                this.redirectToCampaign();
              }}
              onCancel={() => {
                this.redirectToCampaign();
              }}
            />
          )}
        </RightLayout>
      </div>
    );
  }
}
