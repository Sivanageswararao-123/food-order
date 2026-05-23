// src/components/Orders.jsx

import React from "react";

import { useSelector } from "react-redux";

function Orders() {

  // Read orders from Redux store
  const orders = useSelector(
    (state) => state.orders || []
  );

  console.log(orders);

  return (
    <div>

      <h1>Your Order History</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <ol>

          {orders.map((order) => (
            <li key={order.orderId}>

              <p>
                <strong>Order ID:</strong>
                {" "}
                {order.orderId}
              </p>

              <p>
                <strong>Date:</strong>
                {" "}
                {order.date}
              </p>

              <h3>Items:</h3>

              <ul>
                {order.items.map(
                  (item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.name}
                      {" "}
                      - $
                      {item.price}
                      {" "}
                      ×
                      {" "}
                      {item.quantity}
                    </li>
                  )
                )}
              </ul>

              <p>
                <strong>Total Amount:</strong>
                {" "}
                $
                {order.totalPrice.toFixed(2)}
              </p>

              <hr />

            </li>
          ))}

        </ol>
      )}

    </div>
  );
}

export default Orders;