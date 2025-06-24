import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Profile.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePhoto' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile'); // Optional: remove saved data
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="photo-preview">
          {formData.profilePhoto ? (
            <img src={formData.profilePhoto} alt="Profile" />
          ) : (
            <span className="no-image">No Image</span>
          )}
        </div>

        <input
          type="file"
          name="profilePhoto"
          accept="image/*"
          onChange={handleChange}
        />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit">Save Profile</button>
        <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
      </form>
    </div>
  );
};

export default ProfilePage;
