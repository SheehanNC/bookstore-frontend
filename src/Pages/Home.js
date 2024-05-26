import React from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel';
import Books from '../Components/Books'
export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Carousel/>
        <Books/>
    </div>
  )
}
export default Home;