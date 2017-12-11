import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
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
                    required=""
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required=""
                  />
                </div>
                <div>
                  <a className="btn btn-default submit" href="index.html">
                    Log in
                  </a>
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

export default Login;
