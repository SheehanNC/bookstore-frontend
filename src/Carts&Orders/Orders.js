import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Orders.css";

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userData");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      // Check if user is logged in
      if (!userId || !isLoggedIn) {
        console.error("User not authenticated");
        throw new Error("Please log in or sign up to view your orders.");
      }

      setIsLoading(true);
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch(`http://localhost:4000/api/orders/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    } else {
      // Format date as desired (e.g., "MM/DD/YYYY HH:MM:SS")
      const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };
      return date.toLocaleString("en-US", options);
    }
  };

  return (
    <div className="orders-container">
      <Navbar />
      <h1 className="orders-header">Your Order History</h1>
      {isLoading ? (
        <p style={{ fontFamily: "Times New Roman" }}>Loading your orders, please wait!</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p style={{ fontFamily: "Times New Roman" }}>You have no orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3>Order Date: {formatDate(order.createdAt)}</h3>
                <div className="order-details">
                  <p><strong>Book Name:</strong> {order.bookName}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Price:</strong> ${(order.price / order.quantity).toFixed(2)}</p>
                  <p><strong>Total Price:</strong> ${order.price}</p>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default OrdersComponent;
