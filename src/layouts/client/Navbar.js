import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import WithRouter from "../../WithRouter";

function Navbar() {
  let navigate = useNavigate();

  const onLogoutHandler = (e) => {
    e.preventDefault();

    axios.post(`/logout`).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("auth_token", response.data.token);

        swal.fire({
          icon: "warning",
          title: response.data.message,
          text: "Thank you for your supporting, please come back next time !",
          showConfirmButton: false,
          timer: 2500,
        });

        navigate("/login");
      } else {
        swal.fire({
          icon: "error",
          title: response.data.message,
          text: "Oop! Are you sure you already logged in?, Please try again !",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  var authButton = "";
  if (!localStorage.getItem("auth_token")) {
    authButton = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    authButton = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <button
            type="button"
            onClick={onLogoutHandler}
            className="nav-link btn btn-secondary btn-sm text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Phone Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/collection"
              >
                Collection
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/view-cart"
              >
                Cart
              </Link>
            </li>
            {authButton}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default (props) => <WithRouter Component={Navbar} {...props} />;
