import React from 'react';
import thriller from '../Media/thriller.jpg';
import mountains_snow from '../Media/mountains_snow.jpg'
import cartoon from '../Media/cartoon.jpg'
import romance from '../Media/romance.jpg'
import nature from '../Media/nature.jpg'

const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval = "5000">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div className="carousel-inner" style = {{maxHeight:'750px'}}>
        <div div className="carousel-item active">
          <img src={nature} className="d-block w-100" alt="Thriller" style={{ maxHeight: '1200px', objectFit: "cover"}} />
        </div>
        <div className="carousel-item">
          <img src={cartoon} className="d-block w-100" alt="Cartoon" />
        </div>
        <div className="carousel-item">
          <img src={romance} className="d-block w-100" alt="Romance" style={{ maxHeight: '1100px', objectFit: "cover" }} />
        </div>
        <div className="carousel-item">
          <img src={mountains_snow} className="d-block w-100" alt="Mountains Snow" style={{ maxHeight: '1100px'}}/>
        </div>
        <div className="carousel-item">
          <img src={thriller} className="d-block w-400" alt="Mountains Snow" style={{ maxHeight: '1400px',  objectFit: "cover" }}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
