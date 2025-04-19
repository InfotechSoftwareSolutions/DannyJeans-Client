import { useState } from "react";
// import "./App.css";
import Login from "./pages/register-login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register-login/Register";
import UserProtectedRoute from "./components/protected-route/UserProtectedRoute";
import AdminProtectedRoute from "./components/protected-route/AdminProtectedRoute";
// import Home from "./pages/user/Home";
// import Product from "./pages/user/Product";
// import Dashboard from "./pages/admin/Dashboard";
// import ProductTable from "./pages/admin/ProductTable";
import AddProduct from "./pages/admin/AddProduct";
// import NewAddProduct from "./pages/admin/NewAddProduct";
import DisplayProductTable from "./pages/admin/DisplayProductTable";
import CategoryTable from "./pages/admin/CategoryTable";
import AboutUs from "./pages/user/AboutUs";
import Cart from "./pages/user/Cart";
import CheckOut from "./pages/user/CheckOut";
import CustomStudio from "./pages/user/CustomStudio";
// import Login from "./pages/user/Login";
import Men from "./pages/user/Men";
import NewArrival from "./pages/user/NewArrival";
// import Register from "./pages/user/Register";
import Sale from "./pages/user/Sale";
import SingleProduct from "./pages/user/SingleProduct";
import UserProfile from "./pages/user/UserProfile";
import WishList from "./pages/user/WishList";
import Home from "./pages/user/Home";
import ProductListing from "./pages/user/ProductListing";
import Coupons from "./pages/admin/Coupons";
import Dashboard from "./pages/admin/Dashboard";
import Offers from "./pages/admin/Offer";
import User from "./pages/admin/User";
import Orders from "./pages/admin/Orders";
import Order from "./pages/user/Order";
import Return from "./pages/user/Return"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserLayout from "./components/layout/user-layout/UserLayout";




function App() {
  console.log("ppppppp");

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<Register/>} /> */}
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route element={<UserLayout />}> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* </Route> */}
        <Route element={<UserProtectedRoute />}>
          {/* <Route path="/product" element={<Product />} /> */}
          <Route path="/" element={<Home />} />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/customstudio" element={<CustomStudio />} />
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/mens" element={<Men />} />
          <Route path="/newarrival" element={<NewArrival />} />

          <Route path="/sale" element={<Sale />} />
          <Route path="/singleproduct" element={<SingleProduct />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/productlisting" element={<ProductListing />} />
          <Route path="/order" element={<Order />} />
          <Route path="/return" element={<Return />} />
        </Route>

        
        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/" element={<ProductTable />} /> */}
          <Route path="/add-product" element={<AddProduct />} />
          {/* <Route path="/" element={<NewAddProduct />} /> */}
          <Route path="/" element={<DisplayProductTable />} />
          <Route path="/category" element={<CategoryTable />} />
          <Route path="/coupon" element={<Coupons />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/user" element={<User />} />
          <Route path="/product-table" element={<DisplayProductTable />} />
          <Route path="/order-admin" element={<Orders />} />
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
