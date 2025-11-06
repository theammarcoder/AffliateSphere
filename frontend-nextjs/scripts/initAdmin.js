import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '.env.local' });

const initAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Define Admin Schema
    const adminSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'ammarahmadkhan757@gmail.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email: ammarahmadkhan757@gmail.com');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user with hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Ammar12@', salt);

    const admin = new Admin({
      email: 'ammarahmadkhan757@gmail.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: ammarahmadkhan757@gmail.com');
    console.log('Password: Ammar12@');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

initAdmin();
