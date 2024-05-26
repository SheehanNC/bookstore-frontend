import React, {useState} from 'react';
import loginImage from '../Media/login-image.jpg'; // Import your login image
import {Link, useNavigate} from 'react-router-dom';

import './Login.css';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://bookstore-backend-uj9d.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Login successful, optionally redirect the user to another page
      const userData = await response.json();

      localStorage.setItem('userData', userData.userData.userId);
      console.log(userData.userData.userId);
      localStorage.setItem('userEmail', userData.userData.userEmail);
      // console.log(userData.userData.userEmail);
      console.log('Login successful!');
      alert("Login Successfull!")

      localStorage.setItem('isLoggedIn', true);
      
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      setErrorMessage(error.message);
    }
};

  

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-lg-8 p-0">
          {/* Background image */}
          <img src={loginImage} alt="Login" className="img-fluid" style={{ objectFit: 'cover', height: '100vh', width: '100%' }} />
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-center" style = {{backgroundColor: "black"}}>
          {/* Login form */}
          <div className="login-form p-4">
            <h2 className="mb-4 text-light" style = {{fontFamily:"cursive"}}>Embark on your Literary Journey!</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message if exists */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-light">
                <label htmlFor="email" className="form-label" style = {{fontFamily:"cursive"}}>Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-4 text-light">
                <label htmlFor="password" className="form-label" style = {{fontFamily:"cursive"}}>Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
            <div className="text-center mt-3 text-light" style = {{fontFamily:"cursive"}}>
              <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
            <Link to="/" className="btn btn-light mt-3">Return Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
