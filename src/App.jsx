import React, { useState, useEffect } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Drinks from "./Drinks";
import Cart from "./Cart";
import Orders from "./Orders";
import About from "./About";
import Contactus from "./Contactus";
import Register from "./Register";
import Login from "./Login";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import {
  FaHome,
  FaCarrot,
  FaDrumstickBite,
  FaGlassCheers,
  FaShoppingCart,
  FaInfoCircle,
  FaPhone,
  FaKey,
  FaBox,
  FaUserPlus,
} from "react-icons/fa";

/* ---------------- PROTECTED ROUTE ---------------- */
function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

/* ---------------- MAIN CONTENT ---------------- */
function AppContent() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Load user once on start
  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser =
          localStorage.getItem("loggedInUser");

        setUser(
          storedUser
            ? JSON.parse(storedUser)
            : null
        );
      } catch (err) {
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener("storage", syncUser);

    return () =>
      window.removeEventListener(
        "storage",
        syncUser
      );
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedInUser");

    setUser(null);

    navigate("/login");
  };

  return (
    <>
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      {/* NAVBAR */}
      <nav className="navbar">

        <Link to="/home" className="nav-link">
          <FaHome /> Home
        </Link>

        <Link to="/veg" className="nav-link">
          <FaCarrot /> Veg
        </Link>

        <Link to="/nonveg" className="nav-link">
          <FaDrumstickBite /> NonVeg
        </Link>

        <Link to="/drinks" className="nav-link">
          <FaGlassCheers /> Drinks
        </Link>

        {/* AUTH SECTION */}
        {user ? (
          <>
            <span
              style={{
                color: "white",
                margin: "0 10px",
              }}
            >
              Welcome, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="nav-link"
          >
            <FaKey /> Login
          </Link>
        )}

        <Link
          to="/register"
          className="nav-link"
        >
          <FaUserPlus /> Register
        </Link>

        <Link
          to="/cart"
          className="nav-link cart-link"
        >
          <FaShoppingCart /> Cart
        </Link>

        <Link
          to="/orders"
          className="nav-link cart-link"
        >
          <FaBox /> Orders
        </Link>

        <Link
          to="/about"
          className="nav-link"
        >
          <FaInfoCircle /> About
        </Link>

        <Link
          to="/contactus"
          className="nav-link"
        >
          <FaPhone /> ContactUs
        </Link>

      </nav>

      {/* ROUTES */}
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={<Navigate to="/home" />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <Login />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <Register />
            )
          }
        />

        {/* PUBLIC ROUTES */}
        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/veg"
          element={<Veg />}
        />

        <Route
          path="/nonveg"
          element={<Nonveg />}
        />

        <Route
          path="/drinks"
          element={<Drinks />}
        />

        {/* PROTECTED CART */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ORDERS */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* OTHER ROUTES */}
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contactus"
          element={<Contactus />}
        />

      </Routes>
    </>
  );
}

/* ---------------- APP WRAPPER ---------------- */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;