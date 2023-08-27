import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import Furniture from "../components/Product/Furniture";
import AdminRequireAuth from "../hoc/AdminRequireAuth";
import AdminDshboardPage from "./AdminPage/AdminDshboardPage";
import AdminLogin from "./AdminPage/AdminLogin";
import AdminShowCart from "./AdminPage/AdminShowCart";
import AdminShowProduct from "./AdminPage/AdminShowProduct";
import AdminShowUser from "./AdminPage/AdminShowUser";
import AdminSignup from "../components/pages/AdminSignup/AdminSignup";
import Homepage from "../components/Homepage/Homepage";
import AdminAddPoductPage from "./AdminPage/AdminAddPoductPage";
import Groceries from "../components/Product/Groceries";
import Liquor from "../components/Product/Liquor";
import Homeappliances from "../components/Product/HomeAppliances";
import Vape from "../components/Product/Vape";
import PageNotFound from "../components/Product/404";
import Cart from "../components/pages/Cart/Cart";
import Stickers from "../components/Product/Stickers";
import SingleProduct from "../components/Product/SingleProduct";
import AdminUpdateProduct from "./AdminPage/AdminUpdateProduct";
import LargeWithAppLinksAndSocial from "../components/pages/Footer/Footer";
import HomeNavbar from "../components/HomeNavbar/HomeNavbar";
// import UserRequireAuth from "../hoc/UserRequireAuth";
import CreditCard from "../components/Card/CreditCard";
import Address from "../components/pages/Address/Address";
import Whislist from "../components/pages/Wishlist/Whislist";
import Orderfood from "../components/Product/Orderfood"
import AllProducts from "../components/Product/AllProducts";
import AdminShowOrders from "./AdminPage/AdminShowOrders";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HomeNavbar />
            <Homepage />
            <LargeWithAppLinksAndSocial />
          </>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <>
            <HomeNavbar />
            <Login />
            <LargeWithAppLinksAndSocial />
          </>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <>
            <HomeNavbar />
            <Signup />
            <LargeWithAppLinksAndSocial />
          </>
        }
      ></Route>
      <Route
        path="/admin-login"
        element={
          <>
            <HomeNavbar />
            <AdminLogin />
            <LargeWithAppLinksAndSocial />
          </>
        }
      ></Route>
      <Route
        path="/AdminSignUp"
        element={
          <>
            <HomeNavbar />
            <AdminSignup />
            <LargeWithAppLinksAndSocial />
          </>
        }
      ></Route>
      <Route
        path="/AllProducts"
        element={
          <>
            <HomeNavbar />
            <AllProducts />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/Furniture"
        element={
          <>
            <HomeNavbar />
            <Furniture />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/Orderfood"
        element={
          <>
            <HomeNavbar />
            <Orderfood />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/Groceries"
        element={
          <>
            <HomeNavbar />
            <Groceries />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/card"
        element={
          <>
            <HomeNavbar />
            <CreditCard />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/address"
        element={
          <>
            <HomeNavbar />
            <Address />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />

      <Route
        path="/Liquor"
        element={
          <>
            <HomeNavbar />
            <Liquor />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/Homeappliances"
        element={
          <>
            <HomeNavbar />
            <Homeappliances />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/Vape"
        element={
          <>
            <HomeNavbar />
            <Vape />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/cart"
        element={
          <>
            <HomeNavbar />
            <Cart />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/wishlist"
        element={
          <>
            <HomeNavbar />
            <Whislist />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/Stickers"
        element={
          <>
            <HomeNavbar />
            <Stickers />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route
        path="/products/:id"
        element={
          <>
            <HomeNavbar />
            <SingleProduct />
            <LargeWithAppLinksAndSocial />
          </>
        }
      />
      <Route path="*" element={<PageNotFound />} />

      <Route
        path="/admin"
        element={
          <AdminRequireAuth>
            <AdminDshboardPage />
          </AdminRequireAuth>
        }
      />
      <Route
        path="/admin/product"
        element={
          <AdminRequireAuth>
            <AdminShowProduct />
          </AdminRequireAuth>
        }
      />
      <Route
        path="/admin/user"
        element={
          <AdminRequireAuth>
            <AdminShowUser />
          </AdminRequireAuth>
        }
      />
      <Route
        path="/admin/cart"
        element={
          <AdminRequireAuth>
            <AdminShowCart />
          </AdminRequireAuth>
        }
      />
            <Route
        path="/admin/orders"
        element={
          <AdminRequireAuth>
            <AdminShowOrders />
          </AdminRequireAuth>
        }
      />
      <Route
        path="/admin/addProduct"
        element={
          <AdminRequireAuth>
            <AdminAddPoductPage />
          </AdminRequireAuth>
        }
      ></Route>
      <Route
        path="/admin/update/:id"
        element={
          <AdminRequireAuth>
            <AdminUpdateProduct />
          </AdminRequireAuth>
        }
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
