import React, { Component } from "react";
import { FormGroup } from "components/form-group";
import { toast } from "react-toastify";
import Select from "react-select";
import CampaignService from "services/campaign-service";
import UserPledgeService from "services/userpledge-service";
import ReactTable from "react-table";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
export default class PledgeModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitalState();
  }
  getInitalState() {
    return {
      isSubmitting: false,
      campaignError: null,
      amountError: null,
      campaigns: []
    };
  }
  componentWillMount() {
    this.fetchAllCampaign();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.donor) {
      this.fetchPledges(newProps.donor.id);
    }
  }

  fetchPledges(donorId) {
    this.setState({ pledges: [], isLoading: true });
    UserPledgeService.getAllUserPledges(donorId)
      .then(res => {
        this.setState({ pledges: res.data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log("error getting pledges", err);
      });
  }

  fetchAllCampaign() {
    CampaignService.getActiveCampaign()
      .then(res => {
        this.setState({
          campaigns: res.data.map(c => ({ label: c.name, value: c.id }))
        });
      })
      .catch(err => {
        console.log("Unable to fetch campaign", err);
      });
  }

  deletePledge(pledgeId) {
    UserPledgeService.deleteUserPledge(this.props.donor.id, pledgeId)
      .then(() => {
        toast.success("Pledge Deleted");
        this.fetchPledges(this.props.donor.id);
      })
      .catch(err => {
        console.log("Error deleting pledge", err);
      });
  }
  addPledge() {
    if (!this.state.campaignId) {
      this.setState({ campaignError: "Campaign is required" });
      return;
    }

    if (!this.state.amount) {
      this.setState({ amountError: "Amount is required" });
      return;
    }

    if (this.state.amount < 0) {
      this.setState({ amountError: "Amount should be positive" });
      return;
    }

    this.setState({ isSubmitting: true });
    UserPledgeService.saveUserPledge(this.props.donor.id, {
      donorId: this.props.donor.id,
      campaignId: this.state.campaignId,
      amount: this.state.amount
    })
      .then(() => {
        this.setState({ campaignId: null, amount: "" });
        this.fetchPledges(this.props.donor.id);
        toast.success("Pledge Added");
        //this.props.toggleModal();
      })
      .catch(err => {
        this.setState({ isSubmitting: false });
        console.log("Error Adding Pledge", err);
        toast.error("Error Adding Pledge");
      });
  }

  hide() {
    this.props.onCancel();
  }

  render() {
    if (!this.props.donor) {
      return null;
    }
    return (
      <Modal
        show={this.props.showModal}
        onHide={() => {
          this.hide();
        }}
      >
        <Modal.Header>
          <h4>{this.props.donor.firstname} Pledges</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="form-horizontal form-label-left">
            <FormGroup
              label="Campaign"
              required={true}
              inputClassName="col-md-5 col-sm-5"
              error={this.state.campaignError}
              touched={true}
            >
              <Select
                name="form-field-name"
                value={this.state.campaignId}
                onChange={selectedOption => {
                  const value = selectedOption ? selectedOption.value : null;
                  this.setState({ campaignId: value, campaignError: null });
                }}
                multi={false}
                options={this.state.campaigns}
              />
            </FormGroup>
            <FormGroup
              label="Amount"
              required={true}
              touched={true}
              error={this.state.amountError}
              inputClassName="col-md-5 col-sm-5"
            >
              <input
                onChange={e => {
                  this.setState({ amount: e.target.value, amountError: null });
                }}
                value={this.state.amount}
                id="amount"
                className="form-control col-md-7 col-xs-12"
                type="number"
              />
            </FormGroup>
            <div className="clearfix">
              <div className="col-xs-6 col-xs-offset-3">
                <button
                  id="send"
                  type="submit"
                  onClick={() => {
                    this.addPledge();
                  }}
                  className="btn btn-success"
                >
                  Save
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
            </div>
          </div>

          <div className="ln_solid" />

          <div className="table-responsive">
            <ReactTable
              style={{
                height: "400px"
              }}
              showPaginationBottom={false}
              data={this.state.pledges}
              loading={this.state.isLoading}
              columns={[
                {
                  Header: "Campaign",
                  accessor: "campaignName"
                },
                {
                  Header: "Amount",
                  accessor: "amount"
                },
                {
                  id: "id",
                  accessor: d => d.id,
                  Cell: rowMeta => (
                    <div className="row-action">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id={"Delete" + rowMeta.original.id}>
                            Delete
                          </Tooltip>
                        }
                      >
                        <a
                          onClick={() => {
                            this.deletePledge(rowMeta.original.id);
                          }}
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </OverlayTrigger>
                    </div>
                  )
                }
              ]}
              className="-striped -highlight"
            />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
