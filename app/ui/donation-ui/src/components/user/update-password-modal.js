import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { FormGroup } from "components/form-group";
import UserService from "services/user-service";
import { toast } from "react-toastify";

export default class UpdatePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitalState();
  }
  getInitalState() {
    return {
      isSubmitting: false,
      error: null
    };
  }

  updatePassword() {
    if (!this.state.password || this.state.password.length == 0) {
      this.setState({ error: "Password is required" });
      return;
    }
    this.setState({ isSubmitting: true });
    UserService.updatePassword(this.props.user, this.state.password)
      .then(() => {
        toast.success("Password Updated");
        this.props.toggleModal();
      })
      .catch(err => {
        this.setState({ isSubmitting: false });
        console.log("password update failed", err);
        toast.error("Password Update Failed");
      });
    console.log(this.props.user);
  }

  hide() {
    this.setState(this.getInitalState());
    this.props.toggleModal();
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={() => {
          this.hide();
        }}
      >
        <Modal.Header>
          <h4>Update Password</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="clearfix">
            <FormGroup
              label="Password"
              required={true}
              touched={true}
              error={this.state.error}
              inputClassName="col-md-5 col-sm-5"
            >
              <input
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
                id="password"
                className="form-control col-md-7 col-xs-12"
                type="text"
              />
            </FormGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-md-6 col-md-offset-3">
            <button
              id="send"
              type="submit"
              onClick={() => {
                this.updatePassword();
              }}
              className="btn btn-success"
            >
              Update
            </button>
            <button
              id="cancel"
              onClick={() => {
                this.hide();
              }}
              disabled={this.state.isSubmitting}
              className="btn btn-default"
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
