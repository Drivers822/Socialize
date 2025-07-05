const express = require('express');
const multer = require('multer');
const path = require('path');
const Driver = require('../models/Driver');
const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage: storage });

// 🚀 POST: Register a driver
router.post(
  '/register-driver',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'licenseFront', maxCount: 1 },
    { name: 'licenseBack', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { body, files } = req;

      if (!files?.profilePhoto || !files?.licenseFront || !files?.licenseBack) {
        return res.status(400).json({ error: 'All images are required!' });
      }

      const newDriver = new Driver({
        ...body,
        licenseVerified: body.licenseVerified === 'true',
        profilePhoto: files.profilePhoto[0].filename,
        licenseFront: files.licenseFront[0].filename,
        licenseBack: files.licenseBack[0].filename,
      });

      await newDriver.save();
      res.status(201).json({ message: 'Driver registered successfully!' });
    } catch (err) {
      console.error('❌ Error saving driver:', err);
      res.status(500).json({ error: 'Failed to save driver data' });
    }
  }
);

// 📄 GET: Fetch all drivers with image filenames
router.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find(); // include all fields
    res.json(drivers);
  } catch (err) {
    console.error('❌ Error fetching drivers:', err);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// 🗑️ DELETE: Remove driver by ID
router.delete('/drivers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Driver.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting driver:', err);
    res.status(500).json({ error: 'Failed to delete driver' });
  }
});

module.exports = router;
