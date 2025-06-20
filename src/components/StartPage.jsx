import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/StartPage.css'; // Import CSS

const StartPage = () => (
  <div className="start-page">
    <div className="overlay">
      <div className="container">
        <h2 className="title">Select Your Option</h2>
        <div className="button-group">
          <Link to="/login" className="btn-link">
            <button className="action-btn">Login</button>
          </Link>
          <Link to="/register" className="btn-link">
            <button className="action-btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default StartPage;
