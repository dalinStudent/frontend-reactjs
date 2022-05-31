import React, { Component, useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPhone()
{

    let navigate = useNavigate();

    const { id } = useParams();
    
    const [phoneInput, setPhone] = useState({
        name: '',
        slug:'',
        description: '',
        sell_price: '',
        original_price: '',
        img: '',
        quantity: '',
    });

    const [images, setImage] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setPhone({ ...phoneInput, [e.target.name]: e.target.value });
    }

    const handleImageInput = (e) => {
        e.persist();
        setImage({ img: e.target.files[0] });
    }

    useEffect(() => {

        axios.get(`/phones/${id}`).then((res) => {
            if (res.status === 200) {
                setPhone(res.data.data);
            }
            setLoading(); 
        });

    }, []);


    const submitPhone = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('img', images.img);
        formData.append('name', phoneInput.name);
        formData.append('description', phoneInput.description);
        formData.append('sell_price', phoneInput.sell_price);
        formData.append('original_price', phoneInput.original_price);
        formData.append('quantity', phoneInput.quantity);

        const data = formData;
    
        axios.put(`/phones/${id}`, data).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('auth_token', res.data.data.token);
                    swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: true,
                    });

                    setError([]);
                    navigate("/admin/phones");
                    }
                    console.log('update', res.data)
            })
            .catch(({ response }) => {
            if(response.status===422){
                setError(response.data.errors)
            }else{
                swal.fire({
                text:response.data.message,
                icon:"error"
            })
        }
    })

    }

    if (loading) {
        return <h4>Edit Phone loading...</h4>
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
                                        Update Information
                                        <Link to="/admin/phones" className="btn btn-secondary float-end">Back</Link>
                                        </h3>
                                </div>
                                    {
                                    Object.keys(error).length > 0 && (
                                        <div className="row">
                                        <div className="col-12">
                                            <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {
                                                Object.entries(error).map(([key, value])=>(
                                                    <li key={key}>{value}</li>   
                                                ))
                                                }
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                    }
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
                                                     <small className="text-danger"></small>
                                                </div>
                                               
                                            </div>
                                            <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Sell Price :</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="number"
                                                        name="sell_price"
                                                        value={phoneInput.sell_price}
                                                        onChange={ handleInput }
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{ error.sell_price }</small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                    <label className="col-sm-3 col-form-label">
                                                        <strong>Original Price :</strong>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="number"
                                                            name="original_price"
                                                            value={phoneInput.original_price}
                                                            onChange={ handleInput }
                                                            className="form-control"
                                                        />
                                                        <small className="text-danger">{ error.original_price }</small>
                                                    </div>
                                        </div>
                                        <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Quantity :</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        value={phoneInput.quantity}
                                                        onChange={ handleInput }
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{ error.quantity }</small>
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
                                                    <small className="text-danger"></small>
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
                                                    <img src={`http://localhost:8000/${phoneInput.img}`} width="150px" className="mt-3"/>
                                                    <small className="text-danger"></small>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="submit" onClick={submitPhone} className="btn btn-primary float-end">Submit</button>
                                            </div>
                                        </form>
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

export default EditPhone;