import React from 'react';
import '../Styles/WhyUs.css';

const features = [
  { icon: '👁️', title: 'Trusted Professionals', color: '#FFB000' },
  { icon: '∞', title: 'User-Friendly App', color: '#5E5CE6' },
  { icon: '🎓', title: 'Tailored for You', color: '#FF007A' },
  { icon: '⚡', title: 'Lightning Fast Support', color: '#FFD700' },
  { icon: '😊', title: 'Customer Satisfaction', color: '#00C896' },
  { icon: '🌐', title: 'Global Reach', color: '#7A5FFF' },
  { icon: '🔐', title: 'Data Privacy & Security', color: '#FF4A4A' },
  { icon: '📈', title: 'Proven Results', color: '#32C48D' },
  { icon: '❤️‍🩹', title: 'Reliable Service', color: '#FF6B35' },
  { icon: '💻', title: 'Advanced Technology', color: '#B85FFF' },
  { icon: '👥', title: 'Community-Focused', color: '#00A878' },
  { icon: '🏅', title: 'Award-Winning Team', color: '#FFB000' },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2>Why Choose Us?</h2>
      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-box" key={index}>
            <span className="feature-icon" style={{ color: item.color }}>{item.icon}</span>
            <span className="feature-text">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;