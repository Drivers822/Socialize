// // // // routes/customerRoutes.js
// // // const express = require('express');
// // // const multer = require('multer');
// // // const Customer = require('../models/Customer');

// // // const router = express.Router();
// // // const upload = multer({ storage: multer.memoryStorage() });

// // // router.post('/book', upload.single('profilePhoto'), async (req, res) => {
// // //   try {
// // //     const {
// // //       customerId,
// // //       fullName,
// // //       email,
// // //       phone,
// // //       bookingDate,
// // //       driverPreference,
// // //       vehicleType,
// // //       requirements,
// // //       pickupLocation,
// // //       dropLocation
// // //     } = req.body;

// // //     const newCustomer = new Customer({
// // //       customerId,
// // //       fullName,
// // //       email,
// // //       phone,
// // //       bookingDate,
// // //       driverPreference,
// // //       vehicleType,
// // //       requirements,
// // //       pickupLocation,
// // //       dropLocation,
// // //       profilePhoto: req.file?.buffer || null,
// // //       profilePhotoType: req.file?.mimetype || '',
// // //     });

// // //     await newCustomer.save();
// // //     res.status(201).json({ message: 'Booking saved!' });
// // //   } catch (err) {
// // //     console.error('❌ Booking error:', err);
// // //     res.status(500).json({ error: 'Failed to save booking' });
// // //   }
// // // });

// // // module.exports = router;

// // // routes/customerRoutes.js
// // const express = require('express');
// // const multer = require('multer');
// // const Customer = require('../models/Customer');

// // const router = express.Router();
// // const upload = multer({ storage: multer.memoryStorage() });

// // // Booking form POST
// // router.post('/book', upload.single('profilePhoto'), async (req, res) => {
// //   try {
// //     const {
// //       customerId,
// //       fullName,
// //       email,
// //       phone,
// //       bookingDate,
// //       driverPreference,
// //       vehicleType,
// //       requirements,
// //       pickupLocation,
// //       dropLocation
// //     } = req.body;

// //     const newCustomer = new Customer({
// //       customerId,
// //       fullName,
// //       email,
// //       phone,
// //       bookingDate,
// //       driverPreference,
// //       vehicleType,
// //       requirements,
// //       pickupLocation,
// //       dropLocation,
// //       profilePhoto: req.file?.buffer || null,
// //       profilePhotoType: req.file?.mimetype || '',
// //     });

// //     await newCustomer.save();
// //     res.status(201).json({ message: 'Booking saved!' });
// //   } catch (err) {
// //     console.error('❌ Booking error:', err);
// //     res.status(500).json({ error: 'Failed to save booking' });
// //   }
// // });

// // // ✅ GET bookings for admin
// // router.get('/bookings', async (req, res) => {
// //   try {
// //     const bookings = await Customer.find().sort({ bookingDate: -1 }); // latest first
// //     res.json(bookings);
// //   } catch (err) {
// //     console.error('❌ Fetch bookings error:', err);
// //     res.status(500).json({ error: 'Failed to fetch bookings' });
// //   }
// // });

// // module.exports = router;

// // const express = require('express');
// // const multer = require('multer');
// // const Customer = require('../models/Customer'); // Your Mongoose model
// // const router = express.Router();

// // const upload = multer({ storage: multer.memoryStorage() });

// // // POST /api/customer/bookings
// // router.post('/bookings', upload.single('profilePhoto'), async (req, res) => {
// //   try {
// //     const data = req.body;

// //     const newCustomer = new Customer({
// //       ...data,
// //       profilePhoto: req.file?.buffer || null,
// //     });

// //     await newCustomer.save();
// //     res.status(201).json({ message: 'Booking submitted successfully' });
// //   } catch (err) {
// //     console.error('❌ Booking error:', err);
// //     res.status(500).json({ error: 'Failed to submit booking' });
// //   }
// // });

// // module.exports = router;
// // routes/customerRoutes.js

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Customer = require('../models/Customer');

// // Configure multer for file upload
// const storage = multer.memoryStorage(); // or you can use diskStorage
// const upload = multer({ storage });

// // POST: Add new booking
// router.post('/bookings', upload.single('profilePhoto'), async (req, res) => {
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

//     const newBooking = new Customer({
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
//       profilePhoto: req.file ? req.file.buffer : null,
//     });

//     await newBooking.save();
//     res.status(201).json({ message: 'Booking saved successfully' });
//   } catch (err) {
//     console.error('❌ Error saving booking:', err);
//     res.status(500).json({ error: 'Server error while saving booking' });
//   }
// });

// // GET: Retrieve all bookings
// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Customer.find();
//     res.json(bookings);
//   } catch (err) {
//     console.error('❌ Error fetching bookings:', err);
//     res.status(500).json({ error: 'Server error while fetching bookings' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const Customer = require('../models/Customer');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Add new booking
router.post('/bookings', upload.single('profilePhoto'), async (req, res) => {
  try {
    const {
      customerId,
      fullName,
      email,
      phone,
      bookingDate,
      driverPreference,
      vehicleType,
      requirements,
      pickupLocation,
      dropLocation
    } = req.body;

    const newBooking = new Customer({
      customerId,
      fullName,
      email,
      phone,
      bookingDate,
      driverPreference,
      vehicleType,
      requirements,
      pickupLocation,
      dropLocation,
      profilePhoto: req.file ? req.file.buffer : null,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (err) {
    console.error('❌ Error saving booking:', err);
    res.status(500).json({ error: 'Server error while saving booking' });
  }
});

// GET: Retrieve all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Customer.find();
    res.json(bookings);
  } catch (err) {
    console.error('❌ Error fetching bookings:', err);
    res.status(500).json({ error: 'Server error while fetching bookings' });
  }
});

// ✅ DELETE: Delete a booking by ID
router.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Customer.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting booking:', err);
    res.status(500).json({ error: 'Server error while deleting booking' });
  }
});

module.exports = router;
