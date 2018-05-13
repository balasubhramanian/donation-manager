import React, { Component } from "react";
import { toast } from "react-toastify";
import TransactionService from "services/transaction-service";
import { withFormik } from "formik";
import Yup from "yup";
import { FormGroup } from "components/form-group";
import DatePicker from "components/date-picker";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import moment from "moment";

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
        label="Type"
        required={true}
        inputClassName="col-md-5 col-sm-5"
        error={errors.typeId}
        touched={touched.typeId}
      >
        <Select
          name="form-field-name"
          value={values.typeId}
          onChange={selectedOption => {
            setFieldValue(
              "typeId",
              selectedOption ? selectedOption.value : null
            );
          }}
          multi={false}
          options={types}
        />
      </FormGroup>

      <FormGroup
        label="Description"
        inputClassName="col-md-5 col-sm-5"
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
          type="text"
        />
      </FormGroup>

      <FormGroup
        label="Account"
        required={false}
        inputClassName="col-md-5 col-sm-5"
        error={errors.accountId}
        touched={touched.accountId}
      >
        <Select
          name="form-field-name"
          value={values.accountId}
          onChange={selectedOption => {
            setFieldValue(
              "accountId",
              selectedOption ? selectedOption.value : null
            );
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

const defalutData = { date: moment() };
const AddTransactionFormik = withFormik({
  mapPropsToValues: props => defalutData,
  validationSchema: props =>
    Yup.object().shape({
      date: Yup.mixed().required(),
      typeId: Yup.mixed().required(),
      amount: Yup.string().required()
    }),
  onSaveAdd: () => {
    console.log("onsave& add");
  },
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    values.transactionType = props.props.type.transactionType;
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
    TransactionService.saveTransaction(values)
      .then(res => {
        console.log(res);
        setSubmitting(false);
        toast.success(props.props.type.title + " Added");
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
          <h4>Add {this.props.type.title}</h4>
        </Modal.Header>
        <Modal.Body>{this.renderForm()}</Modal.Body>
      </Modal>
    );
  }
}
