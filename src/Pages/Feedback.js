  import React, { useState } from 'react';
  import './Feedback.css';
  import Navbar from '../Components/Navbar'

  const FeedbackForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOptionChange = (e) => {
      setFeedbackType(e.target.value);
      setIsFormVisible(true);
    };

    const handleBackToOptions = () => {
      setIsFormVisible(false);
      setMessage('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();


      const userEmail = localStorage.getItem('userEmail');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
      if (!userEmail || !isLoggedIn) {
        alert('Please log in or sign up to submit feedback.');
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, feedbackType, feedback }),
        });

        if (response.ok) {
          setMessage('Feedback submitted successfully!');
          setEmail('');
          setName('');
          setFeedback('');
          
        } else {
          const errorData = await response.json();
          setMessage(`Error: ${errorData.error}`);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
    };

    return (
      <div>
      <Navbar/>
      <div className="feedback-container">
        
        <div className="feedback-options">
          <h2>What's your Concern?</h2>
          <div className="options">
            <label>
              <input type="radio" value="Website Functionality" checked={feedbackType === 'Website Functionality'} onChange={handleOptionChange} />
              Website Functionality
            </label>
            <label>
              <input type="radio" value="Content" checked={feedbackType === 'Content'} onChange={handleOptionChange} />
              Content
            </label>
            <label>
              <input type="radio" value="User Experience" checked={feedbackType === 'User Experience'} onChange={handleOptionChange} />
              User Experience
            </label>
            <label>
              <input type="radio" value="Product Suggestions" checked={feedbackType === 'Product Suggestions'} onChange={handleOptionChange} />
              Product Suggestions
            </label>
            <label>
              <input type="radio" value="Others" checked={feedbackType === 'Others'} onChange={handleOptionChange} />
              Others
            </label>
          </div>
          
        </div>

        {isFormVisible && (
          <div className="feedback-form-popup">
            <div className="feedback-form">
              <h2>Share your thoughts!</h2>
              {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email (optional):</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Name (optional):</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Feedback:</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    placeholder="Enter your feedback"
                    className="form-control"
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit">Submit Feedback</button>
              </form>
              
            </div>
            <button className="back-btn" onClick={handleBackToOptions}>Back to Options</button>
          </div>
          
        )}
        
      </div>
  
      </div>
    );
  };

  export default FeedbackForm;
