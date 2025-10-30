require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const seedAdmin = require('./seedAdmin');

app.use(express.json());
const cors = require('cors');
app.use(cors());

// other middleware and routes
const helpRoutes = require('./routes/helpRoutes');
app.use('/api/help', helpRoutes);

const accommodationRoutes = require('./routes/accommodationRoutes');
app.use('/api/accommodation', accommodationRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const donationRoutes = require("./routes/donationRoutes");
app.use("/api/donation", donationRoutes);

async function startServer() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is not set in environment. Set it in .env");
    process.exit(1);
  }
  try {
    // connect and wait for connection
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB');
    // run seeding after successful connection
    try {
      await seedAdmin();
      console.log('Seeding complete (if needed).');
    } catch (seedErr) {
      console.error('Seed admin error:', seedErr);
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();
