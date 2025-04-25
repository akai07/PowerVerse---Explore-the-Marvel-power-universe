import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll create this CSS file next

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">PowerVerse</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/explorer" className="nav-link">Explorer</Link>
        </li>
        <li className="nav-item">
          <Link to="/predictor" className="nav-link">Predictor</Link>
        </li>
        <li className="nav-item">
          <Link to="/network" className="nav-link">Network</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;