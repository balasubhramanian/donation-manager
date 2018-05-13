import React, { Component } from "react";
import { toast } from "react-toastify";
import ConfigService from "services/config-service";
import { withFormik } from "formik";
import Yup from "yup";
import { FormGroup } from "components/form-group";

const AddConfigForm = props => {
  let {
    values,
    dirty,
    isSubmitting,
    handleSubmit,
    setFieldTouched,
    touched,
    errors,
    handleChange,
    handleBlur
  } = props;

  let beforeSubmit = e => {
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
          label={props.nameLabel ? props.nameLabel : "Name"}
          required={true}
          error={errors.name}
          touched={touched.name}
          inputClassName="col-md-5 col-sm-5"
        >
          {props.type === "text" ? (
            <textarea
              rows="10"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control col-md-7 col-xs-12"
            />
          ) : (
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control col-md-7 col-xs-12"
            />
          )}
        </FormGroup>

        <FormGroup
          label="Status"
          required={true}
          error={errors.status}
          touched={touched.status}
          inputClassName="col-md-5 col-sm-5"
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

let defaultData = { status: "A" };
const AddConfigFormik = withFormik({
  mapPropsToValues: props =>
    props.isEdit
      ? { ...props.config }
      : Object.assign(defaultData, props.config),
  validationSchema: props =>
    Yup.object().shape({
      name: Yup.string()
        .required(" Required!")
        .max(250, "Must be most 250 chars"),
      status: Yup.string().required("Status is required!")
    }),
  handleSubmit: (values, props) => {
    let { setSubmitting } = props;
    console.log(props);
    setSubmitting(true);
    if (props.props.isEdit) {
      ConfigService.updateConfig(values.id, values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success(props.props.moduleName + " Updated");
          props.props.onSuccess();
        })
        .catch(res => {
          console.log(res);
          setSubmitting(false);
        });
    } else {
      values.module = props.props.module;
      ConfigService.addConfig(values)
        .then(res => {
          console.log(res);
          setSubmitting(false);
          toast.success(props.props.moduleName + " Added");
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
})(AddConfigForm);

export default class AddConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: props.isEdit,
      config: props.config,
      module: props.module,
      moduleName: props.moduleName
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      isEdit: props.isEdit,
      config: props.config,
      module: props.module,
      moduleName: props.moduleName
    });
  }

  onCancel() {
    this.props.onCancel();
  }
  render() {
    return (
      <div>
        <AddConfigFormik
          config={this.state.config}
          isEdit={this.state.isEdit}
          module={this.state.module}
          moduleName={this.state.moduleName}
          nameLabel={this.props.nameLabel}
          type={this.props.type}
          valueLabel={this.props.valueLabel}
          isValueRequired={this.props.isValueRequired}
          onSuccess={() => {
            this.props.onSuccess();
          }}
          onCancel={() => {
            this.onCancel();
          }}
        />
      </div>
    );
  }
}
