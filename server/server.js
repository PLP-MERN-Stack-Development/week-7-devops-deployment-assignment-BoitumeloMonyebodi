// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5055;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bugtracker';

app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });