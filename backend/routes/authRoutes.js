import express from 'express';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      req.session.adminId = admin._id;
      req.session.adminEmail = admin.email;
      
      res.json({
        success: true,
        message: 'Login successful',
        admin: {
          id: admin._id,
          email: admin.email
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Admin logout
// @access  Private
router.post('/logout', protect, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout successful' });
  });
});

// @route   GET /api/auth/check
// @desc    Check if admin is authenticated
// @access  Private
router.get('/check', protect, (req, res) => {
  res.json({ 
    success: true, 
    authenticated: true,
    email: req.session.adminEmail 
  });
});

export default router;
