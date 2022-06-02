import React, { forwardRef, useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import "../../../assets/admin/css/styles.css";
import "../../../assets/admin/js/scripts";
import { Link } from "react-router-dom";
import axios from "axios";

function ListUsers() {
  const [isLoading, setLoading] = useState(true);
  const [userList, setPhoneList] = useState([]);

  useEffect(() => {
    axios.get(`/users`).then((response) => {
      if (response.status === 200) {
        setPhoneList(response.data.data);
      }
      setLoading(false);
    });
  }, []);

  var viewPhone_HTMLTABLE = "";

  if (isLoading) {
    return <h3>Loading Users...</h3>;
  } else {
    viewPhone_HTMLTABLE = userList.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.address}</td>
        </tr>
      );
    });
  }

  return (
    <div className="sb-nav-fixed">
      <Navbar />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <div className="container mt-5 px-4">
              <div className="card">
                <div className="card-header">
                  <h3>User List</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-stripe">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>{viewPhone_HTMLTABLE}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
