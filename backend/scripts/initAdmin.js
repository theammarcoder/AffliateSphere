import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

dotenv.config();

const initAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'ammarahmadkhan757@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      email: 'ammarahmadkhan757@gmail.com',
      password: 'Ammar12@'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: ammarahmadkhan757@gmail.com');
    console.log('Password: Ammar12@');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

initAdmin();
