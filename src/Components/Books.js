import React, { useState, useEffect } from "react";
import "./Books.css";
import description from "./Description.json";
import booksData from "../Components/BooksData";
import AddToCart from "./AddCart";

const Books = () => {
  // Dummy data for books (replace with actual data from backend)
  const [books, setBooks] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const updatedBooks = await Promise.all(
          books.map(async (book) => {
            const response = await fetch(`https://bookstore-backend-uj9d.onrender.com/api/ratings/${book.id}`);
            const data = await response.json();
            return { ...book, rating: parseFloat(data.averageRating).toFixed(1) || 0 };
          })
        );
        setBooks(updatedBooks);
      } catch (error) {
        console.error("Error fetching book ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  useEffect(() => {
    // Fetch additional book details when selectedBook changes
    const fetchBookDetails = async () => {
      if (selectedBook) {
        try {
          // Accessing data directly from the imported description object
          const data = description.find(
            (book) => book.title === selectedBook.title
          );
          setBookDetails(data);
          
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      }
    };

    fetchBookDetails();
  }, [selectedBook]);

  // Function to handle click on book card
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  //Function to handle rating change
  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value));
  };


  

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the user ID from local storage or application state
      const userId = localStorage.getItem("userData");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      // Check if user is logged in
      if (!userId || !isLoggedIn) {
        console.error("User not authenticated");
        alert("Please log in or sign up to add a rating.");
        throw new Error("Please log in or sign up to add a rating.");
      }

      // Submit the rating
      const response = await fetch("https://bookstore-backend-uj9d.onrender.com/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: selectedBook.id, // Assuming you have bookId available in selectedBook
          userId: userId, // Use the retrieved user ID
          rating: selectedRating,
        }),
      });
      if (response.ok) {
        console.log("Rating submitted successfully");

        // Fetch the updated rating for the selected book
        const updatedRatingResponse = await fetch(
          `https://bookstore-backend-uj9d.onrender.com/api/ratings/${selectedBook.id}`
        );
        const updatedRatingData = await updatedRatingResponse.json();

        const formattedRating = parseFloat(
          updatedRatingData.averageRating
        ).toFixed(1);
        // Update the rating of the selected book in the state
        setBooks((prevBooks) =>
          prevBooks.map((book) => {
            if (book.id === selectedBook.id) {
              return {
                ...book,
                rating: formattedRating,
              };
            }
            return book;
          })
        );

        const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
        storedRatings[selectedBook.id.toString()] =
          updatedRatingData.averageRating;
        localStorage.setItem("ratings", JSON.stringify(storedRatings));
      } else {
        console.error("Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // useEffect(() => {
  //   const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
  //   const updatedBooks = books.map((book) => {
  //     // const rating = storedRatings[book.id.toString()] || 0;
  //     const rating = storedRatings[book.id.toString()] !== undefined ? storedRatings[book.id.toString()] : 0;

  //     return { ...book, rating: rating };
  //   });
  //   setBooks(updatedBooks);
  // }, []);

  // Sort books based on rating (descending order)
  const sortedBooks = books.sort((a, b) => b.rating - a.rating);

  // Divide books into three shelves based on ratings
  const topRatedBooks = sortedBooks.filter((book) => book.rating >= 4);
  const midRatedBooks = sortedBooks.filter(
    (book) => book.rating >= 3 && book.rating < 4
  );
  const lowRatedBooks = sortedBooks.filter((book) => book.rating < 3);

  return (
    <div className="container">
      {selectedBook && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header">
                <h5 className="modal-title">{selectedBook.title}</h5>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button> 
              </div>
              <div className="modal-body">
                {bookDetails && (
                  <div>
                    <p><strong>Summary:</strong>  {bookDetails.summary}</p>
                    <p><strong>Price: </strong> ${bookDetails.price}</p>
                  </div>
                )}
                <form>
                  <div className="form-group">
                    <label htmlFor="ratingSelect">Add Rating:</label>

                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= selectedRating ? "star selected" : "star"
                          }
                          onClick={() =>
                            handleRatingChange({ target: { value: star } })
                          }
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleSubmitRating}
                    disabled={selectedRating === 0} // Disable button if rating is not selected
                  >
                    Submit Rating
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Rated Shelf */}

      <h2 className="mt-4 mb-3" style={{ fontFamily: "cursive" }}>
        Top-rated books
      </h2>

      <div className="row">
        <div className="col">
          <div className="d-flex flex-wrap">
            {topRatedBooks.map((book, index) => (
              <div key={index} className="card m-2">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.author}
                  </h6>
                  <p className="card-text">Average Rating: {book.rating}</p>
                  {/* <button className="btn btn-success add-to-cart mb-3">
                    Add to Cart
                  </button> */}
                 
                  <AddToCart bookId={book.id} bookPrice={book.price} bookName={book.title}/>
                 
                  
                  <button
                    className="btn btn-dark view-details"
                    onClick={() => handleBookClick(book)}
                  >
                    <i className="fa fa-eye"></i> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="shelf"></div>
        </div>
      </div>

      {/* Mid Rated Shelf */}

      <h2 className="mt-4 mb-3" style={{ fontFamily: "cursive" }}>
        Mid-rated books
      </h2>

      <div className="row mt-4">
        <div className="col">
          <div className="d-flex flex-wrap">
            {midRatedBooks.map((book, index) => (
              <div key={index} className="card m-2">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.author}
                  </h6>
                  <p className="card-text">Average Rating: {book.rating}</p>
                  <AddToCart bookId={book.id} bookPrice={book.price} bookName={book.title}/>
                  <button
                    className="btn btn-dark view-details"
                    onClick={() => handleBookClick(book)}
                  >
                    <i className="fa fa-eye"></i> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="shelf"></div>
        </div>
      </div>

      {/* Low Rated Shelf */}
      <h2 className="mt-4 mb-3" style={{ fontFamily: "cursive" }}>
        Low-rated books
      </h2>

      <div className="row mt-4 mb-5">
        <div className="col">
          <div className="d-flex flex-wrap">
            {lowRatedBooks.map((book, index) => (
              <div key={index} className="card m-2">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.author}
                  </h6>
                  <p className="card-text">Average Rating: {book.rating}</p>
                 <AddToCart bookId={book.id} bookPrice={book.price} bookName={book.title}/>
                  <button
                    className="btn btn-dark view-details"
                    onClick={() => handleBookClick(book)}
                  >
                    <i className="fa fa-eye"></i> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="shelf"></div>
        </div>
      </div>
    </div>
  );
};

export default Books;
