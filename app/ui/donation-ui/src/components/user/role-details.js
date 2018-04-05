import React, { Component } from "react";
import { FormGroup } from "components/form-group";
import Select from "react-select";
import RolePermissionService from "services/role-permission-service";

export class RoleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.transformRolesToOptions(props.values.roles),
      isLoading: true
    };
  }

  componentWillMount() {
    this.fetchAllRoles();
  }

  fetchAllRoles() {
    this.setState({ isLoading: true });
    RolePermissionService.getAllRoles()
      .then()
      .then(response => {
        this.setState({
          roles: this.transformRolesToOptions(response.data),
          isLoading: false
        });
      })
      .catch(err => {
        console.log("Error fetching roles", err);
        this.setState({ isLoading: false });
      });
  }

  transformRolesToOptions(role) {
    if (!role) return [];
    return role.map(d => {
      return {
        value: d.id,
        label: d.name
      };
    });
  }

  transformOptionsToRoles(options) {
    if (!options) return [];
    return options.map(d => {
      return {
        id: d.value,
        name: d.label
      };
    });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.setFieldValue(
      "roles",
      this.transformOptionsToRoles(selectedOption)
    );
    console.log("Selected: ", selectedOption);
  };

  render() {
    const { selectedOption, isLoading, roles } = this.state;

    return (
      <div>
        <div className="clearfix">
          <h4>Roles</h4>
          <div className="ln_solid" />
          <FormGroup>
            <Select
              isLoading={isLoading}
              name="form-field-name"
              value={selectedOption}
              onChange={this.handleChange}
              multi={true}
              options={roles}
            />
          </FormGroup>
        </div>

        {/*
          <div className="ln_solid" />
           <div>
            <div className="form-group">
              <div className="col-md-6 col-md-offset-3">
                <button id="send" type="submit" className="btn btn-success">
                  Save
                </button>
                <button id="send" type="reset" className="btn btn-default">
                  Cancel
                </button>
              </div>
            </div>
          </div> */}
      </div>
    );
  }
}
