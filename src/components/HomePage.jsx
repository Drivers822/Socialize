import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';
import taxiIllustration from '../assets/hero-img copy.png';
import bookedIllustration from '../assets/hero-bg-2.jpg';
import About from './About'; // ✅ Corrected path
import WhyUs from './WhyUs'; // ✅ Corrected path
import CoreFeatures from './CoreFeatures'; // ✅ Corrected path
import Gallery from './Gallery'; // ✅ Corrected path
import Team from './Team'; // ✅ Corrected path
import Pricing from './Pricing'; // ✅ Corrected path
import Contacts from './Contacts'; // ✅ Corrected path
import Footer from './Footer'; // ✅ Corrected path

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

      {/* Optionally render About section below */}
      <About />
      <WhyUs />
      <CoreFeatures />
      <Gallery />
      <Team />
      <Pricing />
      <Contacts />
      <Footer />
    </>
  );
};

export default HeroSection;
