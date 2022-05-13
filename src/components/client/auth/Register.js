import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert2";
// import { withRouter } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import Navbar from "../../../layouts/client/Navbar";
import WithRouter from "../../../WithRouter";

class Register extends Component { 

    userData;
    constructor(props) {
        super(props);
        this.state = {
            registerData: {
                first_name: "",
                last_name: "",
                email: "",
                address: "",
                password: "",
                error_list: [],
            },
        };
        // this.onHandlerClick = this.onHandlerClick.bind(this);
    }

    onChangeHandler = (e, key) => {
        const {registerData} = this.state;
        registerData[e.target.name] = e.target.value;
        this.setState({registerData});
    }

    onHandlerSubmit = (e) => {
        e.preventDefault();
        // axios.get(`/sanctum/csrf-cookie`).then(response => {
            axios
                .post(`/register`, this.state.registerData)
                .then((response) => {

                    if (response.status === 200) {
                        localStorage.setItem('auth_token', response.data.token);
                        localStorage.setItem('auth_user', response.data.user);

                        swal.fire({
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.props.navigation.push("/login");

                    } else {
                        // this.setState({registerData, error_list: response.data.message.errors})
                    }
                });
        // })
        
        
    }

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
                                                name="first_name" />
                                        </div>
                                        {/* <span>{ registerData}</span> */}
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                onChange={this.onChangeHandler}
                                                value={this.state.registerData.last_name}
                                                className="form-control"
                                                name="last_name"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input t
                                                ype="email"
                                                onChange={this.onChangeHandler}
                                                value={this.state.registerData.email}
                                                className="form-control"
                                                name="email"
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
                                            />
                                        </div>
                                        {/* <div className="form-group mb-3">
                                            <label>Confirm Password</label>
                                            <input type="password" onChange={this.onHandlerInput} value={this.state.first_name} className="form-control" name="cf_password" />
                                        </div> */}
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

export default (props) => <WithRouter Component={Register} {...props} />