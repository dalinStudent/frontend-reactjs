import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../layouts/client/Navbar";

const styles = {
  img: {
    height: "200px",
    width: "auto",
    marginTop: "10px",
  },
};

function ViewPhoneEachCategory() {
  let slug = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState([]);
  const [category, setCat] = useState([]);

  const phoneCount = phone.length;

  useEffect(() => {
    let isMounted = true;

    axios.get(`/categories/${slug.slug}`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setPhone(res.data.data.phone);
          setCat(res.data.data.category);
          setLoading(false);
        } else if (res.status === 400) {
          Swal.fire({
            icon: "warning",
            title: res.data.message,
            showConfirmButton: true,
          });

          navigate("/collection");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <h4>Loading Phone...</h4>;
  } else {
    var showPhonesEachCat = "";

    if (phoneCount) {
      showPhonesEachCat = phone.map((item, idx) => {
        return (
          <div className="col-md-4 mb-3" key={idx}>
            <div className="card text-center">
              <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                <img
                  src={`http://localhost:8000/${item.img}`}
                  alt=""
                  style={styles.img}
                />
              </Link>
              <div className="card-body">
                <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                  <h5>{item.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    } else {
      showPhonesEachCat = "";
      <div className="col-md-12">
        <h4>No Phone available for {category.name}</h4>
      </div>;
    }
  }

  return (
    <div>
      <Navbar />

      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collections / {category.name} </h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row mb-3">{showPhonesEachCat}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewPhoneEachCategory;
