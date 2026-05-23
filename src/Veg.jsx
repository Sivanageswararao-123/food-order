import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

// 1. Library Imports
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

// 2. Styles
import "react-toastify/dist/ReactToastify.css";
import "./Veg.css";

function Veg() {
  const dispatch = useDispatch();

  const vegitems = [
    { id: 1, name: "Potato", price: 100, imageurl: "/Images/veg1.jpg", description: "Farm-fresh starchy potatoes" },
    { id: 2, name: "Tomato", price: 80, imageurl: "/Images/veg2.jpg", description: "Organic juicy red tomatoes" },
    { id: 3, name: "Carrot", price: 60, imageurl: "/Images/veg3.jpg", description: "Crunchy vitamin-rich carrots" },
    { id: 4, name: "Brinjal", price: 90, imageurl: "/Images/veg4.jpg", description: "Fresh purple eggplants" },
    { id: 5, name: "Cabbage", price: 70, imageurl: "/Images/veg5.jpg", description: "Crispy green cabbage heads" },
    { id: 6, name: "Beans", price: 50, imageurl: "/Images/veg6.jpg", description: "Tender garden green beans" },
    { id: 7, name: "Bitter Gourd", price: 40, imageurl: "/Images/veg7.jpg", description: "Healthy fresh bitter gourd" },
    { id: 8, name: "Beetroot", price: 85, imageurl: "/Images/veg8.jpg", description: "Deep red nutrient-rich beetroot" },
    { id: 9, name: "Spinach", price: 30, imageurl: "/Images/veg9.jpg", description: "Organic leafy green spinach" },
    { id: 10, name: "Onion", price: 95, imageurl: "/Images/veg10.jpg", description: "Premium quality pungent onions" }
  ];

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(vegitems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = vegitems.slice(startIndex, startIndex + itemsPerPage);

  // --- ADD TO CART HANDLER ---
  const handleAddToCart = (product) => {
    // A. Redux Action
    dispatch(addToCart(product));

    // B. Green Confetti Burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#2ecc71', '#27ae60', '#ffffff']
    });

    // C. SweetAlert2 Popup
    Swal.fire({
      title: 'Added to Basket!',
      text: `${product.name} is fresh and ready.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      background: '#f0fff4',
      color: '#1b5e20',
      borderRadius: '20px'
    });

    // D. Toast Notification
    toast.success(`${product.name} added!`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored"
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="veg-container">
      {/* Required for Toastify to render */}
      <ToastContainer />
      
      <h1 className="veg-title">🥦 Fresh Vegetables</h1>

      {/* PRODUCT GRID */}
      <div className="veg-grid">
        {currentItems.map((product) => (
          <div className="veg-card" key={product.id}>
            <img
              src={product.imageurl}
              alt={product.name}
              className="veg-image"
            />

            <h3 className="veg-name">{product.name}</h3>
            <p className="veg-desc">{product.description}</p>
            <h4 className="veg-price">₹{product.price}</h4>

            <button
              className="veg-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Basket
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="veg-pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-nav-btn"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`page-num-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-nav-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Veg;