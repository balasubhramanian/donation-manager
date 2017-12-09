import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <div class="login">
        <div class="login_wrapper">
          <div class="animate form login_form">
            <section class="login_content">
              <form>
                <h1>Donation Manager</h1>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    required=""
                  />
                </div>
                <div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required=""
                  />
                </div>
                <div>
                  <a class="btn btn-default submit" href="index.html">
                    Log in
                  </a>
                </div>

                <div class="clearfix" />
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
