import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoute() {
    const auth = localStorage.getItem("auth_role");
    
    if (auth === 1) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />;
    }
    
}

export default AdminPrivateRoute;