import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminDriver.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const AdminDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const navigate = useNavigate();

  // Fetch drivers data
  useEffect(() => {
    fetch('http://localhost:5000/api/drivers')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Drivers:', data); // Debugging log to check data
        setDrivers(data);
      })
      .catch((err) => console.error('Failed to fetch drivers:', err));
  }, []);

  const openConfirmModal = (driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setSelectedDriver(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    const { _id, driverId } = selectedDriver;
    try {
      const res = await fetch(`http://localhost:5000/api/drivers/${_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId }),
      });

      const result = await res.json();
      if (res.ok) {
        alert('✅ Driver deleted');
        setDrivers((prev) => prev.filter((d) => d._id !== _id));
      } else {
        alert(result.error || '❌ Failed to delete.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Something went wrong.');
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* 🔙 Back Button */}
      <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
        🔙 Back to Dashboard
      </button>

      <h2 className="dashboard-title">🚗 Registered Drivers</h2>

      {drivers.length === 0 ? (
        <div className="empty-state">No drivers found 🚫</div>
      ) : (
        <div className="table-wrapper">
          <table className="driver-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Driver ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>License No</th>
                <th>Verified</th>
                <th>Vehicle</th>
                <th>Experience</th>
                <th>Profile Photo</th>
                <th>License Front</th>
                <th>License Back</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d, index) => (
                <tr key={d._id}>
                  <td>{index + 1}</td>
                  <td>{d.driverId}</td>
                  <td>{d.fullName}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>{d.dob}</td>
                  <td>{d.licenseNumber}</td>
                  <td>{d.licenseVerified ? '✅' : '❌'}</td>
                  <td>
                    <span className="pill vehicle">{d.vehicleType}</span>
                  </td>
                  <td>
                    <span className="pill experience">{d.experiance}</span>
                  </td>
                  <td>
                    {/* Profile Photo */}
                    {d.profilePhoto ? (
                      <img
                        src={`http://localhost:5000/uploads/${d.profilePhoto}`}
                        alt="Profile"
                        className="driver-image"
                        width={50}
                        height={50}
                        onError={(e) => e.target.src = 'http://localhost:5000/uploads/default-profile.png'}
                      />
                    ) : (
                      <div>No Profile Photo</div>
                    )}
                  </td>
                  <td>
                    {/* License Front */}
                    {d.licenseFront ? (
                      <img
                        src={`http://localhost:5000/uploads/${d.licenseFront}`}
                        alt="License Front"
                        className="driver-image"
                        width={50}
                        height={50}
                        onError={(e) => e.target.src = 'http://localhost:5000/uploads/default-license.png'}
                      />
                    ) : (
                      <div>No License Front</div>
                    )}
                  </td>
                  <td>
                    {/* License Back */}
                    {d.licenseBack ? (
                      <img
                        src={`http://localhost:5000/uploads/1751260946741.png`}
                        alt="License Back"
                        className="driver-image"
                        width={50}
                        height={50}
                        onError={(e) => e.target.src = 'http://localhost:5000/uploads/default-license.png'}
                      />
                    ) : (
                      <div>No License Back</div>
                    )}
                  </td>
                  <td>
                    <button onClick={() => openConfirmModal(d)}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        show={showModal}
        driverId={selectedDriver?.driverId}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminDriver;
