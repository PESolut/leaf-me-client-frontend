import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// nav bar

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dispensary" className="navbar-button">
        <></>
        Home
      </Link>
      <Link to="/orders" className="navbar-button">
        Orders
      </Link>
      <Link to="/profile" className="navbar-button">
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;
