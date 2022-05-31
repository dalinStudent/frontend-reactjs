import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../../layouts/admin/Footer";
import Sidebar from "../../../layouts/admin/Sidebar";
import Navbar from "../../../layouts/client/Navbar";

function ListCategory() {
    const [isLoading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    const fetchCategories = async () => {
       axios.get(`/categories`).then((response) => {
            console.log('res', response.data.data)
            if (response.status === 200) {
                setCategoryList(response.data.data)
            }
            setLoading(false);
        })
    } 
   
    useEffect(() => {
        fetchCategories();
    }, []);

    var viewPhone_HTMLTABLE = "";

    if (isLoading) {
        return <h3>Loading Categories...</h3>
    } else {
        viewPhone_HTMLTABLE = 
            categoryList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>{item.status}</td>
                        <td>
                            <Link to={`edit/${item.id}`} className="btn btn-success btn-sm">Update</Link>
                            &nbsp;
                            <button to={`delete/${item.id}`} onClick={() => deleteCategories(item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            })
    }

        const deleteCategories = async (id) => {
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

          await axios.delete(`/categories/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
              fetchCategories();
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
                                        Categories List
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <Link to="/admin/categories/create" className="btn btn-outline-primary btn-sm float-end mb-2">Create New Category</Link>
                    
                                    <table className="table table-bordered table-stripe text-center">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>   
                                                <th>Slug</th>
                                                <th>Status</th>
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

export default ListCategory;