// AuthorProfile.jsx

import React, { useEffect, useState } from 'react';
import authorsData from './Authors.json';
import Navbar from '../Components/Navbar.js'

import { useParams } from 'react-router-dom';
import './AuthorProfile.css'; // Import the CSS file for styling

const AuthorProfile = () => {
    const { authorName } = useParams(); // Using useParams to get the URL parameters
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        // Find the author from the data based on the authorName parameter
        const selectedAuthor = authorsData.authors.find(author => author.name === authorName);
        setAuthor(selectedAuthor);
    }, [authorName]);

    if (!author) {
        return <div className="author-profile-loading">Loading...</div>; // Apply loading style
    }

    const paragraphs = author.biography.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));

    return (
        <div>
            <Navbar/>
        <div className="author-profile-container mt-5">
            <div className="author-profile-header">
                <h1 className="author-profile-name">{author.name}</h1>
            </div>
            <div className="author-profile-content mt-5">
                <img className="author-profile-photo" src={process.env.PUBLIC_URL + author.photo} alt={author.name} />
                <div className="author-profile-biography">{paragraphs}</div>
                
                
            </div>
        </div>
        </div>
    );
};

export default AuthorProfile;
