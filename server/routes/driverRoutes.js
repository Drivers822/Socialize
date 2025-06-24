const express = require('express');
const multer = require('multer');
const Driver = require('../models/Driver');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// 🚀 POST: Register a driver
router.post(
  '/register-driver',
  upload.fields([
    { name: 'profilePhoto' },
    { name: 'licenseFront' },
    { name: 'licenseBack' },
  ]),
  async (req, res) => {
    try {
      const data = req.body;

      const newDriver = new Driver({
        ...data,
        licenseVerified: data.licenseVerified === 'true',
        profilePhoto: req.files?.profilePhoto?.[0]?.buffer || null,
        licenseFront: req.files?.licenseFront?.[0]?.buffer || null,
        licenseBack: req.files?.licenseBack?.[0]?.buffer || null,
      });

      await newDriver.save();
      res.status(201).json({ message: 'Driver registered successfully!' });
    } catch (err) {
      console.error('❌ Error saving driver:', err);
      res.status(500).json({ error: 'Failed to save driver data' });
    }
  }
);

// 📄 GET: Admin fetch all drivers (exclude image blobs)
router.get('/drivers', async (req, res) => {
  try {
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
    console.error('❌ Delete driver error:', err);
    res.status(500).json({ error: 'Failed to delete driver' });
  }
});

module.exports = router;
