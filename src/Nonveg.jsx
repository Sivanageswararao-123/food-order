import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

// 1. Import the new libraries
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

// 2. Import CSS
import "react-toastify/dist/ReactToastify.css";
import "./Nonveg.css";

function NonVeg() {
  const dispatch = useDispatch();

  const nonvegitems = [
    { id: 1, name: "Chicken Biryani", price: 250, imageurl: "/Images/novg1.jpg", description: "Spicy and flavorful chicken biryani" },
    { id: 2, name: "Mutton Biryani", price: 700, imageurl: "/Images/novg2.jpg", description: "Premium slow-cooked mutton biryani" },
    { id: 3, name: "Fish Fry", price: 300, imageurl: "/Images/novg3.jpg", description: "Crispy fried fresh fish" },
    { id: 4, name: "Chicken Fried Rice", price: 200, imageurl: "/Images/novg4.jpg", description: "Egg & chicken mixed fried rice" },
    { id: 5, name: "Chicken Noodles", price: 180, imageurl: "/Images/novg5.jpg", description: "Spicy street-style chicken noodles" },
    { id: 6, name: "Mutton Keema", price: 150, imageurl: "/Images/novg6.jpg", description: "Rich and savory minced mutton curry" },
    { id: 7, name: "Mutton Kebab", price: 220, imageurl: "/Images/novg7.jpg", description: "Grilled spicy chicken kebabs" },
    { id: 8, name: "Egg Biryani", price: 350, imageurl: "/Images/novg8.jpg", description: "Fragrant rice with spiced boiled eggs" },
    { id: 9, name: "Chicken Pizza", price: 120, imageurl: "/Images/novg9.jpg", description: "Juicy chicken pizza with cheese" },
    { id: 10, name: "Chicken Burger", price: 160, imageurl: "/Images/novg10.jpg", description: "Crispy chicken patty burger" }
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(nonvegitems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = nonvegitems.slice(startIndex, startIndex + itemsPerPage);

  // --- THE NEW HANDLER WITH ALL EFFECTS ---
  const handleAddToCart = (product) => {
    // A. Dispatch to Redux
    dispatch(addToCart(product));

    // B. Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4b2b', '#ff416c', '#ffd700']
    });

    // C. SweetAlert2 Success Popup
    Swal.fire({
      title: 'Delicious Choice!',
      text: `${product.name} is now in your cart.`,
      icon: 'success',
      imageUrl: product.imageurl,
      imageWidth: 200,
      imageHeight: 150,
      imageAlt: product.name,
      timer: 2000,
      showConfirmButton: false,
      background: '#fffaf0',
      color: '#2d3436',
      borderRadius: '25px'
    });

    // D. Optional: Simple Toastify (if you want both)
    toast.info("Item added successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "dark"
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="nonveg-container">
      {/* Container for Toastify */}
      <ToastContainer />
      
      <h1 className="nonveg-title">🍗 Premium Non-Veg</h1>

      <div className="nonveg-grid">
        {currentItems.map((product) => (
          <div key={product.id} className="nonveg-card">
            <img src={product.imageurl} alt={product.name} className="nonveg-image" />
            <h3 className="nonveg-name">{product.name}</h3>
            <p className="nonveg-price">₹{product.price}</p>
            <p className="nonveg-description">{product.description}</p>

            <button
              className="add-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="page-btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => goToPage(i + 1)} className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}>
            {i + 1}
          </button>
        ))}
        <button className="page-btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default NonVeg;