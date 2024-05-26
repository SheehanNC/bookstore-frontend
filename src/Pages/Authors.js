import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import books from '../Components/BooksData2';
import "./Authors.css";
import AddToCart from "../Components/AddCart";

export const Authors = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('All');
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleAuthorChange = (event) => {
      setSelectedAuthor(event.target.value);
    };
  
    const filteredBooks = books.filter(book => {
      return book.author.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedAuthor === 'All' || book.author === selectedAuthor);
    });
  


  return (
    <div>
      <Navbar />
      <div className="container">
        <div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by author..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* Genre Filter */}
  
          <select value={selectedAuthor} onChange={handleAuthorChange}>
            <option value="All">All Authors</option>
            <option value="Dan Brown">Dan Brown</option>
            <option value="Nicholas Sparks">Nicholas Sparks</option>
            <option value="Bram Stroker">Bram Stroker</option>
            <option value="Stephenie Meyer">Stephenie Meyer</option>
            <option value="George Orwell">George Orwell</option>
            <option value="Harper Lee">Harper Lee</option>
            <option value="C.S Lewis">C.S Lewis</option>
            <option value="Mary Shelley">Mary Shelley</option>
            <option value="F. Scott Fitzgerald">F. Scott Fitzgerald</option>
            <option value="Jane Austen">Jane Austen</option>
            <option value="Gillian Flynn">Gillian Flynn</option>
            <option value="Alex Michaelides">Alex Michaelides</option>
            
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
                <Link to={`/authors/${book.author}`} className="btn btn-dark btn-sm">
                  View Author Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Authors;