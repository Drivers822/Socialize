import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';
import { FaWhatsapp } from 'react-icons/fa';

import taxiIllustration from '../assets/hero-img copy.png';
import bookedIllustration from '../assets/hero-bg-2.jpg';
import About from './About';
import WhyUs from './WhyUs';
import CoreFeatures from './CoreFeatures';
import Gallery from './Gallery';
import Team from './Team';
import Pricing from './Pricing';
import Contacts from './Contacts';
import Footer from './Footer';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="light-text">On-Demand Driver Services<br />with </span>
            <span className="highlight">Trust & Convenience</span>
          </h1>
          <p className="sub-text">
            Your ride is just a few taps away. Trustworthy drivers, smooth rides.
          </p>
          <p className="sub-text">
            Start your journey with our trusted driver network — seamless, secure, and efficient.
          </p>
          <div className="hero-buttons">
            <button className="round-arrow">{'➡'}</button>
            <button className="get-started" onClick={() => navigate('/start')}>
              Get Started - "Sign In First"
            </button>
            <button className="round-arrow">{'⬅'}</button>
          </div>
        </div>

        <div className="hero-images floating-group">
          <div className="phone-screen">
            <img src={taxiIllustration} alt="Fast Response" />
            <h3>Fast Response</h3>
            <p>Get instant driver confirmation right after booking.</p>
          </div>
          <div className="phone-screen">
            <img src={bookedIllustration} alt="Easy Booking" />
            <h3>Easy Booking</h3>
            <p>Book your ride with just a few taps on the Web-app.</p>
          </div>
        </div>
      </section>

      <About />
      <WhyUs />
      <CoreFeatures />
      <Gallery />
      <Team />
      <Pricing />
      <Contacts />
      <Footer />

      {/* ✅ WhatsApp Floating Icon */}
      <a
        href="https://wa.me/917219080839" // Replace XXXXXXXXXX with your WhatsApp number
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={32} />
      </a>
    </>
  );
};

export default HeroSection;
