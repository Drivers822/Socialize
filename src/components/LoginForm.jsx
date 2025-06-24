// src/components/LoginForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // ✅ Import the Footer

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userType = e.target.userType.value;
    localStorage.setItem('userType', userType);
    if (userType === 'driver') navigate('/driver-dashboard');
    else if (userType === 'customer') navigate('/customer-dashboard');
  };

  return (
    <>
      <div className="page-center">
        <form onSubmit={handleLogin} className="container">
          <h2>Login</h2>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <select name="userType" required>
            <option value="">Login As</option>
            <option value="driver">Driver</option>
            <option value="customer">Customer</option>
          </select>
          <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
          <p
            onClick={() => navigate('/register')}
            style={{
              marginTop: '1rem',
              color: '#007bff',
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'underline',
            }}
          >
            Don't have an account? Register here
          </p>
        </form>
      </div>

      <Footer /> {/* ✅ Footer added below the form */}
    </>
  );
};

export default LoginForm;
