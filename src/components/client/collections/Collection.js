import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../layouts/client/Navbar";

function Collections() {

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {

        let isMountered = true;

        axios.get(`/categories`).then((res) => {

            if (isMountered) {
                if (res.status === 200) {
                    setCategory(res.data.data);
                    setLoading(false)
                }
            }
        })
        
        return () => {

        }

    }, [])

    if (loading) {
        return <h4>Loading Categories...</h4>
    } else {
        var showCategories = '';
        showCategories = category.map((item, idx) => {
            return (
                <div className="col-md-4 mb-3" key={idx}>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`/collection/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <Navbar />

            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row mb-3">
                        {showCategories}
                    </div>     
                </div>
            </div>
            
        </div>
    )
}

export default Collections;