import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AddConfig from "pages/config/add-config";
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
        <Modal.Header closeButton>
          <h4>
            {this.props.config ? "Update" : "Add"} {this.props.moduleName}
          </h4>
        </Modal.Header>
        <Modal.Body>
          <AddConfig
            config={Object.assign({}, this.props.config)}
            isEdit={this.props.config ? true : false}
            module={this.props.module}
            moduleName={this.props.moduleName}
            nameLabel={this.props.nameLabel}
            type={this.props.type}
            onCancel={() => {
              this.hide();
            }}
            onSuccess={() => this.props.onSuccess()}
          />
        </Modal.Body>
        {/* <Modal.Footer /> */}
      </Modal>
    );
  }
}
