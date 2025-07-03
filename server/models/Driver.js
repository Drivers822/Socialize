const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  experiance: { type: String, required: true },
  vehicleType: { type: String, required: true },
  availabilityDate: { type: Date },
  dob: { type: Date },
  additionalInfo: { type: String },
  licenseVerified: { type: Boolean, default: false },
  profilePhoto: { type: String },   // path to the uploaded profile photo
  licenseFront: { type: String },    // path to the uploaded license front image
  licenseBack: { type: String },     // path to the uploaded license back image
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
