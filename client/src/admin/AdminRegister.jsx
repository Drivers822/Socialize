// src/components/AdminRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Admin registered! Redirecting to login...');
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error during registration');
    }
  };

  return (
    <div className="container">
      <h2>🛡️ Admin Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default AdminRegister;
