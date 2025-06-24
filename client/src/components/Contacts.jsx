// src/components/ContactSection.jsx
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import '../Styles/Contacts.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  const formRef = useRef();
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_bpakk22',        // ✅ Your EmailJS service ID
      'template_vdavc2c',       // ✅ Your EmailJS template ID
      formRef.current,
      '6o_F90Qw0iZgpcTzw'       // ✅ Your EmailJS public key
    )
    .then(() => {
      setMessage('Message sent successfully!');
      formRef.current.reset(); // clear form
    })
    .catch((error) => {
      console.error('Failed to send:', error);
      setMessage('Failed to send message. Please try again later.');
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-left">
        <p className="contact-label">CONTACT</p>
        <h2 className="gallery-title">
          CHECK <span className="highlight">OUR CONTACT</span>
        </h2>

        <div className="contact-info">
          <div className="info-item">
            <div className="icon-circle">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h4>Address</h4>
              <p>Sinnar, Nashik, Maharashtra, India</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-circle">
              <FaPhoneAlt />
            </div>
            <div>
              <h4>Call Us</h4>
              <p>+91 7219080839</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-circle">
              <FaEnvelope />
            </div>
            <div>
              <h4>Email Us</h4>
              <p>driverssocializenetworks@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
          <div className="form-row">
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
          </div>
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Your Message" rows="6" required />
          <button type="submit">Send Message</button>
          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
