import React from "react";
import "./Contactus.css";

function Contactus() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p className="subtitle">
          We are always here to help you with your orders and queries.
        </p>

        <div className="contact-item">
          <span>📍</span>
          <div>
            <h3>Location</h3>
            <p>Food Paradise Restaurant, Andhra Pradesh</p>
          </div>
        </div>

        <div className="contact-item">
          <span>📞</span>
          <div>
            <h3>Phone</h3>
            <a href="tel:+918106870499">+91 8106870499</a>
          </div>
        </div>

        <div className="contact-item">
          <span>✉️</span>
          <div>
            <h3>Email</h3>
            <a href="mailto:sivanagewar555@gmail.com">
              sivanagewar555@gmail.com
            </a>
          </div>
        </div>

        <div className="contact-item">
          <span>🕒</span>
          <div>
            <h3>Timing</h3>
            <p>10:00 AM - 11:00 PM (All Days Open)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;