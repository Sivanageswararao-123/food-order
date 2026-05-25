import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  decrementQty,
  removeFromCart,
  clearCart,
} from "./cartSlice";

import {
  applyCoupon,
  removeCoupon,
} from "./couponSlice";

import { addOrder } from "./OrdersSlice";

import {QRCode} from "react-qr-code";

import Swal from "sweetalert2";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import confetti from "canvas-confetti";

import emailjs from "@emailjs/browser";

import "./Cart.css";

function Cart() {
  const cart = useSelector(
    (state) => state.cart.items || []
  );

  const { discount: couponPercent } =
    useSelector(
      (state) =>
        state.couponDetails || {
          discount: 0,
        }
    );

  const dispatch = useDispatch();

  const [couponInput, setCouponInput] =
    useState("");

  const [manualDiscount, setManualDiscount] =
    useState(0);

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  // Coupon Codes
  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME5: 5,
    FESTIVE25: 25,
    SIVA30: 30,
  };

  // EmailJS Init
  useEffect(() => {
    emailjs.init({
      publicKey: "YOUR_PUBLIC_KEY",
    });
  }, []);

  // Total Amount
  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // Discounts
  const couponDiscountAmount =
    (totalAmount * couponPercent) / 100;

  const manualDiscountAmount =
    (totalAmount * manualDiscount) / 100;

  const totalDiscount =
    couponDiscountAmount +
    manualDiscountAmount;

  // Final Amount
  const afterDiscount = Math.max(
    0,
    totalAmount - totalDiscount
  );

  const tax = afterDiscount * 0.05;

  const netAmount = afterDiscount + tax;

  // Reset Cart
  const resetCart = () => {
    dispatch(clearCart());

    dispatch(removeCoupon());

    setCustomerEmail("");

    setPaymentMethod("");

    setManualDiscount(0);

    setCouponInput("");
  };

  // Apply Coupon
  const handleApplyCoupon = () => {
    const code =
      couponInput.trim().toUpperCase();

    if (coupons[code]) {
      dispatch(
        applyCoupon({
          code,
          discount: coupons[code],
        })
      );

      toast.success(
        `Coupon ${code} Applied`
      );

      setCouponInput("");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  // Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      return toast.error("Cart is empty");
    }

    if (
      !customerEmail ||
      !customerEmail.includes("@")
    ) {
      return toast.error(
        "Enter valid email"
      );
    }

    if (!paymentMethod) {
      return toast.error(
        "Select payment method"
      );
    }

    const orderId =
      "ORD-" +
      Math.floor(Math.random() * 1000000);

    const orderData = {
      orderId,
      date: new Date().toLocaleString(),
      items: cart,
      totalPrice: netAmount,
    };

    dispatch(addOrder(orderData));

    const templateParams = {
      email: customerEmail,

      order_id: orderId,

      orders: cart
        .map(
          (item) =>
            `${item.name} x${
              item.quantity
            } = ₹${
              item.price * item.quantity
            }`
        )
        .join("\n"),

      total: netAmount.toFixed(2),
    };

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams
      );

      toast.success(
        "Email Sent Successfully"
      );

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
      console.error(
        "EmailJS Error:",
        error
      );

      toast.error(
        "Email failed - check EmailJS setup"
      );
    }
  };

  return (
    <div className="cart-container">
      <ToastContainer />

      <h1 className="cart-title">
        Your Cart
      </h1>

      <div className="cart-layout">

        {/* LEFT SIDE */}
        <div className="cart-items-section">

          {cart.length === 0 ? (
            <h3>Cart is empty</h3>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="cart-card"
              >

                <img
                  src={item.imageurl}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>

                  <div className="qty-controls">

                    <button
                      onClick={() =>
                        dispatch(
                          decrementQty(
                            item.id
                          )
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          addToCart(item)
                        )
                      }
                    >
                      +
                    </button>

                  </div>
                </div>

                <div>
                  <h3>
                    ₹
                    {item.price *
                      item.quantity}
                  </h3>

                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          item.id
                        )
                      )
                    }
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="summary-card">

          <h2>
            Total ₹
            {netAmount.toFixed(2)}
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            value={customerEmail}
            onChange={(e) =>
              setCustomerEmail(
                e.target.value
              )
            }
          />

          {/* COUPON */}
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponInput}
            onChange={(e) =>
              setCouponInput(
                e.target.value
              )
            }
          />

          <button
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </button>

          {/* MANUAL DISCOUNT */}
          <div className="discount-buttons">

            <button
              onClick={() =>
                setManualDiscount(10)
              }
            >
              10%
            </button>

            <button
              onClick={() =>
                setManualDiscount(20)
              }
            >
              20%
            </button>

            <button
              onClick={() =>
                setManualDiscount(30)
              }
            >
              30%
            </button>

            <button
              onClick={() =>
                setManualDiscount(0)
              }
            >
              Reset
            </button>

          </div>

          {/* PAYMENT */}
          <div className="payment-buttons">

            <button
              onClick={() =>
                setPaymentMethod("qr")
              }
            >
              UPI QR
            </button>

            <button
              onClick={() =>
                setPaymentMethod("card")
              }
            >
              Card
            </button>

          </div>

          {/* QR CODE */}
          {paymentMethod === "qr" && (
            <div className="qr-section">

              <QRCode
                value={`upi://pay?pa=8106870499@ybl&pn=FoodStore&am=${netAmount.toFixed(
                  2
                )}&cu=INR`}
                size={180}
              />

            </div>
          )}

          {/* CHECKOUT */}
          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Cart;