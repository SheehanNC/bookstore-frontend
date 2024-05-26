
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Genre from './Pages/Genre';
import Price from './Pages/Feedback';
import Orders from './Carts&Orders/Orders';
import Authors from './Pages/Authors';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Cart from './Carts&Orders/Cart'
import AuthorProfile from './Pages/AuthorProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/authors" element={<Authors/>} />
          <Route path="/genres" element={<Genre/>} />
          <Route path="/myorders" element={<Orders/>} />
          <Route path="/feedback" element={<Price/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/authors/:authorName" element ={<AuthorProfile/>} /> 
        </Routes>
      </Router>

    </div>
  );
}

export default App;
