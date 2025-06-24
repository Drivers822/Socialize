// src/components/RegisterForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // ✅ Import Footer component

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle registration logic here

    alert('Registration successful (mock)');
    navigate('/login'); // Redirect after mock registration
  };

  return (
    <>
      <div className="page-center">
        <form className="container" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <select required>
            <option value="">Register As</option>
            <option value="driver">Driver</option>
            <option value="customer">Customer</option>
          </select>
          <button type="submit" style={{ marginTop: '1rem' }}>
            Register
          </button>
          <p
            onClick={() => navigate('/login')}
            style={{
              marginTop: '1rem',
              color: '#007bff',
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'underline',
            }}
          >
            Already logged in? Login here
          </p>
        </form>
      </div>

      <Footer /> {/* ✅ Footer rendered below the registration form */}
    </>
  );
};

export default RegisterForm;
