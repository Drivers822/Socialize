const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import route handlers
const driverRoutes = require('./routes/driverRoutes');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse form data (multipart/form-data)

// ✅ Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// ✅ Mount routes
app.use('/api', driverRoutes);             // For driver registration, deletion, listing
app.use('/api/admin', adminRoutes);       // For admin login/register (auth)
app.use('/api/customer', customerRoutes); // For customer booking, view, etc.

// ✅ Default route for testing
app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
