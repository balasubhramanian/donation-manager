import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.css";
import * as actions from "./action";
import { Alert } from "components/alert";
class Login extends Component {
  onSubmit(e) {
    e.preventDefault();
    this.props.onLogin(this.refs.username.value, this.refs.password.value);
  }
  render() {
    return (
      <div className="login">
        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <h1>Donation Manager</h1>
                <Alert type="danger" message={this.props.errorMessage} />
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required=""
                    ref="username"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required=""
                    ref="password"
                  />
                </div>
                <div>
                  <button
                    onClick={e => {
                      this.onSubmit(e);
                    }}
                    className="btn btn-default submit"
                  >
                    {this.props.isLoading ? "Loading..." : "Log in"}
                  </button>
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
