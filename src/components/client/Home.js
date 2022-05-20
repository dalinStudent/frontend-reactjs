import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/client/Navbar";

function Home() {

    return (
        
        <div>
            <Navbar />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group mt-5">
                            <Link to="#" className="">
                                <div className="card">
                                    <div className="card-header">
                                        <img className="shoe-thumb" src="" />
                                    </div>
                                    <div className="card-body">

                                        <h5 className="shoe-name"></h5>
                                        <p className="shoe-price"><b>$</b></p>
                            
                                        <div className="dropdown show float-right">
                                            <Link to="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons main-btn">more_vert</i>
                                            </Link>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <Link to="#" className="dropdown-item">Update</Link>
                                                <Link className="dropdown-item" to="#" onClick="return confirm('Are you sure want to delete?')">Delete</Link>
                                            </div>
                                        </div>
                                        <p className="btn-holder">
                                            <Link to="#" className="btn btn-info text-center" role="button">
                                                <i className="fas fa-cart-arrow-up" />
                                            </Link> 
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </ul>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Home;