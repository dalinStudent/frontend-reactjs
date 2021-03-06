import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert2";
import Navbar from "../../../layouts/client/Navbar";
import WithRouter from "../../../WithRouter";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerData: {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        password: "",
      },
    };
  }

  onChangeHandler = (e, key) => {
    const { registerData } = this.state;
    registerData[e.target.name] = e.target.value;
    this.setState({ registerData });
  };

  onHandlerSubmit = (e) => {
    e.preventDefault();
    axios.post(`/register`, this.state.registerData).then((response) => {
      if (response.status === 200) {
        localStorage.getItem("auth_token", response.data.data.token);
        localStorage.getItem("auth_user", response.data.data.user.email);

        swal.fire({
          icon: "success",
          title: response.data.message,
          text: "Welcome to our business, and thank you for your supporting!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.props.navigation("/login");
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
                  <h4>Register</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        onChange={this.onChangeHandler}
                        value={this.state.registerData.first_name}
                        className="form-control"
                        name="first_name"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        onChange={this.onChangeHandler}
                        value={this.state.registerData.last_name}
                        className="form-control"
                        name="last_name"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        onChange={this.onChangeHandler}
                        value={this.state.registerData.email}
                        className="form-control"
                        name="email"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        onChange={this.onChangeHandler}
                        value={this.state.registerData.address}
                        className="form-control"
                        name="address"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        onChange={this.onChangeHandler}
                        value={this.state.registerData.password}
                        className="form-control"
                        name="password"
                        required
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

export default (props) => <WithRouter Component={Register} {...props} />;
