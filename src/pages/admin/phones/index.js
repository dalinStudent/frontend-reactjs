import React, { forwardRef, useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import '../../../assets/admin/css/styles.css'
import '../../../assets/admin/js/scripts'
import { Link } from "react-router-dom";
import axios from "axios";

function ListPhone() {

    const [isLoading, setLoading] = useState(true);
    const [phoneList, setPhoneList] = useState([]);
   
    useEffect(() => {
        axios.get(`/phones`).then((response) => {
            console.log('res', response.data.data)
            if (response.status === 200) {
                setPhoneList(response.data.data)
            }
            setLoading(false);
        })
    }, []);

    var viewPhone_HTMLTABLE = "";

    if (isLoading) {
        return <h3>Loading Phone...</h3>
    } else {
        viewPhone_HTMLTABLE = 
            phoneList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{ item.id }</td>
                        <td>{ item.name }</td>
                        <td>{ item.description }</td>
                        <td>{item.price}</td>
                        <td>$</td>
                        <td>
                            
                            <Link to={`view/${item.id}`} className="btn btn-primary btn-sm">View</Link>
                            &nbsp;
                            <Link to={`edit/${item.id}`} className="btn btn-success btn-sm">Update</Link>
                            &nbsp;
                            <Link to="#" className="btn btn-danger btn-sm">Delete</Link>
                        </td>
                    </tr>
                )
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
                                        Phone List
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <Link to="/admin/phones/create" className="btn btn-info btn-sm float-end mb-2">Create New Phone</Link>
                    
                                    <table className="table table-bordered table-stripe">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Currency</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewPhone_HTMLTABLE}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                <Footer />
                </div>
                
            </div>

        </div>
        
    )
}

export default ListPhone;