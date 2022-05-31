import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../../layouts/admin/Footer";
import Sidebar from "../../../layouts/admin/Sidebar";
import Navbar from "../../../layouts/client/Navbar";

function EditCategory() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [isLoading, setLoading] = useState(true);
    const [catInput, setCat] = useState({
        name: '',
    });

    useEffect(() => {

        axios.get(`/categories/${id}`).then((res) => {
            if (res.status === 200) {
                setCat(res.data.data);
            }
            setLoading(); 
        });

    }, []);

    const handleInput = (e) => {
        e.persist();
        setCat({ ...catInput, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();

        const data = catInput;
            axios.put(`/categories/${id}`, data).then((res) => {

                if (res.status === 200) {

                    localStorage.setItem('auth_token', res.data.data.token);

                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: true,
                    });

                    navigate("/admin/categories");
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
                                            Create New Category
                                            <Link to="/admin/categories" className="btn btn-secondary float-end">Back</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                    <form id="phone_form" encType="multipart/form-data">
                                            <div className="mb-3 row">
                                                <label className="col-sm-3 col-form-label">
                                                    <strong>Category Name:</strong>
                                                </label>
                                                <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={catInput.name}
                                                    onChange={handleInput}
                                                    className="form-control"
                                                />
                                                </div>
                                            </div>
                                        
                                            <div>
                                                <button type="submit" onClick={submit} className="btn btn-primary float-end">Submit</button>
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

export default EditCategory;