import React, {useState, useEffect} from 'react';
import signupImage from '../Media/Sign-up.jpg'; // Import your signup image
import {Link, useNavigate} from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    setErrorMessage('');
  }, [email, password, confirmPassword]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match!')
        throw new Error('Passwords do not match');
        
      }
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });



      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        throw new Error(errorData.error);
      }

      const userData = await response.json();
      localStorage.setItem('userData', userData.newUser._id);
      localStorage.setItem('userEmail', userData.newUser.userEmail);
      localStorage.setItem('isLoggedIn', true);
      console.log(userData);

    console.log('Sign up successful!')
    alert('Sign up successful!'); 
    navigate('/');

    } 
    catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-lg-8 p-0">
          {/* Background image */}
          <img src={signupImage} alt="Signup" className="img-fluid" style={{ objectFit: 'cover', height: '100vh', width: '100%' }} />
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: "black" }}>
          {/* Signup form */}
          <div className="signup-form p-4">
            <h2 className="mb-4 text-light" style={{ fontFamily: "cursive" }}>Unlock Your World Of Stories!</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message if exists */}
             <form onSubmit={handleSubmit}>
              {/*email*/}
              <div className="mb-3 text-light">
                <label htmlFor="email" className="form-label" style={{ fontFamily: "cursive" }}>Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {/*password*/}
              <div className="mb-3 text-light">
                <label htmlFor="password" className="form-label" style={{ fontFamily: "cursive" }}>Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {/*confirm*/}
              <div className="mb-3 text-light">
                <label htmlFor="confirm-password" className="form-label" style={{ fontFamily: "cursive" }}>Confirm Password</label>
                <input type="password" className="form-control" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <div className="text-center mt-3 text-light" style={{ fontFamily: "cursive" }}>
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
            <Link to="/" className="btn btn-light mt-3">Return Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
