import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactEmail } from '../services/emailService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required (name, email, message)' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Save to database
    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();

    // Send email to admin (try but don't fail if email fails)
    try {
      await sendContactEmail(name, email, message);
    } catch (emailError) {
      console.log('Email sending failed, but message was saved to database');
    }

    res.status(201).json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PATCH /api/contact/:id/status
// @desc    Update contact message status
// @access  Private (Admin only)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    contact.status = status;
    await contact.save();

    res.json({ success: true, contact, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
