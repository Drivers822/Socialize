// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import StartPage from './components/StartPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DriverDashboard from './components/DriverDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import CustomerReviews from './components/Reviews';
import About from './components/About';
import WhyUs from './components/WhyUs';
import CoreFeatures from './components/CoreFeatures';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Pricing from './components/Pricing';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* ✅ Protected routes */}
        <Route path="/driver-dashboard" element={
          <ProtectedRoute><DriverDashboard /></ProtectedRoute>
        } />
        <Route path="/customer-dashboard" element={
          <ProtectedRoute><CustomerDashboard /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />

        {/* ✅ Public routes */}
        <Route path="/reviews" element={<CustomerReviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/features" element={<CoreFeatures />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
