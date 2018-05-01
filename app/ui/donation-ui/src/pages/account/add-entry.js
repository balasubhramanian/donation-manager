import React, { Component } from "react";
import { toast } from "react-toastify";
import AccountService from "services/account-service";
import { withFormik } from "formik";
import Yup from "yup";
import { FormGroup } from "components/form-group";
import { Modal } from "react-bootstrap";

const AddTransactionForm = props => {
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
    types,
    accounts
  } = props;
  console.log(types);

  let beforeSubmit = e => {
    handleSubmit(e);
    Object.keys(props.errors).forEach(field => {
      setFieldTouched(field, true);
    });
  };

  let selectedOption;
  console.log(selectedOption);
  dirty = props.isEdit ? true : dirty;
  return (
    <form className="form-horizontal form-label-left" onSubmit={beforeSubmit}>
      <FormGroup
        label="Name"
        required={true}
        inputClassName="col-md-5 col-sm-5"
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
        label="Account Number"
        required={false}
        inputClassName="col-md-5 col-sm-5"
        error={errors.accountNo}
        touched={touched.accountNo}
      >
        <input
          id="accountNo"
          value={values.accountNo}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>
      <FormGroup
        label="Description"
        required={false}
        inputClassName="col-md-5 col-sm-5"
        error={errors.description}
        touched={touched.description}
      >
        <input
          id="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control col-md-7 col-xs-12"
          type="text"
        />
      </FormGroup>

      <FormGroup
        label="Status"
        required={true}
        inputClassName="col-md-5 col-sm-5"
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

const AddTransactionFormik = withFormik({
  mapPropsToValues: props => ({}),
  validationSchema: props =>
    Yup.object().shape({
      name: Yup.mixed().required("Name is required")
    }),
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    // if (props.props.isEdit) {
    //   TransactionService.saveTransaction(values.id, values)
    //     .then(res => {
    //       console.log(res);
    //       setSubmitting(false);
    //       toast.success(this.props.type.title + " Updated");
    //       props.props.onSuccess();
    //     })
    //     .catch(res => {
    //       console.log(res);
    //       setSubmitting(false);
    //     });
    // } else {
    AccountService.saveAccount(values)
      .then(res => {
        console.log(res);
        setSubmitting(false);
        toast.success("Account created");
        props.resetForm();
        props.setValues({});
        props.props.onSuccess();
      })
      .catch(res => {
        console.log(res);
        setSubmitting(false);
      });
    //}
  },
  handleReset: (values, props) => {},
  displayName: "AddUserForm"
})(AddTransactionForm);

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false, addNew: false, key: 1 };
  }
  componentWillMount() {
    this.setState({});
  }

  renderForm() {
    return (
      <div>
        <AddTransactionFormik
          key={this.state.key}
          type={this.props.type}
          types={this.props.types}
          accounts={this.props.accounts}
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
        <Modal.Header closeButton>
          <h4>Add Account</h4>
        </Modal.Header>
        <Modal.Body>{this.renderForm()}</Modal.Body>
      </Modal>
    );
  }
}
