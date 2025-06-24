const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: String,
  fullName: String,
  email: String,
  phone: String,
  bookingDate: String,
  driverPreference: String,
  vehicleType: String,
  pickupLocation: String,
  dropLocation: String,
  requirements: String,
  profilePhoto: Buffer,
  profilePhotoType: String,
});

module.exports = mongoose.model('Customer', customerSchema);
