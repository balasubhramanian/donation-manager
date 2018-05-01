import React, { Component } from "react";
import { toast } from "react-toastify";
import { withFormik } from "formik";
import Yup from "yup";
import { FormGroup } from "components/form-group";
import DatePicker from "components/date-picker";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import CampaignService from "services/campaign-service";
import AccountService from "services/account-service";
import DonorService from "services/donor-service";
import DonationService from "services/donation-service";

const DonationCollectionForm = props => {
  let {
    dirty,
    isSubmitting,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    campaigns,
    accounts
  } = props;

  let beforeSubmit = e => {
    handleSubmit(e);
    Object.keys(props.errors).forEach(field => {
      setFieldTouched(field, true);
    });
  };

  if (props.donor) {
    values.donorId = props.donor.id;
  }

  dirty = props.isEdit ? true : dirty;
  return (
    <form className="form-horizontal form-label-left" onSubmit={beforeSubmit}>
      <FormGroup
        label="Donor"
        required={true}
        inputClassName="col-md-5 col-sm-5"
        error={errors.donorId}
        touched={touched.donorId}
      >
        {props.donor ? (
          <div style={{ height: "34px", padding: "6px 12px" }}>
            {props.donor.firstname}
          </div>
        ) : (
          <Select.Async
            name="form-field-name"
            loadOptions={props.fetchDonor}
            value={values.donorId}
            onChange={value => {
              setFieldValue("donorId", value);
            }}
            multi={false}
            valueKey="id"
            labelKey="firstname"
          />
        )}
      </FormGroup>
      <FormGroup
        label="Campaign"
        required={true}
        inputClassName="col-md-5 col-sm-5"
        error={errors.campaignId}
        touched={touched.campaignId}
      >
        <Select
          name="form-field-name"
          value={values.campaignId}
          onChange={selectedOption => {
            setFieldValue("campaignId", selectedOption.value);
          }}
          multi={false}
          options={campaigns}
        />
      </FormGroup>

      <FormGroup
        label="Date"
        required={true}
        error={errors.date}
        touched={touched.date}
        inputClassName="col-md-5 col-sm-5"
      >
        <DatePicker
          id="date"
          value={values.date}
          onChange={date => {
            setFieldValue("date", date);
          }}
          onBlur={date => {
            setFieldValue("date", date);
          }}
        />
      </FormGroup>

      <FormGroup
        label="Amount"
        required={true}
        inputClassName="col-md-5 col-sm-5"
        error={errors.amount}
        touched={touched.amount}
      >
        <input
          id="amount"
          value={values.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="number"
        />
      </FormGroup>

      <FormGroup
        label="Account"
        required={true}
        inputClassName="col-md-5 col-sm-5"
        error={errors.accountId}
        touched={touched.accountId}
      >
        <Select
          name="form-field-name"
          value={values.accountId}
          onChange={selectedOption => {
            setFieldValue("accountId", selectedOption.value);
          }}
          multi={false}
          options={accounts}
        />
      </FormGroup>
      <div className="ln_solid" />
      <div className="form-group">
        <div className="col-md-9 col-md-offset-3">
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
            type="submit"
            className="btn btn-success"
            onClick={() => {
              props.onSaveAdd(true);
            }}
            disabled={!dirty || isSubmitting}
          >
            Save & Add New
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

const DonationCollectionFormik = withFormik({
  mapPropsToValues: props => ({}),
  validationSchema: props =>
    Yup.object().shape({
      date: Yup.mixed().required("Date is required"),
      donorId: Yup.mixed().required("Donor is required"),
      campaignId: Yup.mixed().required("Campaign is required"),
      amount: Yup.number()
        .required("Amount is required")
        .positive("Amount should positive")
    }),
  onSaveAdd: () => {
    console.log("onsave& add");
  },
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    let newValues = Object.assign({}, values);
    if (typeof newValues.donorId === "object") {
      newValues.donorId = newValues.donorId.id;
    }
    DonationService.saveDonation(newValues)
      .then(res => {
        console.log(res);
        setSubmitting(false);
        toast.success("Donation Added");
        props.resetForm();
        props.setValues({});
        props.props.onSuccess();
      })
      .catch(res => {
        console.log(res);
        setSubmitting(false);
      });
  },
  handleReset: (values, props) => {},
  displayName: "DonationCollectionForm"
})(DonationCollectionForm);

export default class DonationCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      addNew: false,
      key: 1,
      donor: this.props.donor
    };
  }
  componentWillMount() {
    Promise.all([this.fetchAllAccount(), this.fetchAllCampaign()])
      .then(values => {
        this.setState({
          accounts: values[0].data.map(a => ({ label: a.name, value: a.id })),
          campaigns: values[1].data.map(c => ({ label: c.name, value: c.id }))
        });
        console.log("collect donation ", values);
      })
      .catch(err => {
        console.log("error get data", err, arguments);
      });
  }
  componentWillReceiveProps(newProps) {
    this.setState({ donor: newProps.donor });
  }

  fetchAllCampaign() {
    return CampaignService.getActiveCampaign();
  }

  fetchDonor(data) {
    if (!data) {
      return Promise.resolve({ options: [] });
    }

    return DonorService.getAllDonor({ name: data }).then(res => {
      return { options: res.data };
    });
  }

  fetchAllAccount() {
    return AccountService.getAllAccount();
  }

  renderForm() {
    return (
      <div>
        <DonationCollectionFormik
          key={this.state.key}
          type={this.props.type}
          campaigns={this.state.campaigns}
          accounts={this.state.accounts}
          donor={this.state.donor}
          fetchDonor={this.fetchDonor}
          onSuccess={() => {
            if (!this.state.addNew) {
              this.props.onSuccess();
            } else {
              this.setState({ addNew: false, key: new Date().getTime() });
            }
          }}
          onCancel={() => {
            this.props.onCancel();
          }}
          onSaveAdd={value => {
            this.setState({ addNew: value });
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={() => {
          this.props.onCancel();
        }}
      >
        <Modal.Header>
          <h4>Add Donation</h4>
        </Modal.Header>
        <Modal.Body>{this.renderForm()}</Modal.Body>
      </Modal>
    );
  }
}
