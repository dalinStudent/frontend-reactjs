import React from "react";
import { Link } from "react-router-dom";
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link to="/admin/dashboard" className="nav-link" >
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-tachometer-alt" />
                        </div>
                        Dashboard
                    </Link>

                    <Link to="/admin/users" className="nav-link">
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-users" />
                        </div>
                        Users
                    </Link>

                    <div className="sb-sidenav-menu-heading">Interface</div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                       data-bs-target="#collapseCate" aria-expanded="false" aria-controls="collapseCate">
                        <div className="sb-nav-link-icon"><i className="fas fa-mobile"></i></div>
                            Category
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseCate" aria-labelledby="headingOne"
                         data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/categories">List all Category</Link>
                        </nav>
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/categories/create">Create Category</Link>
                        </nav>
                    </div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                       data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-mobile"></i></div>
                            Phones
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                         data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/phones">List all Phones</Link>
                            <Link className="nav-link" to="/admin/phones/create">Create Phone</Link>
                        </nav>
                    </div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                       data-bs-target="#collapseOrder" aria-expanded="false" aria-controls="collapseOrder">
                        <div className="sb-nav-link-icon"><i className="fas fa-mobile"></i></div>
                            Orders
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseOrder" aria-labelledby="headingOne"
                         data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/phones">List all Orders</Link>
                        </nav>
                    </div>
                    
                    
 
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {localStorage.getItem('auth_name')}
            </div>
        </nav>
    );
}

export default Sidebar;