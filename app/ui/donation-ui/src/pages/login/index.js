import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.css";
import * as actions from "./action";
import { Alert } from "components/alert";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      submitted: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (username && password) {
      this.props.onLogin(username, password);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { submitted, username, password } = this.state;
    return (
      <div className="login">
        <Alert type="danger" message={this.props.errorMessage} />
        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <h1>Donation Manager</h1>

                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    onChange={e => this.handleChange(e)}
                  />
                  {submitted &&
                    !username && (
                      <div className="help-block">Username is required</div>
                    )}
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={e => this.handleChange(e)}
                  />
                  {submitted &&
                    !password && (
                      <div className="help-block">Password is required</div>
                    )}
                </div>
                <div>
                  {this.props.isLoading ? (
                    <button className="btn btn-default ">
                      <i className="fa fa-spinner fa-pulse " />
                    </button>
                  ) : (
                    <button
                      onClick={e => {
                        this.onSubmit(e);
                      }}
                      className="btn btn-default submit"
                    >
                      Log in
                    </button>
                  )}
                </div>
                <div className="clearfix" />
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(actions.login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
