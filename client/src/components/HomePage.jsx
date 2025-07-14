import React, { useEffect, useState, useRef } from 'react';
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
    { from: 'ai', text: '👋 Hi there! How can I assist you today?' },
  ]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { from: 'user', text: chatInput };
    const lowerInput = chatInput.toLowerCase();

    let replyText = "🤖 I'm sorry, I didn't understand that. Please try asking in a different way.";

    if (lowerInput.includes('register') || lowerInput.includes('sign up')) {
      replyText = "📝 To register, click 'Get Started' and then choose 'Sign Up'.";
    } else if (lowerInput.includes('book') || lowerInput.includes('ride')) {
      replyText = "🚗 You can book a driver by clicking 'Get Started' and signing in.";
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('charge')) {
      replyText = "💰 Our pricing starts at ₹199 for the first hour. Check the Pricing section for more details.";
    } else if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('problem')) {
      replyText = "📞 You can reach our support team using the WhatsApp button at the bottom right.";
    } else if (lowerInput.includes('location') || lowerInput.includes('city') || lowerInput.includes('available')) {
      replyText = "📍 Our services are available in major cities. Enter your location on the booking page.";
    } else if (lowerInput.includes('time') || lowerInput.includes('hours') || lowerInput.includes('when')) {
      replyText = "🕒 Our services operate 24/7. You can book anytime!";
    } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
      replyText = "👋 Hi there! How can I assist you today?";
    } else if (lowerInput.includes('team') || lowerInput.includes('driver')) {
      replyText = "🚘 Our drivers are verified professionals focused on your comfort and safety.";
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
      <button className="ai-chat-button" onClick={() => setChatOpen(true)}>
        <FaComments size={18} />
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            AI Chat Support
            <button
              onClick={() => {
                setChatOpen(false);
                setMessages([
                  { from: 'ai', text: '👋 Hi there! How can I assist you today?' }
                ]);
              }}
            >
              ✖
            </button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
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
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
