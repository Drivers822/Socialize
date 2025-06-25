// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/HomePage.css';
// import taxiIllustration from '../assets/hero-img copy.png';
// import bookedIllustration from '../assets/hero-bg-2.jpg';
// import About from './About'; // ✅ Corrected path
// import WhyUs from './WhyUs'; // ✅ Corrected path
// import CoreFeatures from './CoreFeatures'; // ✅ Corrected path
// import Gallery from './Gallery'; // ✅ Corrected path
// import Team from './Team'; // ✅ Corrected path
// import Pricing from './Pricing'; // ✅ Corrected path
// import Contacts from './Contacts'; // ✅ Corrected path
// import Footer from './Footer'; // ✅ Corrected path

// const HeroSection = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>
//             <span className="light-text">On-Demand Driver Services<br />with </span>
//             <span className="highlight">Trust & Convenience</span>
//           </h1>
//           <p className="sub-text">
//             Your ride is just a few taps away. Trustworthy drivers, smooth rides.
//           </p>
//           <p className="sub-text">
//             Start your journey with our trusted driver network — seamless, secure, and efficient.
//           </p>
//           <div className="hero-buttons">
//             <button className="round-arrow">{'➡'}</button>
//             <button className="get-started" onClick={() => navigate('/start')}>
//               Get Started - "Sign In First" 
//             </button>
//             <button className="round-arrow">{'⬅'}</button>
//           </div>
//         </div>

//         <div className="hero-images floating-group">
//           <div className="phone-screen">
//             <img src={taxiIllustration} alt="Fast Response" />
//             <h3>Fast Response</h3>
//             <p>Get instant driver confirmation right after booking.</p>
//           </div>
//           <div className="phone-screen">
//             <img src={bookedIllustration} alt="Easy Booking" />
//             <h3>Easy Booking</h3>
//             <p>Book your ride with just a few taps on the Web-app.</p>
//           </div>
//         </div>
//       </section>

//       {/* Optionally render About section below */}
//       <About />
//       <WhyUs />
//       <CoreFeatures />
//       <Gallery />
//       <Team />
//       <Pricing />
//       <Contacts />
//       <Footer />
//     </>
//   );
// };

// export default HeroSection;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';
import {
  FaWhatsapp,
  FaArrowUp,
  FaComments,
  FaPaperPlane,
} from 'react-icons/fa';

import logo from '../assets/logo.png';
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi! I’m your assistant. How can I help you today?' },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage = { from: 'user', text: chatInput };
    const aiReply = {
      from: 'ai',
      text: "🤖 I'm just a demo! Real AI reply goes here.",
    };
    setMessages((prev) => [...prev, userMessage, aiReply]);
    setChatInput('');
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">

          {/* ✅ Logo */}
          <div className="hero-logo-container">
            <img src={logo} alt="Company Logo" className="hero-logo" />
          </div>

          <h1>
            <span className="light-text">
              On-Demand Driver Services<br />with
            </span>
            <span className="highlight"> Trust & Convenience</span>
          </h1>
          <p className="sub-text">
            Your ride is just a few taps away. Trustworthy drivers, smooth rides.
          </p>
          <p className="sub-text">
            Start your journey with our trusted driver network — seamless, secure,
            and efficient.
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

      {/* Other Sections */}
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
        href="https://wa.me/917219080839"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* ✅ Scroll-to-top Arrow */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp size={18} />
        </button>
      )}

      {/* ✅ AI Chat Floating Button */}
      <button className="ai-chat-button" onClick={() => setChatOpen(!chatOpen)}>
        <FaComments size={18} />
      </button>

      {/* ✅ AI Chat Window */}
      {chatOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            AI Chat Support
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;

