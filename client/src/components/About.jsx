import React from 'react';
import '../Styles/About.css';

const AboutSection = () => {
    return (
        <section className="about-container">
            <div className="about-left">
                <h2>About Us</h2>
                <p><strong>Drivers-Socialize-Networks:</strong> In today’s busy world, many people own cars but find it hard to drive them due to tight schedules, personal preferences, or health reasons. Hiring a full-time driver, though, can be expensive and isn’t always the best option. That’s why Drivers-Socialize-Networks was created. It’s an easy-to-use platform that lets vehicle owners hire professional drivers for special occasions or regular use—offering a flexible, affordable, and hassle-free way to get around without the need for a full-time chauffeur.</p>
                <p>Our platform is all about making life easier for users, with a focus on convenience, safety, and a smooth user experience. It’s here to meet the growing need for personalized transportation, helping people get the trusted driver they need, when they need it, without the cost or commitment of hiring someone full-time.</p>

                <a
                    href="https://www.ijraset.com/best-journal/drivers-socialize-networks"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="read-paper">
                        📄 Read Published Paper
                    </button>
                </a>
            </div>


            <div className="about-right">
                <div className="feature-box">
                    <h4>📱 Easy Booking</h4>
                    <p>Book a driver instantly with our intuitive and user-friendly app interface.</p>
                </div>
                <div className="feature-box">
                    <h4>✅ Verified Drivers</h4>
                    <p>All our drivers are background-checked and professionally trained.</p>
                </div>
                <div className="feature-box">
                    <h4>🔐 Secure Payments</h4>
                    <p>Transactions are encrypted, ensuring your payment data is always protected.</p>
                </div>
                <div className="feature-box">
                    <h4>💳 Transparent Pricing</h4>
                    <p>No surprises—just clear, upfront pricing with no hidden charges.</p>
                </div>
                <div className="feature-box">
                    <h4>🎧 24/7 Support</h4>
                    <p>We’re here whenever you need us—day or night—with fast, friendly help.</p>
                </div>
                <div className="feature-box">
                    <h4>📍 Live Driver Tracking</h4>
                    <p>Track your driver in real-time for extra peace of mind and convenience.</p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
