import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Cart.css";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {

      const userId = localStorage.getItem("userData");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      // Check if user is logged in
      if (!userId || !isLoggedIn) {
        console.error("User not authenticated");
        //alert("Please log in or sign up to view your cart.");
        throw new Error("Please log in or sign up to view your cart.");
      }

      setIsLoading(true);
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch(`https://bookstore-backend-uj9d.onrender.com/api/cart-items/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        console.log(userEmail);
        setCartItems(data);
      } else {
        throw new Error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle checkout
  const handleCheckout = async (_id) => {
    try {
    
      const response = await fetch(`https://bookstore-backend-uj9d.onrender.com/api/checkout/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
       
      });
      if (response.ok) {
        // Remove the checked-out item from cart items
        setCartItems(cartItems.filter(item => item._id !== _id));
        alert("Item checked out successfully");
      } else {
        throw new Error("Failed to checkout item");
      }
    } catch (error) {
      console.error("Error checking out item:", error);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch(`https://bookstore-backend-uj9d.onrender.com/api/cart-items/${userEmail}`, {
        method: "DELETE"
      });
      if (response.ok) {
        // Clear the cart items in the state
        setCartItems([]);
        alert("Cart emptied successfully");
      } else {
        throw new Error("Failed to empty cart");
      }
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  };

  return (
    <div className="cart-container">
      <Navbar />
      <h1 className="cart-header">Where dreams become purchases!</h1>
      {isLoading ? (
        <p style = {{fontFamily: "Times New Roman"}}>Loading your Cart Items, please wait!</p>
      ) : (
        <>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th> {/* Add new table heading for action */}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.bookId}>
                <td>{item.bookName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-success  "
                    onClick={() => handleCheckout(item._id)}
                  >
                    Checkout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <br></br>
         
        </table>
         <button className="btn btn-danger" onClick={handleEmptyCart}>
         Empty Cart!
       </button>
     </>
      )}
       
    </div>
  );
};

export default CartComponent;
