import React, { Component, useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
import swal from "sweetalert2";
import WithRouter from "../../../WithRouter";
import { BorderAll, Dvr, ExpandLessOutlined } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";

function ViewPhone()
{

    const { id } = useParams();

    const [phoneInput, setPhone] = useState({
        name: '',
        description: '',
        price: '',
    });

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        axios.get(`/phones/${id}`).then((res) => {
            if (res.status === 200) {
                setPhone(res.data.data);
            }
            setLoading(); 
        });

    }, []);

    if (loading) {
        return <h4>View Phone loading...</h4>
    }

    return (
        <div className="sb-nav-fixed">
            <Navbar />

            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>

                <div id="layoutSidenav_content">
                    <main>
                        <div className="container mt-5 px-4">
                            <div className="row">
                                <div className="col-sm-6 col-md-4 col-lg-12">
                                    <div className="card m-auto h-100" style={{ width: '25rem' }}>
                                        <div className="card-header">
                                            <h3>
                                                Phone Details 
                                                <Link to="/admin/phones" className="btn btn-secondary float-end">Back</Link>
                                            </h3>
                                        </div>
                                        <img src={`${phoneInput.img}`} width="500px" className="card-img-top img-fluid" />
                                        <div className="card-body">
                                            <h5 className="card-title"><strong>Name : </strong>{phoneInput.name}</h5>
                                            <p className="card-text"><strong>Description :</strong> {phoneInput.description}</p>
                                            <p className="card-text"><strong>Price : </strong>{phoneInput.price} $</p>
                                            <Link to="#" className="btn btn-danger float-end">Delete</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                    </main>
                    <Footer />
                </div>
                
            </div>
  
        </div>
    );
}

export default ViewPhone;