// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('userType');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/" className="logo-text">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-title">Drivers_Socialize_Networks</span>
        </Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/driver-dashboard">Drivers</Link>}
        {isLoggedIn && <Link to="/customer-dashboard">Customers</Link>}
      </div>

      <div className="nav-actions">
        <Link to="/reviews" className="review-icon-with-label">
          <FaStar className="star-icon" title="Customer Reviews" />
          <span className="review-label">Reviews</span>
        </Link>

        {isLoggedIn && (
          <>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <Link to="/profile" className="profile-icon" title="Profile">
              <FaUserCircle size={24} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
