import React, { useState } from 'react';
import '../styles/Drivers.css';
import Navbar from './Navbar';
import Tesseract from 'tesseract.js';
import Footer from './Footer'; // ✅ Import Footer

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    driverId: '',
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    experiance: '',
    vehicleType: '',
    availabilityDate: '',
    dob: '',
    additionalInfo: '',
    profilePhoto: null,
    licenseFront: null,
    licenseBack: null,
    licenseVerified: false,
    acceptedTerms: false,
  });

  const [licenseError, setLicenseError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [ocrText, setOcrText] = useState({ front: '', back: '' });
  const [ocrLicenseNumber, setOcrLicenseNumber] = useState('');

  const userRole = localStorage.getItem('userRole') || 'driver';

  const generateDriverId = (vehicleType) => {
    const prefix = vehicleType.slice(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${Date.now().toString().slice(-5)}-${random}`;
  };

  const validateLicense = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;
    return !validTypes.includes(file.type)
      ? 'Only JPEG/PNG allowed.'
      : file.size > maxSize
      ? 'Max size 5MB.'
      : '';
  };

  const extractTextFromImage = async (file) => {
    const { data } = await Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m),
    });
    return data.text;
  };

  const verifyLicenseWithAI = async (front, back, enteredLicenseNumber) => {
    try {
      setVerifying(true);
      const frontText = await extractTextFromImage(front);
      const backText = await extractTextFromImage(back);

      setOcrText({ front: frontText, back: backText });

      const frontTextLower = frontText.toLowerCase();
      const backTextLower = backText.toLowerCase();

      const licenseRegex = /[A-Z]{2}\d{2}\s?\d{7,12}/i;
      const match = frontText.match(licenseRegex);
      const extractedLicense = match ? match[0].replace(/\s/g, '') : '';

      setOcrLicenseNumber(extractedLicense);

      const enteredLicenseClean = enteredLicenseNumber.replace(/\s/g, '');
      const licenseNumberMatches =
        extractedLicense &&
        extractedLicense.toLowerCase() === enteredLicenseClean.toLowerCase();

      const frontValid =
        frontTextLower.includes('dl') || frontTextLower.includes('driv');
      const backValid =
        backTextLower.includes('gov') ||
        backTextLower.includes('license') ||
        backTextLower.includes('transport');

      if (!licenseNumberMatches) {
        setLicenseError(
          `❌ License number mismatch. OCR extracted: "${extractedLicense || 'Not found'}"`
        );
      }

      setVerifying(false);
      return frontValid && backValid && licenseNumberMatches;
    } catch (err) {
      console.error('AI Verification Error:', err);
      setVerifying(false);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      const error = validateLicense(file);
      if (error) {
        setLicenseError(error);
        setFormData((prev) => ({
          ...prev,
          [name]: null,
          licenseVerified: false,
        }));
        return;
      }

      const updatedData = { ...formData, [name]: file };
      setFormData(updatedData);

      if (
        (name === 'licenseFront' || name === 'licenseBack') &&
        updatedData.licenseFront &&
        updatedData.licenseBack &&
        updatedData.licenseNumber
      ) {
        const success = await verifyLicenseWithAI(
          updatedData.licenseFront,
          updatedData.licenseBack,
          updatedData.licenseNumber
        );
        if (success) {
          setFormData((prev) => ({ ...prev, licenseVerified: true }));
          setLicenseError('');
        } else {
          setFormData((prev) => ({ ...prev, licenseVerified: false }));
        }
      }
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'vehicleType') {
      const newId = value ? generateDriverId(value) : '';
      setFormData((prev) => ({
        ...prev,
        vehicleType: value,
        driverId: newId,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.licenseVerified || !formData.acceptedTerms) {
//       alert('❌ Please upload a verified license and accept the terms.');
//       return;
//     }

//     alert(`✅ Driver Registered!
// Driver ID: ${formData.driverId}
// Name: ${formData.fullName}
// DOB: ${formData.dob}
// License Verified: Yes`);

//     setFormData({
//       driverId: '',
//       fullName: '',
//       email: '',
//       phone: '',
//       licenseNumber: '',
//       experiance: '',
//       vehicleType: '',
//       availabilityDate: '',
//       dob: '',
//       additionalInfo: '',
//       profilePhoto: null,
//       licenseFront: null,
//       licenseBack: null,
//       licenseVerified: false,
//       acceptedTerms: false,
//     });

//     setOcrText({ front: '', back: '' });
//     setOcrLicenseNumber('');
//     document.getElementById('profilePhoto').value = '';
//     document.getElementById('licenseFront').value = '';
//     document.getElementById('licenseBack').value = '';
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.licenseVerified || !formData.acceptedTerms) {
    alert('❌ Please upload a verified license and accept the terms.');
    return;
  }

  const form = new FormData();
  for (let key in formData) {
    if (formData[key] instanceof File || typeof formData[key] === 'boolean') {
      form.append(key, formData[key]);
    } else {
      form.append(key, formData[key] || '');
    }
  }

  try {
    const res = await fetch('http://localhost:5000/api/register-driver', {
      method: 'POST',
      body: form,
    });

    const result = await res.json();
    if (res.ok) {
      alert('✅ Driver registered successfully!');
      // reset form
      setFormData({
        driverId: '',
        fullName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        experiance: '',
        vehicleType: '',
        availabilityDate: '',
        dob: '',
        additionalInfo: '',
        profilePhoto: null,
        licenseFront: null,
        licenseBack: null,
        licenseVerified: false,
        acceptedTerms: false,
      });
      setOcrText({ front: '', back: '' });
      setOcrLicenseNumber('');
      document.getElementById('profilePhoto').value = '';
      document.getElementById('licenseFront').value = '';
      document.getElementById('licenseBack').value = '';
    } else {
      alert('❌ Error: ' + result.error);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Something went wrong.');
  }
};

  return (
    <>
      <div className="page-center">
        <form onSubmit={handleSubmit} className="container" noValidate>
          <h2>Driver Registration Form</h2>

          <label>Driver ID</label>
          <input type="text" name="driverId" value={formData.driverId} readOnly />

          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>License Number</label>
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />

          <label>Experience</label>
          <input type="text" name="experiance" value={formData.experiance} onChange={handleChange} required />

          <label>Vehicle Type</label>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="truck">Truck</option>
            <option value="bus">Bus</option>
          </select>

          <label>Availability Date</label>
          <input type="date" name="availabilityDate" value={formData.availabilityDate} onChange={handleChange} required />

          <label>Profile Photo</label>
          <input id="profilePhoto" type="file" name="profilePhoto" accept="image/*" onChange={handleChange} required />

          <label>License Front</label>
          <input id="licenseFront" type="file" name="licenseFront" accept="image/*" onChange={handleChange} required />

          <label>License Back</label>
          <input id="licenseBack" type="file" name="licenseBack" accept="image/*" onChange={handleChange} required />

          {verifying && <p>🔍 Verifying license using AI (OCR)...</p>}
          {licenseError && <p style={{ color: 'red' }}>{licenseError}</p>}
          {formData.licenseVerified && !licenseError && (
            <p style={{ color: 'green' }}>✅ License verification successful!</p>
          )}
          {!formData.licenseVerified && !verifying && !licenseError && formData.licenseFront && formData.licenseBack && formData.licenseNumber && (
            <p style={{ color: 'red' }}>❌ License not verified. Please check the uploaded images or number.</p>
          )}

          {userRole === 'admin' && (
            <>
              {ocrLicenseNumber && (
                <p>🔎 Extracted License Number: <strong>{ocrLicenseNumber}</strong></p>
              )}
              {ocrText.front && (
                <>
                  <label>🔍 OCR Front Text (Debug)</label>
                  <textarea value={ocrText.front} rows="2" readOnly />
                </>
              )}
              {ocrText.back && (
                <>
                  <label>🔍 OCR Back Text (Debug)</label>
                  <textarea value={ocrText.back} rows="2" readOnly />
                </>
              )}
            </>
          )}

          {formData.licenseVerified && (
            <div className="checkbox-field">
              <input id="acceptedTerms" type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} required />
              <label htmlFor="acceptedTerms">
                I accept the <strong>Terms & Conditions</strong>:<br />
                If the license is fake, the driver will be permanently banned.
              </label>
            </div>
          )}

          <label>Additional Info</label>
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows="3" />

          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => window.open('https://www.google.com/maps', '_blank')}
              style={{
                backgroundColor: '#4285F4',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              🗺️ Open Google Map
            </button>
          </div>

          <button type="submit" disabled={!formData.licenseVerified || !formData.acceptedTerms}>
            Register
          </button>
        </form>
      </div>

      <Footer /> {/* ✅ Footer at the bottom */}
    </>
  );
};

export default DriverRegistration;
