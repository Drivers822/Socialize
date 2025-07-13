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

    let replyText = "🤖 I'm sorry, I didn't understand that.";

    const lowerInput = chatInput.toLowerCase();

    if (lowerInput.includes('book')) {
      replyText = "🚗 You can book a driver by clicking 'Get Started' above and logging in.";
    } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      replyText = "💰 Our pricing starts at ₹199 for the first hour. Check the Pricing section for more.";
    } else if (lowerInput.includes('support') || lowerInput.includes('help')) {
      replyText = "📞 You can contact our support via the WhatsApp button on the bottom right.";
    } else if (lowerInput.includes('location') || lowerInput.includes('available')) {
      replyText = "📍 Our drivers are available across major cities. Please enter your location on the booking page.";
    } else if (lowerInput.includes('timing') || lowerInput.includes('hours')) {
      replyText = "🕒 Our services are available 24/7. Book anytime!";
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      replyText = "👋 Hello! How can I assist you today?";
    }

    const aiReply = { from: 'ai', text: replyText };

    setMessages((prev) => [...prev, userMessage, aiReply]);
    setChatInput('');
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
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

      <About />
      <WhyUs />
      <CoreFeatures />
      <Gallery />
      <Team />
      <Pricing />
      <Contacts />
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917219080839"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp size={18} />
        </button>
      )}

      {/* AI Chat Button */}
      <button className="ai-chat-button" onClick={() => setChatOpen(!chatOpen)}>
        <FaComments size={18} />
      </button>

      {/* Chat Window */}
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
