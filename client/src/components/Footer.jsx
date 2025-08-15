import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';
import logo from '../assets/logo.png';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section: Logo + Name + Home Button */}
        <div className="footer-left">
          <img src={logo} alt="Drivers-Socialize-Networks" className="footer-logo" />
          <h3>Drivers-Socialize-Networks</h3>
          <Link to="/" className="footer-home-link">Home</Link>
        </div>

        {/* Center Section: Address + Contact */}
        <div className="footer-center">
          <p>
            <FaMapMarkerAlt />{' '}
            <a
              href="https://www.google.com/maps/place/Sinnar,+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nashik, Maharashtra, India
            </a>
          </p>
          <p>
            <FaPhoneAlt />{' '}
            <a href="tel:+917219080839">+91 7219080839</a>
          </p>
          <p>
            <FaEnvelope />{' '}
            <a href="mailto:driverssocializenetworks@gmail.com">
              driverssocializenetworks@gmail.com
            </a>
          </p>
        </div>

        {/* Right Section: Social Links */}
        <div className="footer-right">
          <a href="https://x.com/DriversN3400" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          <a href="https://www.facebook.com/people/Drivers-Socialize-Networks/61575241652399/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/drivers_socialize_networks/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com/company/drivers-socialize-networks/?viewAsMember=true" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* Bottom Line */}
      <p className="footer-bottom">
        Copyright © 2025 <strong>Drivers-Socialize-Networks</strong>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
