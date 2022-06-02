import React from "react";
import { Link } from "react-router-dom";
import WithRouter from "../../WithRouter";

function Footer() {
  return (
    <div>
      <footer className="text-center text-white bg-danger mt-5">
        <div className="container pt-4">
          <section className="mb-4">
            <Link
              to=""
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              to=""
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              to=""
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google"></i>
            </Link>
            <Link
              to=""
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </Link>
          </section>
        </div>
        <div className="text-center text-dark p-3 bg-light">
          © 2022 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
             Group2OnlinePhoneSale
          </a>
        </div>
      </footer>
    </div>
  );
}

export default (props) => <WithRouter Component={Footer} {...props} />;
