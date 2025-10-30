// seedAdmin.js -- creates a default admin user if not present
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seedAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sakhi.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    // Check if an admin already exists
    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashed,
        role: 'admin',
        isApproved: true
      });
      console.log('Admin created:', adminEmail);
    } else {
      console.log('Admin already exists:', adminEmail);
    }
  } catch (err) {
    console.error('Seed admin error:', err);
  }
}

module.exports = seedAdmin;

// Allow running directly: node seedAdmin.js
if (require.main === module) {
  const mongoose = require('mongoose');
  require('dotenv').config();

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI not set in .env");
    process.exit(1);
  }

  mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
      await seedAdmin();
      console.log('Seeding done. Exiting.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error connecting to MongoDB for seeding:', err);
      process.exit(1);
    });
}
