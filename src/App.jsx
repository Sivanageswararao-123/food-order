import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Drinks from "./Drinks";
import Cart from "./Cart";
import About from "./About";
import Contactus from "./Contactus";
import Login from "./Login";
import Register from "./Register";
import Orders from "./Orders";

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
  FaBox
} from "react-icons/fa";

function App() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  let logout = () => {

    // Remove logged in user
    localStorage.removeItem("loggedInUser");

    // Refresh page
    window.location.reload();
  }
  return (
    <BrowserRouter>

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

        <Link to="/" className="nav-link">
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

        {
	  user ? (
		<>
		  <span style={{color:"white"}}>Welcome,{user.name}</span>
		  <button onClick={logout}>Logout</button>
		</>
	  ) : (
		<Link to="/" className="nav-link">
          <FaKey /> Login
        </Link>
	  )
	}

        

        <Link to="/register" className="nav-link">
          <FaKey /> Register
        </Link>

        {/* CART */}
        <Link to="/cart" className="nav-link cart-link">
          <FaShoppingCart /> Cart
        </Link>

        {/* ORDERS */}
        <Link to="/orders" className="nav-link cart-link">
          <FaBox /> Orders
        </Link>

        <Link to="/about" className="nav-link">
          <FaInfoCircle /> About
        </Link>

        <Link to="/contactus" className="nav-link">
          <FaPhone /> ContactUs
        </Link>

      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;