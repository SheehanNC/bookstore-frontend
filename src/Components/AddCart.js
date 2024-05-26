import React, { useState, useRef, useEffect } from "react";
import "./AddCart.css";

const AddToCart = ({ bookId, bookPrice, bookName }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(bookPrice); // State to manage the quantity
  const dropdownRef = useRef(null);

  useEffect(() => {
    setTotalPrice(bookPrice); // Initialize total price with the default price
  }, [bookPrice]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleAddToCartClick = () => {
    setShowDropdown(!showDropdown); // Show the dropdown when "Add to Cart" is clicked
  };

  const handleQuantityChange = (qty) => {
    setQuantity(qty); // Update the quantity when a value is selected from the dropdown
    console.log(bookPrice)
    setTotalPrice(bookPrice * qty);
  };


  const handleQuantitySubmit = async () => {
    try {
      setIsAddingToCart(true); // Set loading state

      const userEmail = localStorage.getItem("userEmail");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!userEmail || !isLoggedIn) {
        console.error("User not authenticated");
        alert("Please log in or sign up to add to cart.");
        throw new Error("Please log in or sign up to add to cart.");
      }
      

      // Make API request to add item to cart
      const response = await fetch("https://bookstore-backend-uj9d.onrender.com/api/cart-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: bookId,
          bookName: bookName,
          quantity: quantity, // Pass selected quantity
          email: userEmail,
          price: totalPrice
        }),
      });

      if (response.ok) {
        console.log("Item added to cart successfully!");
        console.log("Book Name: ", bookName);
        console.log("quantity: ",quantity);
        console.log("total price: ", totalPrice);
        console.log(userEmail);
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAddingToCart(false); // Reset loading state
      setShowDropdown(false); // Hide the dropdown after submission
    }
  };

  // console.log("bookPrice:", bookPrice);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-success add-to-cart mb-3"
        onClick={handleAddToCartClick}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </button>
      
      {showDropdown && (
        <div className="dropdown-menu" style={{ display: "block" }}>

          {[1, 2, 3, 4, 5].map((qty) => (
            <button
              key={qty}
              className="dropdown-item"
              onClick={() => handleQuantityChange(qty)}
            >
              {qty}
            </button>
          ))}
          <button className="dropdown-item" onClick={handleQuantitySubmit}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
