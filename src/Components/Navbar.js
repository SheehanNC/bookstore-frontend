import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (example)
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    // Redirect to login page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left section */}
        <div className='d-flex'>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link mx-auto" style={{ color: '#333', fontWeight: 'bold' }} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-auto" style={{ color: '#333' , fontWeight: 'bold'}} to="/genres">Genres</Link>
            </li>
            <li className="nav-item mx-auto">
              <Link className="nav-link" style={{ color: '#333' ,fontWeight: 'bold'}} to="/authors">Authors</Link>
            </li>
           
            <li className="nav-item mx-auto">
              <Link className="nav-link" style={{ color: '#333' ,fontWeight: 'bold'}} to="/myorders">My Orders</Link>
            </li>
            <li className="nav-item mx-auto">
              <Link className="nav-link" style={{ color: '#333', fontWeight: 'bold'}} to="/feedback">Add Feedback</Link>
            </li>
          </ul>
        </div>

        {/* Center section */}
        <a className="navbar-brand me-5" href="/" style={{fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic', fontSize: '25px' }}>Novel's Bliss</a>

        {/* Right section */}
        <div className="d-flex">
          {isLoggedIn ? ( // Conditionally render login/logout button
            <button className="btn btn-outline-primary me-3" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              {location.pathname !== '/login' && ( // Only show login button when not on login page
                <Link className="btn btn-outline-primary me-3" to="/login" style={{ fontWeight: 'bold', color: '#007bff', backgroundColor: 'white' }}>Login</Link>
              )}
              {location.pathname !== '/signup' && ( // Only show sign-up button when not on sign-up page
                <Link className="btn btn-primary me-3" to="/signup" style={{ fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff' }}>Sign Up</Link>
              )}
            </>
          )}
          <Link to="/cart" className="btn btn-warning">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
