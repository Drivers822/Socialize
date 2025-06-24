const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driverId: String,
  fullName: String,
  email: String,
  phone: String,
  licenseNumber: String,
  experiance: String,
  vehicleType: String,
  availabilityDate: String,
  dob: String,
  additionalInfo: String,
  licenseVerified: Boolean,
  profilePhoto: Buffer,
  licenseFront: Buffer,
  licenseBack: Buffer,
});

module.exports = mongoose.model('Driver', driverSchema);
