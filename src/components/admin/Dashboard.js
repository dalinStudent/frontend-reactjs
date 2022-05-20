import React from "react";
import Navbar from "../../layouts/admin/Navbar";
import Sidebar from "../../layouts/admin/Sidebar";
import Footer from "../../layouts/admin/Footer";

function Dashboard() {
    return (
        <div className="sb-nav-fixed">
            <Navbar />

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
            </div>

            <div id="layoutSidenav_content">
                <main>
                    <h1>Dashboard</h1>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;