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
          </div>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: "left" }}>
          <button
            onClick={() => {
              this.props.onUpload(this.state.file);
            }}
            className="btn btn-success"
          >
            Upload
          </button>
          {this.props.templateLink && (
            <a
              class="pull-right"
              href={this.props.templateLink}
              target="_blank"
            >
              Download Template
            </a>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}
