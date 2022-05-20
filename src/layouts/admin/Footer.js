import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2022</div>
                    <div>
                        <Link to="#">University of Puthisastra</Link>
                        &middot;
                        <Link to="#">Web Development &amp; Group2</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;