
// // routes/customerRoutes.js
// const express = require('express');
// const multer = require('multer');
// const Customer = require('../models/Customer');

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// // Booking form POST
// router.post('/book', upload.single('profilePhoto'), async (req, res) => {
//   try {
//     const {
//       customerId,
//       fullName,
//       email,
//       phone,
//       bookingDate,
//       driverPreference,
//       vehicleType,
//       requirements,
//       pickupLocation,
//       dropLocation
//     } = req.body;

//     const newCustomer = new Customer({
//       customerId,
//       fullName,
//       email,
//       phone,
//       bookingDate,
//       driverPreference,
//       vehicleType,
//       requirements,
//       pickupLocation,
//       dropLocation,
//       profilePhoto: req.file?.buffer || null,
//       profilePhotoType: req.file?.mimetype || '',
//     });

//     await newCustomer.save();
//     res.status(201).json({ message: 'Booking saved!' });
//   } catch (err) {
//     console.error('❌ Booking error:', err);
//     res.status(500).json({ error: 'Failed to save booking' });
//   }
// });

// // ✅ GET bookings for admin
// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Customer.find().sort({ bookingDate: -1 }); // latest first
//     res.json(bookings);
//   } catch (err) {
//     console.error('❌ Fetch bookings error:', err);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Customer.find();
    res.json(bookings);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Delete booking by ID
router.delete('/bookings/:id', async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error while deleting booking' });
  }
});

module.exports = router;
