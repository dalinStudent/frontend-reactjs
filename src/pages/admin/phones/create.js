import React, { Component, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
import swal from "sweetalert2";
import WithRouter from "../../../WithRouter";
import { Link, useNavigate } from "react-router-dom";

function CreatePhone()
{
    let navigate = useNavigate();

    const [phoneInput, setPhone] = useState({
        name: '',
        description: '',
        price: '',
    });

    const [images, setImage] = useState([]);
    const [error, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPhone({ ...phoneInput, [e.target.name]: e.target.value });
    }

    const handleImageInput = (e) => {
        e.persist();
        setImage({ img: e.target.files[0] });
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('img', images.img);
        formData.append('name', phoneInput.name);
        formData.append('description', phoneInput.description);
        formData.append('price', phoneInput.price);

        axios.post(`/phones`, formData).then((res) => {

            if (res.status === 200) {

                localStorage.setItem('auth_token', res.data.data.token);

                swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: true,
                });

                setError([]);
               navigate("/admin/phones");
            } else if (res.status === 422){

                setError(res.errors);

                console.log('error', res.data.errors)
            }
        })
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
                                <div className="card">
                                    <div className="card-header">
                                        <h3>
                                            Create New Phone
                                            <Link to="/admin/phones" className="btn btn-secondary float-end">Back</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form id="phone_form" encType="multipart/form-data">
                                            <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Product Name :</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={phoneInput.name}
                                                        onChange={ handleInput }
                                                        className="form-control"
                                                    />
                                                     <small className="text-danger">{ error.name }</small>
                                                </div>
                                               
                                            </div>
                                            <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Price :</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        value={phoneInput.price}
                                                        onChange={ handleInput }
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{ error.price }</small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Description :</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                    <textarea
                                                        className="form-control"
                                                        name="description"
                                                        value={phoneInput.description}
                                                        onChange={ handleInput }
                                                        type="text"
                                                        rows="3"
                                                    />
                                                    <small className="text-danger">{ error.description }</small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Product Image :</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="file"
                                                            name="img"
                                                            id="imageForm"
                                                        onChange={ handleImageInput }
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{ error.img }</small>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="submit" onClick={submit} className="btn btn-primary float-end">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* <Images ref="child" /> */}
                        </div>
                    </main>
                    <Footer />
                </div>
                
            </div>
  
        </div>
    );
}


export default CreatePhone;