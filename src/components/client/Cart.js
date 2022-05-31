import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../layouts/client/Navbar";

const styles = {
  img: {
    height: "80px",
    width: "auto",
    marginBottom: "20px",
  },
};

function Cart() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  var totalPrice = 0;

  if (!localStorage.getItem("auth_token")) {
    navigate("/");
    Swal.fire({
      icon: "warning",
      title: "Please login!",
      showConfirmButton: true,
    });
  }

  useEffect(() => {
    let isMounted = true;

    axios.get(`/orders/view-cart`).then((res) => {
      console.log("cart", res.data);
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

  const handleDecrement = (order_id) => {
    if (quantity >= 1) {
      setCart((cart) =>
        cart.map((item) =>
          order_id === item.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      updateQuantity(order_id, "dec");
    }
  };

  const handleIncrement = (order_id) => {
    if (quantity < 5) {
      setCart((cart) =>
        cart.map((item) =>
          order_id === item.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      updateQuantity(order_id, "incre");
    }
  };

  function updateQuantity(order_id, scope) {
    axios.put(`/orders/update-quantity/${order_id}/${scope}`).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  const removeCartItem = (e, order_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    axios.delete(`/orders/remove-cart/${order_id}`).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        Swal.fire({
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
        });
        thisClicked.innerText = "Remove";
      }
    });
  };

  if (loading) {
    return <h4>Loading cart...</h4>;
  }

  var CART_HTML = "";
  if (cart.length > 0) {
    CART_HTML = (
      <div className="table-responsive">
        <table className="table table-bordered table-stripe">
          <thead>
            <tr>
              <th>Image</th>
              <th>Phone Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Currency</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, idx) => {
              totalPrice += item.phone.sell_price * item.quantity;
              return (
                <tr key={idx}>
                  <td width="10%">
                    <img
                      src={`http://localhost:8000/${item.phone.img}`}
                      alt=""
                      style={styles.img}
                    />
                  </td>
                  <td>{item.phone.name}</td>
                  <td width="15%" className="text-center">
                    {item.phone.sell_price}
                  </td>

                  <td width="15%" className="input-group">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.id)}
                      className="input-group-text"
                    >
                      -
                    </button>
                    <div className="form-control text-center">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleIncrement(item.id)}
                      className="input-group-text"
                    >
                      +
                    </button>
                  </td>
                  <td width="15%" className="text-center">
                    {item.phone.sell_price * item.quantity}
                  </td>
                  <td>$</td>
                  <td width="10%">
                    <button
                      type="button"
                      onClick={(e) => removeCartItem(e, item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    CART_HTML = (
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
          <h6>Home / Cart </h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container mt-5">
          <div className="row mb-3">
            <div className="col-md-12">{CART_HTML}</div>
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="card card-body mt-3">
                <h4>
                  Sub Total:
                  <span className="float-end text-danger">{totalPrice} $</span>
                </h4>
                <h4>
                  Grand Total:
                  <span className="float-end text-danger">{totalPrice} $</span>
                </h4>
                <hr />
                <Link to="/checkout" className="btn btn-primary">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
