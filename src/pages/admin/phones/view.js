import React, { Component, useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
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
    const [images, setImage] = useState([]);
    
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
                        <div className="container mt-5 px-4 mb-5">
                            <div className="row">
                                <div className="col-sm-6 col-md-4 col-lg-12">
                                    <div className="card m-auto h-100" style={{ width: '25rem' }}>
                                        <div className="card-header">
                                            <h3>
                                                Phone Details 
                                                <Link to="/admin/phones" className="btn btn-secondary float-end">Back</Link>
                                            </h3>
                                        </div>
                                        <img src={`http://localhost:8000/${phoneInput.img}`} width="500px" className="card-img-top img-fluid" alt="" />
                                        <div className="card-body">
                                            <p className="card-title"><strong>Name : </strong>{phoneInput.name}</p>
                                            <p className="card-text"><strong>Description :</strong> {phoneInput.description}</p>
                                            <p className="card-text"><strong>Original Price : </strong><s>{phoneInput.original_price}</s>  $</p>
                                            <p className="card-text"><strong>Discount Price : </strong>{phoneInput.sell_price} $</p>
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