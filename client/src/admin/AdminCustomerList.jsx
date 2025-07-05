import React, { useEffect, useState } from 'react';
import '../Styles/AdminCustomerList.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerDeleteModal from './CustomerDeleteModal';

const AdminCustomerList = () => {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch('http://localhost:5000/api/customer/bookings')
      .then(res => res.json())
      .then(setBookings)
      .catch(err => console.error('Fetch error:', err));
  };

  const requestDelete = (booking) => {
    const confirm1 = window.confirm("Are you sure you want to delete this booking?");
    if (!confirm1) return;
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/customer/bookings/${selectedBooking._id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== selectedBooking._id));
        alert('✅ Booking deleted');
      } else {
        alert('❌ Failed to delete booking');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Something went wrong');
    } finally {
      cancelDelete();
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Customer ID', 'Full Name', 'Email', 'Phone',
      'Booking Date', 'Driver Preference', 'Vehicle Type',
      'Pickup Location', 'Drop Location', 'Requirements'
    ];
    const rows = filteredBookings.map(b => [
      b.customerId, b.fullName, b.email, b.phone,
      b.bookingDate, b.driverPreference, b.vehicleType,
      b.pickupLocation, b.dropLocation, b.requirements || ''
    ]);
    const csvContent = "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customer_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(b => {
    const date = new Date(b.bookingDate);
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });

  const handleGoBack = () => {
    window.history.back();
  };

  const getPhotoUrl = (photoBuffer) => {
    if (!photoBuffer?.data) return null;
    const base64String = btoa(String.fromCharCode(...new Uint8Array(photoBuffer.data)));
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="admin-booking-page">
      <header>
        <h1>📋 Customer Bookings</h1>
        <button onClick={handleGoBack} className="back-btn">⬅️ Back</button>
        <div className="filters">
          <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Start Date" />
          <DatePicker selected={endDate} onChange={setEndDate} placeholderText="End Date" />
          <button onClick={exportToCSV}>📤 Export CSV</button>
        </div>
      </header>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">🚫 No bookings found</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Requirements</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.customerId}</td>
                  <td>{c.fullName}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{new Date(c.bookingDate).toLocaleDateString()}</td>
                  <td>{c.driverPreference}</td>
                  <td><span className="pill dark">{c.vehicleType}</span></td>
                  <td><span className="pill green">{c.pickupLocation}</span></td>
                  <td><span className="pill red">{c.dropLocation}</span></td>
                  <td>{c.requirements || '—'}</td>
                  <td>
                    {c.profilePhoto ? (
                      <img
                        src={getPhotoUrl(c.profilePhoto)}
                        alt="profile"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    ) : 'No Photo'}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => requestDelete(c)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CustomerDeleteModal
        show={showModal}
        customerId={selectedBooking?.customerId}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminCustomerList;
