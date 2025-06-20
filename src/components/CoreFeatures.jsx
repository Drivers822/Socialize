import React from 'react';
import '../Styles/CoreFeatures.css';
import { FaBolt, FaCompass, FaExclamationTriangle, FaWallet, FaLanguage, FaGift } from 'react-icons/fa';

const features = [
  {
    icon: <FaBolt color="#ff6a00" size={32} />,
    title: 'Instant Driver Booking',
    description: 'Quickly find a driver at any time using our app.',
  },
  {
    icon: <FaCompass color="#007bff" size={32} />,
    title: 'Live Tracking',
    description: 'Know where your driver is in real-time.',
  },
  {
    icon: <FaExclamationTriangle color="#ff4c4c" size={32} />,
    title: 'Safety First',
    description: 'Emergency support and verified professionals.',
  },
  {
    icon: <FaWallet color="green" size={32} />,
    title: 'Multiple Payments',
    description: 'Choose from UPI, cards, cash, or digital wallets.',
  },
  {
    icon: <FaLanguage color="#6f42c1" size={32} />,
    title: 'Multi-language Support',
    description: 'Use the app in your regional language.',
  },
  {
    icon: <FaGift color="#ffa500" size={32} />,
    title: 'Subscription Plans',
    description: 'Save with corporate and frequent rider packages.',
  },
];

const CoreFeatures = () => {
  return (
    <div className="core-features-container">
      <h2>Core Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon-wrapper">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreFeatures;
