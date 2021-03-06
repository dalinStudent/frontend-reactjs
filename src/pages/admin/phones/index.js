import React, { forwardRef, useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import '../../../assets/admin/css/styles.css'
import '../../../assets/admin/js/scripts'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ListPhone() {

    const [isLoading, setLoading] = useState(true);
    const [phoneList, setPhoneList] = useState([]);

    const fetchPhone = async () => {
       axios.get(`/phones`).then((response) => {
            if (response.status === 200) {
                setPhoneList(response.data.data)
            }
            setLoading(false);
        })
    } 
   
    useEffect(() => {
        fetchPhone();
    }, []);

    var viewPhone_HTMLTABLE = "";

    if (isLoading) {
        return <h3>Loading Phone...</h3>
    } else {
        viewPhone_HTMLTABLE = 
            phoneList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <span className="badge btn-sm btn-danger badge-pil">{item.category.name}</span>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.sell_price}</td>
                        <td>{item.original_price}</td>
                        <td>$</td>
                        <td>
                            
                            <Link to={`view/${item.id}`} className="btn btn-primary btn-sm">View</Link>
                            &nbsp;
                            <Link to={`edit/${item.id}`} className="btn btn-success btn-sm">Update</Link>
                            &nbsp;
                            <button to={`delete/${item.id}`} onClick={() => deletePhone(item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            })
    }
    

    const deletePhone = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!' 
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`/phones/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
              fetchPhone();
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
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
                    
                                    <table className="table table-bordered table-stripe text-center">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Category Name</th>
                                                <th>Name</th>
                                                <th>Sell Price</th>
                                                <th>Original Price</th>
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