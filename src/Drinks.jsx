import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

// Library Imports
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

// Style Imports
import "react-toastify/dist/ReactToastify.css";
import "./Drinks.css";

function Drinks() {
  const dispatch = useDispatch();

  // Corrected and polished data
  const drinkitems = [
    { id: 1, name: "Sprite", price: 40, imageurl: "/Images/drink1.jpg", description: "Clear, refreshing lemon-lime soda" },
    { id: 2, name: "Coca Cola", price: 40, imageurl: "/Images/drink2.jpg", description: "Classic carbonated cold drink" },
    { id: 3, name: "Maaza", price: 45, imageurl: "/Images/drink3.jpg", description: "Indulgent Alphonso mango fruit drink" },
    { id: 4, name: "Pepsi", price: 45, imageurl: "/Images/drink4.jpg", description: "Refreshing cola with a bold taste" },
    { id: 5, name: "Mirinda", price: 40, imageurl: "/Images/drink5.jpg", description: "Vibrant orange flavor with bubbles" },
    { id: 6, name: "Water Melon", price: 50, imageurl: "/Images/drink6.jpg", description: "Freshly pressed watermelon juice" },
    { id: 7, name: "Pineapple", price: 50, imageurl: "/Images/drink7.jpg", description: "Sweet and tangy tropical pineapple" },
    { id: 8, name: "Sappota", price: 45, imageurl: "/Images/drink8.jpg", description: "Creamy and natural sapodilla shake" },
    { id: 9, name: "Beetroot Juice", price: 120, imageurl: "/Images/drink9.jpg", description: "Healthy, nutrient-packed energy drink" },
    { id: 10, name: "Lemon Juice", price: 45, imageurl: "/Images/drink10.jpg", description: "Zesty chilled lemonade" }
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(drinkitems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = drinkitems.slice(startIndex, startIndex + itemsPerPage);

  // --- Handlers ---

  const handleAddToCart = (product) => {
    // 1. Redux Action
    dispatch(addToCart(product));

    // 2. Trigger "Cool Blue" Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#0ea5e9', '#2dd4bf', '#ffffff']
    });

    // 3. SweetAlert2 Success Popup
    Swal.fire({
      title: 'Stay Refreshed!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      imageUrl: product.imageurl,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: product.name,
      timer: 1500,
      showConfirmButton: false,
      background: '#f0f9ff',
      color: '#0369a1',
      borderRadius: '25px'
    });

    // 4. Toastify Notification (optional backup)
    toast.info(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "colored"
    });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="drinks-container">
      {/* ToastContainer must be rendered once */}
      <ToastContainer />
      
      <h1 className="drinks-title">🥤 Refreshing Drinks</h1>

      <div className="drinks-grid">
        {currentItems.map((product) => (
          <div key={product.id} className="drinks-card">
            <div className="image-wrapper">
              <img 
                src={product.imageurl} 
                alt={product.name} 
                className="drinks-image" 
              />
            </div>

            <h3 className="drinks-name">{product.name}</h3>
            <p className="drinks-price">₹{product.price}</p>
            <p className="drinks-description">{product.description}</p>

            <button
              className="add-cart-btn-drinks"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Drinks;