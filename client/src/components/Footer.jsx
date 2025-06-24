// src/components/Footer.jsx
import React from 'react';
import '../Styles/Footer.css';
import logo from '../assets/logo.png';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <img src={logo} alt="Drivers-Socialize-Networks" />
          <h3>Drivers-Socialize-Networks</h3>
        </div>

        <div className="footer-center">
          <p><FaMapMarkerAlt /> Sinnar, Nashik, Maharashtra</p>
          <p><FaPhoneAlt /> +91 7219080839</p>
          <p><FaEnvelope /> driverssocializenetworks@gmail.com</p>
        </div>

        <div className="footer-right">
          <a href="https://x.com/DriversN3400" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          <a href="https://www.facebook.com/people/Drivers-Socialize-Networks/61575241652399/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/drivers_socialize_networks/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com/company/drivers-socialize-networks/?viewAsMember=true" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        </div>
      </div>

      <p className="footer-bottom">
        © 2025 <strong>Drivers-Socialize-Networks</strong>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
