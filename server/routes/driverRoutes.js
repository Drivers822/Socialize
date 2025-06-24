const express = require('express');
const multer = require('multer');
const Driver = require('../models/Driver');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register-driver', upload.fields([
  { name: 'profilePhoto' },
  { name: 'licenseFront' },
  { name: 'licenseBack' }
]), async (req, res) => {
  try {
    const data = req.body;

    const newDriver = new Driver({
      ...data,
      licenseVerified: data.licenseVerified === 'true',
      profilePhoto: req.files.profilePhoto?.[0].buffer,
      licenseFront: req.files.licenseFront?.[0].buffer,
      licenseBack: req.files.licenseBack?.[0].buffer,
    });

    await newDriver.save();
    res.status(201).json({ message: 'Driver registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save driver data' });
  }
});

module.exports = router;
