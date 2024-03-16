import React from "react";
import Header from "./pages/includes/Header";
import "bootstrap/dist/css/bootstrap.css";
import Signup from "./pages/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/login/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/authContext";
import PublicRoute from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/passwordReset/ForgotPassword";
import Profile from "./pages/myProfile/Profile";
import Activity from "./pages/myActivity/components/Activity";
import UserLanding from "./pages/userLanding/UserLanding";
import MyProducts from "./pages/farmer/MyProducts";
import AddProduct from "./pages/farmer/AddProduct";
import EditProduct from "./pages/farmer/EditProduct";
import Cart from "./pages/cart/Cart";
import { Provider } from 'react-redux';
import { store } from "./redux/store";

function App() {
  const { auth } = React.useContext(AuthContext);
  console.log(auth, "Amy Auth Context");

  return (
    <Provider store={store}>
   <div className="">
      <Header />
      <Routes>
        <Route
          path="signup"
          element={
            <PublicRoute auth={auth}>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute auth={auth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="viewCart"
          element={
            <ProtectedRoute auth={auth}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="myProducts"
          element={
            <ProtectedRoute auth={auth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="addProduct"
          element={
            <ProtectedRoute auth={auth}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProduct/:productId"
          element={
            <ProtectedRoute auth={auth}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute auth={auth}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute auth={auth}>
              {/* <Index /> */}
              <UserLanding />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute auth={auth}>
              <Index />
            </PublicRoute>
          }
        />
        <Route
          path="forgotPassword"
          element={
            <PublicRoute auth={auth}>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="myActivity"
          element={
            <ProtectedRoute auth={auth}>
              <Activity />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>

</Provider>
 
  );
}

export default App;
