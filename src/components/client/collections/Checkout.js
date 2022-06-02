import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../../layouts/client/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../../layouts/client/Footer";

function Checkout() {
  if (!localStorage.getItem("auth_token")) {
    navigate("/login");
    Swal.fire({
      icon: "warning",
      title: "Please login to be continus!",
      showConfirmButton: true,
    });
  }
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState([]);
  var totalPrice = 0;
  let navigate = useNavigate();
  const [checkoutInput, setCheckout] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
  });

  useEffect(() => {
    let isMounted = true;

    axios.get(`/orders/view-cart`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          Swal.fire({
            icon: "warning",
            title: res.data.message,
            showConfirmButton: true,
          });
          navigate("/login");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    e.persist();
    setCheckout({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: checkoutInput.first_name,
      last_name: checkoutInput.last_name,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
    };

    axios.post(`/checkout/place-order`, data).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setError([]);
        navigate("/thank-you");
      } else if (res.data.status === 422) {
        setError(res.data.errors);
      }
    });
  };

  if (loading) {
    return <h4>Loading checkout...</h4>;
  }

  var CHECKOUT_HTML = "";
  if (cart.length > 0) {
    CHECKOUT_HTML = (
      <div>
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Basic Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={checkoutInput.first_name}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.first_name}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={checkoutInput.last_name}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.last_name}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={checkoutInput.phone}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.phone}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={checkoutInput.email}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Full Address</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="ex: #35A st371"
                        rows="5"
                        value={checkoutInput.address}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.address}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={checkoutInput.city}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.city}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={checkoutInput.state}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.state}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Zip Code</label>
                      <input
                        type="number"
                        className="form-control"
                        name="zipcode"
                        value={checkoutInput.zipcode}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.zipcode}</small>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-danger">Cancel</button>
                    <button
                      className="btn btn-primary float-end"
                      onClick={handleSubmit}
                    >
                      Submit Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <table className="table table-bordered table-stripe">
              <thead>
                <tr>
                  <th>Phone Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  totalPrice += item.phone.sell_price * item.quantity;
                  return (
                    <tr key={idx}>
                      <td>{item.phone.name}</td>
                      <td>{item.phone.sell_price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.phone.sell_price * item.quantity} $</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end">
                    <strong>Grand Total</strong>
                  </td>
                  <td colSpan="2" className="text-danger text-end">
                    {totalPrice} $
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    CHECKOUT_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>
            Your shopping Cart is Empty <Link to="/">Let's shopping</Link>
          </h4>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />

      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Checkout </h6>
        </div>
      </div>

      <div className="py-3" justify="center">
        <div className="container mt-3">{CHECKOUT_HTML}</div>
      </div>
    </div>
  );
}

export default Checkout;
