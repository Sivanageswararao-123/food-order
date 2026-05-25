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

// Pages (MUST match exact file names)
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

// Toast
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

/* ---------------- Protected Route ---------------- */
function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

/* ---------------- App Content ---------------- */
function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () =>
      window.removeEventListener("storage", syncUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/home"><FaHome /> Home</Link>
        <Link to="/veg"><FaCarrot /> Veg</Link>
        <Link to="/nonveg"><FaDrumstickBite /> NonVeg</Link>
        <Link to="/drinks"><FaGlassCheers /> Drinks</Link>

        {user ? (
          <>
            <span style={{ color: "white", margin: "0 10px" }}>
              Welcome, {user.name}
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login"><FaKey /> Login</Link>
        )}

        <Link to="/register"><FaUserPlus /> Register</Link>
        <Link to="/cart"><FaShoppingCart /> Cart</Link>
        <Link to="/orders"><FaBox /> Orders</Link>
        <Link to="/about"><FaInfoCircle /> About</Link>
        <Link to="/contactus"><FaPhone /> Contact</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/drinks" element={<Drinks />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
    </>
  );
}

/* ---------------- App Wrapper ---------------- */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;