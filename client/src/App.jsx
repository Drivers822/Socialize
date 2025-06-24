// // src/App.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './components/HomePage';
// import StartPage from './components/StartPage';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import DriverDashboard from './components/DriverDashboard';
// import CustomerDashboard from './components/CustomerDashboard';
// import CustomerReviews from './components/Reviews';
// import About from './components/About';
// import WhyUs from './components/WhyUs';
// import CoreFeatures from './components/CoreFeatures';
// import Gallery from './components/Gallery';
// import Team from './components/Team';
// import Pricing from './components/Pricing';
// import Contacts from './components/Contacts';
// import Footer from './components/Footer';
// import ProfilePage from './components/ProfilePage';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminDashboard from './admin/AdminDashboard';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function App() {
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/start" element={<StartPage />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />

//         {/* ✅ Protected routes */}
//         <Route path="/driver-dashboard" element={
//           <ProtectedRoute><DriverDashboard /></ProtectedRoute>
//         } />
//         <Route path="/customer-dashboard" element={
//           <ProtectedRoute><CustomerDashboard /></ProtectedRoute>
//         } />
//         <Route path="/profile" element={
//           <ProtectedRoute><ProfilePage /></ProtectedRoute>
//         } />

//         {/* ✅ Public routes */}
//         <Route path="/reviews" element={<CustomerReviews />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/why-us" element={<WhyUs />} />
//         <Route path="/features" element={<CoreFeatures />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/team" element={<Team />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/contacts" element={<Contacts />} />
//         <Route path="/footer" element={<Footer />} />
//         <Route path="/driver" element={<AdminDashboard />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


// src/App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';

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

import AdminDashboard from './admin/AdminDashboard';
import AdminDriver from './admin/AdminDriver';
import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';
import AdminCustomerList from './admin/AdminCustomerList';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Admin Protected Route
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
  return isAdmin ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reviews" element={<CustomerReviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/features" element={<CoreFeatures />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/footer" element={<Footer />} />

        {/* User Protected Routes */}
        <Route path="/driver-dashboard" element={
          <ProtectedRoute><DriverDashboard /></ProtectedRoute>
        } />
        <Route path="/customer-dashboard" element={
          <ProtectedRoute><CustomerDashboard /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/drivers" element={
          <AdminProtectedRoute>
            <AdminDriver />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/customers" element={
          <AdminProtectedRoute>
            <AdminCustomerList />
          </AdminProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
