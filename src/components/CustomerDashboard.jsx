import React, { useState } from 'react';
import '../styles/customers.css';

const CustomerDashboard = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    fullName: '',
    email: '',
    phone: '',
    bookingDate: '',
    driverPreference: '',
    vehicleType: '',
    requirements: '',
    pickupLocation: '',
    dropLocation: '',
    profilePhoto: null,
  });

  const generateCustomerId = (vehicleType) => {
    const prefix = vehicleType.slice(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${Date.now().toString().slice(-5)}-${random}`;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === 'vehicleType') {
      const newId = value ? generateCustomerId(value) : '';
      setFormData((prev) => ({
        ...prev,
        vehicleType: value,
        customerId: newId,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Booking submitted!
Customer ID: ${formData.customerId}
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Date: ${formData.bookingDate}
Driver Preference: ${formData.driverPreference}
Vehicle Type: ${formData.vehicleType}
Pickup Location: ${formData.pickupLocation}
Drop Location: ${formData.dropLocation}
Additional Requirements: ${formData.requirements || 'None'}
Profile Photo: ${formData.profilePhoto?.name || 'Not uploaded'}
`);

    setFormData({
      customerId: '',
      fullName: '',
      email: '',
      phone: '',
      bookingDate: '',
      driverPreference: '',
      vehicleType: '',
      requirements: '',
      pickupLocation: '',
      dropLocation: '',
      profilePhoto: null,
    });

    document.getElementById('profilePhoto').value = '';
  };

  const handleExtraAction = () => {
    alert("Extra action clicked!");
  };

  return (
    <div className="page-center">
      <form onSubmit={handleSubmit} className="container" noValidate>
        <h2>Customer Booking Form</h2>

        <label htmlFor="customerId">Customer ID</label>
        <input
          id="customerId"
          type="text"
          name="customerId"
          value={formData.customerId}
          readOnly
        />

        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="bookingDate">Booking Date</label>
        <input
          id="bookingDate"
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="driverPreference">Driver Preference</label>
        <select
          id="driverPreference"
          name="driverPreference"
          value={formData.driverPreference}
          onChange={handleChange}
          required
        >
          <option value="">Select Preference</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
        </select>

        <label htmlFor="vehicleType">Vehicle Type</label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
        >
          <option value="">Select Vehicle</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
          <option value="bus">Bus</option>
        </select>

        <label htmlFor="pickupLocation">Pickup Location</label>
        <input
          id="pickupLocation"
          type="text"
          name="pickupLocation"
          placeholder="Enter pickup address"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        />

        <label htmlFor="dropLocation">Drop Location</label>
        <input
          id="dropLocation"
          type="text"
          name="dropLocation"
          placeholder="Enter drop address"
          value={formData.dropLocation}
          onChange={handleChange}
          required
        />

        <label htmlFor="profilePhoto">Upload Profile Photo</label>
        <input
          id="profilePhoto"
          type="file"
          name="profilePhoto"
          accept="image/*"
          onChange={handleChange}
        />

        <label htmlFor="requirements">Additional Requirements (Optional)</label>
        <textarea
          id="requirements"
          name="requirements"
          placeholder="Any special requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={3}
        />


        {/* Google Maps Button */}
        <button
          type="button"
          className="map-btn"
          onClick={() => window.open('https://www.google.com/maps', '_blank')}
        >
          Google Map
        </button>





        <button type="submit">Book Driver</button>
      </form>
    </div>
  );
};

export default CustomerDashboard;
