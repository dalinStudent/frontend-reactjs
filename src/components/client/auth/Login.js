import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert2";
import Navbar from "../../../layouts/client/Navbar";
import WithRouter from "../../../WithRouter";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        email: "",
        password: "",
      },
    };
  }

  onChangeHandler = (e, key) => {
    const { loginData } = this.state;
    loginData[e.target.name] = e.target.value;
    this.setState({ loginData });
  };

  onHandlerSubmit = (e) => {
    e.preventDefault();
    axios.post(`/login`, this.state.loginData).then((response) => {
      if (response.status === 200 && response.data.data.user.is_admin === 1) {
        localStorage.setItem("auth_token", response.data.data.token);
        localStorage.setItem("auth_user", response.data.data.user.email);
        localStorage.setItem("auth_name", response.data.data.user.first_name);
        localStorage.setItem("auth_role", response.data.data.user.is_admin);

        swal.fire({
          icon: "success",
          title: response.data.message,
          text: "Welcome to our business, and thank you for your supporting!",
          showConfirmButton: false,
          timer: 2500,
        });
        this.props.navigation("/admin/dashboard");
      } else if (
        response.status === 200 &&
        response.data.data.user.is_admin !== 1
      ) {
        localStorage.setItem("auth_token", response.data.data.token);
        localStorage.setItem("auth_user", response.data.data.user.email);
        localStorage.setItem("auth_name", response.data.data.user.first_name);
        localStorage.setItem("auth_role", response.data.data.user.is_admin);

        swal.fire({
          icon: "success",
          title: response.data.message,
          text: "Welcome to our business, and thank you for your supporting!",
          showConfirmButton: false,
          timer: 2500,
        });
        this.props.navigation("/");
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="container py5 mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Login</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        onChange={this.onChangeHandler}
                        value={this.state.loginData.email}
                        className="form-control"
                        name="email"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        onChange={this.onChangeHandler}
                        value={this.state.loginData.password}
                        className="form-control"
                        name="password"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <button
                        type="submit"
                        onClick={this.onHandlerSubmit}
                        className="btn btn-outline-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => <WithRouter Component={Login} {...props} />;
