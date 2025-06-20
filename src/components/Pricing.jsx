// src/components/DriverCharges.jsx
import React from 'react';
import '../Styles/Pricing.css';
import { FaCheckCircle } from 'react-icons/fa';

const DriverCharges = () => {
  return (
    <section className="pricing-section">
      <p className="pricing-label">PRICING</p>
      <h2 className="gallery-title">
        OUR <span className="highlight">DRIVER SERVICE CHARGES</span>
      </h2>
      <div className="pricing-box">
        <p>
          At <strong>Drivers-Socialize-Networks</strong>, we keep our prices simple and easy to understand.
        </p>

        <div className="pricing-option">
          <FaCheckCircle className="check-icon" />
          <div>
            <strong>Full-Time Drivers:</strong>
            <p>
              Pay only once. After booking, the driver will work only for you.
            </p>
            <p>
              No monthly charges.
            </p>
          </div>
        </div>

        <div className="pricing-option">
          <FaCheckCircle className="check-icon" />
          <div>
            <strong>Part-Time Drivers:</strong>
            <p>
              Pay only when you need the driver. Good for short or one-time use.
            </p>
            <p>
              If you need a driver for just one ride, the driver will decide the charge, and the full amount will go to the driver.
            </p>
          </div>
        </div>

        <p className="custom-note">
          For custom plans or group bookings, please <a href="#contact">get in touch</a> with us.
        </p>
      </div>
    </section>
  );
};

export default DriverCharges;
