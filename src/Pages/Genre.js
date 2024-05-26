import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './Genre.css';
import books from '../Components/BooksData'; // Importing the array of books
import AddToCart from "../Components/AddCart"

export const Genre = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedGenre === 'All' || book.genre === selectedGenre);
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* Genre Filter */}
  
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="All">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Classic">Classic</option>
            <option value="Fantasy">Fantasy</option>
          </select>

        </div>
        <div className="row">
          {filteredBooks.map(book => (
            <div key={book.id} className="card">
              <img src={book.image} className="card-img-top" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-subtitle">{book.author}</p>
                <AddToCart bookId={book.id} bookPrice={book.price} bookName={book.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genre;
