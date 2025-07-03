const express = require('express');
const multer = require('multer');
const path = require('path');
const Driver = require('../models/Driver');
const router = express.Router();

// Set up multer storage configuration (disk storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the directory to store images
    cb(null, './uploads'); // Store the files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded files (you can use original name or generate a unique name)
    cb(null, Date.now() + path.extname(file.originalname)); // Using timestamp to avoid filename conflicts
  }
});

// Set up the multer upload middleware
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
      console.log('Files received:', req.files); // Debugging line
      const { body, files } = req;

      // Ensure that files are uploaded before proceeding
      if (!files?.profilePhoto || !files?.licenseFront || !files?.licenseBack) {
        return res.status(400).json({ error: 'All images are required!' });
      }

      // Create a new driver document
      const newDriver = new Driver({
        ...body,
        licenseVerified: body.licenseVerified === 'true',
        profilePhoto: files.profilePhoto[0].path, // Storing the file path
        licenseFront: files.licenseFront[0].path, // Storing the file path
        licenseBack: files.licenseBack[0].path,   // Storing the file path
      });

      // Save the new driver
      await newDriver.save();
      res.status(201).json({ message: 'Driver registered successfully!' });
    } catch (err) {
      console.error('❌ Error saving driver:', err);
      res.status(500).json({ error: 'Failed to save driver data' });
    }
  }
);

// 📄 GET: Fetch all drivers (excluding images for performance reasons)
router.get('/drivers', async (req, res) => {
  try {
    // Exclude image data (file paths) for performance
    const drivers = await Driver.find({}, '-profilePhoto -licenseFront -licenseBack');
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
