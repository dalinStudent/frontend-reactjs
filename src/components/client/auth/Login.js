import React from "react";
import Navbar from "../../../layouts/client/Navbar";

function Login() {
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
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" value="" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" value="" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-outline-primary">Submit</button>
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

export default Login;