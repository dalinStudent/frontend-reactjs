import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../layouts/client/Navbar";

const styles = {
  img: {
    height: "80px",
    width: "auto",
    marginBottom: "20px",
  },
};

function PhoneDetail() {
  let cat_slug = useParams();
  let phone_slug = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`/phones/${cat_slug.category}/${phone_slug.phone}`)
      .then((res) => {
        if (isMounted) {
          if (res.status === 200) {
            setPhone(res.data.data.phone);
            setLoading(false);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const addCart = (e) => {
    e.preventDefault();

    const data = {
      phone_id: phone.id,
      quantity: quantity,
    };
    console.log("data", data);

    axios.post(`/orders/add-cart`, data).then((res) => {
      console.log("res", res.data);
      if (res.data.status === 200) {
        setPhone(res.data.data);
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
      } else if (res.data.status === 409) {
        Swal.fire({
          icon: "warning",
          title: res.data.message,
          showConfirmButton: true,
        });
      } else if (res.data.status === 401) {
        Swal.fire({
          icon: "warning",
          title: res.data.message,
          showConfirmButton: true,
        });
        navigate("/login");
      }
      // else if (res.data.status === 404) {
      //     Swal.fire({
      //         icon: 'error',
      //         title: res.data.message,
      //         showConfirmButton: true,
      //     });
      // }
    });
  };

  if (loading) {
    return <h4>Loading Phone Details...</h4>;
  } else {
    var available_stock = "";
    if (phone.quantity >= 1) {
      available_stock = (
        <div>
          <label className="btn-sm btn-success px-4 mt-3 mb-2">In Stock</label>
          <div className="row">
            <div className="col-md-3">
              <div className="input-group">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="input-group-text"
                >
                  -
                </button>
                <div className="form-control text-center">{quantity}</div>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="input-group-text"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={addCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      available_stock = (
        <div>
          <label className="btn-sm btn-danger px-4 mt-3 mb-2">
            Out of Stock
          </label>
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />

      <div className="py-3 bg-warning">
        <div className="container">
          <h6>
            Collections / {phone.category.name} / {phone.name}{" "}
          </h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container mt-5">
          <div className="row mb-3">
            <div className="col-md-4 border-end">
              <img
                src={`http://localhost:8000/${phone.img}`}
                className="w-100 h-100"
                alt=""
              />
            </div>

            <div className="col-md-8">
              <h4>
                {phone.name}
                <span className="float-end badge btn-sm btn-danger badge-pil">
                  {phone.category.name}
                </span>
              </h4>
              <p>{phone.description}</p>
              <h4 className="mb-1">
                Price: {phone.sell_price} $
                <s className="ms-2"> {phone.original_price}</s> $
              </h4>
              <div>{available_stock}</div>
              <button type="button" className="btn btn-danger mt-3">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneDetail;
