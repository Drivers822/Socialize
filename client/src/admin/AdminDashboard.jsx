import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">🛠️ Admin Control Panel</h1>
      <div className="admin-card-grid">
        <div className="admin-card" onClick={() => navigate('/admin/drivers')}>
          <h2>🚗 Manage Drivers</h2>
          <p>View, verify & manage all registered drivers</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/admin/customers')}>
          <h2>👥 Manage Customers</h2>
          <p>View bookings & customer activities</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
