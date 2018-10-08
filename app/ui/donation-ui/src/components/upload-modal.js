import React, { Component } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

export default class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <h4>Upload</h4>
        </Modal.Header>
        <Modal.Body>
          <div class="row">
            <div class="col-md-12">
              <input
                type="file"
                onChange={e => {
                  this.setState({ file: e.target.files });
                }}
              />
            </div>
            <div class="col-md-12">
              <button
                onClick={() => {
                  this.props.onUpload(this.state.file);
                }}
                className="btn btn-default"
              >
                Upload
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
