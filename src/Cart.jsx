import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  decrementQty,
  removeFromCart,
  clearCart,
} from "./cartSlice";

import { applyCoupon, removeCoupon } from "./couponSlice";
import { addOrder } from "./OrdersSlice";

import { QRCode } from "react-qr-code";

import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

import "./Cart.css";

// ✅ INIT EMAILJS (IMPORTANT FIX)
emailjs.init("lGa9xHdLfX6r-3hI0");

function Cart() {
  const cart = useSelector((state) => state.cart.items || []);

  const { discount: couponPercent } = useSelector(
    (state) => state.couponDetails || { discount: 0 }
  );

  const dispatch = useDispatch();

  const [couponInput, setCouponInput] = useState("");
  const [manualDiscount, setManualDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME5: 5,
    FESTIVE25: 25,
    SIVA30: 30,
  };

  // TOTAL
  const totalAmount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const couponDiscountAmount = (totalAmount * couponPercent) / 100;
  const manualDiscountAmount = (totalAmount * manualDiscount) / 100;

  const totalDiscount = couponDiscountAmount + manualDiscountAmount;

  const afterDiscount = Math.max(0, totalAmount - totalDiscount);

  const tax = afterDiscount * 0.05;
  const netAmount = afterDiscount + tax;

  // RESET
  const resetCart = () => {
    dispatch(clearCart());
    dispatch(removeCoupon());

    setCustomerEmail("");
    setPaymentMethod("");
    setManualDiscount(0);
    setCouponInput("");
  };

  // APPLY COUPON
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (coupons[code]) {
      dispatch(applyCoupon({ code, discount: coupons[code] }));
      toast.success(`Coupon ${code} Applied`);
      setCouponInput("");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  // CHECKOUT + EMAIL (FIXED)
  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");
    if (!customerEmail) return toast.error("Enter email");
    if (!paymentMethod) return toast.error("Select payment method");

    const orderId = "ORD-" + Math.floor(Math.random() * 1000000);

    const orderData = {
      orderId,
      date: new Date().toLocaleString(),
      items: cart,
      totalPrice: netAmount,
    };

    dispatch(addOrder(orderData));

    // ✅ FIXED EMAIL FORMAT
    const templateParams = {
      email: customerEmail,
      order_id: orderId,
      orders: cart
        .map(
          (item) =>
            `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
        )
        .join("\n"),
      total: netAmount.toFixed(2),
    };

    try {
      await emailjs.send(
        "service_uoch40a",
        "template_xyz123",
        templateParams
      );

      toast.success("Email Sent Successfully");

      confetti({
        particleCount: 200,
        spread: 100,
      });

      Swal.fire({
        title: "Order Placed!",
        text: "Check your email 🎉",
        icon: "success",
      });

      resetCart();
    } catch (error) {
      console.log("EmailJS Error:", error);
      toast.error("Email failed - check EmailJS setup");
    }
  };

  return (
    <div className="cart-container">
      <ToastContainer />

      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-layout">

        {/* LEFT SIDE */}
        <div className="cart-items-section">
          {cart.length === 0 ? (
            <h3>Cart is empty</h3>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.imageurl} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>

                  <div className="qty-controls">
                    <button onClick={() => dispatch(decrementQty(item.id))}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => dispatch(addToCart(item))}>
                      +
                    </button>
                  </div>
                </div>

                <div>
                  ₹{item.price * item.quantity}

                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="summary-card">
          <h2>Total ₹{netAmount.toFixed(2)}</h2>

          <input
            type="email"
            placeholder="Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />

          <button onClick={handleApplyCoupon}>Apply Coupon</button>

          {/* DISCOUNT */}
          <div>
            <button onClick={() => setManualDiscount(10)}>10%</button>
            <button onClick={() => setManualDiscount(20)}>20%</button>
            <button onClick={() => setManualDiscount(30)}>30%</button>
            <button onClick={() => setManualDiscount(0)}>Reset</button>
          </div>

          {/* PAYMENT */}
          <div>
            <button onClick={() => setPaymentMethod("qr")}>
              UPI QR
            </button>
            <button onClick={() => setPaymentMethod("card")}>
              Card
            </button>
          </div>

          {paymentMethod === "qr" && (
            <QRCode
              value={`upi://pay?pa=8106870499@ybl&pn=FoodStore&am=${netAmount.toFixed(
                2
              )}&cu=INR`}
              size={160}
            />
          )}

          <button onClick={handleCheckout}>Checkout</button>
        </div>

      </div>
    </div>
  );
}

export default Cart;