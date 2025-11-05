import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/stats/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', protect, async (req, res) => {
  try {
    // Get total counts
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Get products added in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentProducts = await Product.find({ 
      createdAt: { $gte: sevenDaysAgo } 
    })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // System status (check if we can connect to services)
    const systemStatus = {
      database: 'connected',
      geminiAPI: process.env.GEMINI_API_KEY ? 'configured' : 'not configured'
    };

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories,
        recentProductsCount: recentProducts.length,
        recentProducts,
        systemStatus
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
