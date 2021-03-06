import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import './index.css'
import MasterLayout from "./layouts/admin/Master";
import Home from "./components/client/Home";
import Login from "./components/client/auth/Login";
import Register from "./components/client/auth/Register";
import axios from "axios";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Phones from "./pages/admin/phones";
import CreatePhone from "./pages/admin/phones/create";
import EditPhone from "./pages/admin/phones/edit";
import ViewPhone from "./pages/admin/phones/view";
import Users from "./pages/admin/users";
import ListCategory from "./pages/admin/category";
import CreateCategory from "./pages/admin/category/create";
import EditCategory from "./pages/admin/category/edit";
import Collections from "./components/client/collections/Collection";
import ViewPhoneEachCategory from "./components/client/collections/ViewPhoneEactCategory";
import PhoneDetail from "./components/client/collections/PhoneDetail";
import Cart from "./components/client/Cart";
import Checkout from "./components/client/collections/Checkout";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/collection" element={<Collections />} />
            <Route
              path="/collection/:slug"
              element={<ViewPhoneEachCategory />}
            />
            <Route
              path="/collection/:category/:phone"
              element={<PhoneDetail />}
            />

            <Route path="/view-cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* <Route path="/admin" element={<AdminPrivateRoute />}> */}
            <Route path="/admin" element={<MasterLayout />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            {/* </Route> */}

            <Route path="/admin/profile" element={<Profile />} />

            <Route
              path="/admin/categories/create"
              element={<CreateCategory />}
            />
            <Route path="/admin/categories" element={<ListCategory />} />
            <Route
              path="/admin/categories/edit/:id"
              element={<EditCategory />}
            />

            <Route path="/admin/phones" element={<Phones />} />
            <Route path="/admin/phones/create" element={<CreatePhone />} />
            <Route path="/admin/phones/edit/:id" element={<EditPhone />} />
            <Route path="/admin/phones/view/:id" element={<ViewPhone />} />

            <Route path="/admin/users" element={<Users />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
