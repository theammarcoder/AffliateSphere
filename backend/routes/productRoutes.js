import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { protect } from '../middleware/authMiddleware.js';
import { extractProductDetails } from '../services/geminiService.js';

const router = express.Router();

// @route   GET /api/products/debug
// @desc    Get all products with debug info for sorting fields
// @access  Public (for debugging)
router.get('/debug', async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    const debugInfo = products.map(p => ({
      id: p._id,
      title: p.title,
      price: p.price,
      priceType: typeof p.price,
      rating: p.rating,
      ratingType: typeof p.rating,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      hasCreatedAt: !!p.createdAt,
      hasUpdatedAt: !!p.updatedAt
    }));
    
    res.json({ 
      success: true, 
      count: products.length,
      products: debugInfo
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/products/fix-timestamps
// @desc    Fix missing timestamps and ratings for existing products (Dev/Admin utility)
// @access  Private (Admin only)
router.post('/fix-timestamps', protect, async (req, res) => {
  try {
    const products = await Product.find({});
    let updated = 0;
    
    for (const product of products) {
      let needsUpdate = false;
      
      // Fix missing createdAt
      if (!product.createdAt) {
        product.createdAt = new Date();
        needsUpdate = true;
      }
      
      // Fix missing updatedAt
      if (!product.updatedAt) {
        product.updatedAt = new Date();
        needsUpdate = true;
      }
      
      // Fix missing or invalid rating
      if (product.rating === undefined || product.rating === null || isNaN(product.rating)) {
        product.rating = 0;
        needsUpdate = true;
      }
      
      // Ensure price is a number
      if (typeof product.price !== 'number') {
        product.price = parseFloat(product.price) || 0;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await product.save();
        updated++;
      }
    }
    
    res.json({ 
      success: true, 
      message: `Fixed ${updated} products`, 
      total: products.length 
    });
  } catch (error) {
    console.error('Fix timestamps error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/products/extract-details
// @desc    Extract product details using Gemini AI
// @access  Private (Admin only)
router.post('/extract-details', protect, async (req, res) => {
  try {
    const { affiliateLink } = req.body;

    if (!affiliateLink || affiliateLink.trim() === '') {
      return res.status(400).json({ success: false, message: 'Affiliate link is required' });
    }

    const result = await extractProductDetails(affiliateLink);

    if (result.success) {
      res.json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error) {
    console.error('Extract details error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, minRating } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search in title, description, and tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Filter by minimum rating
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // When sorting by rating, exclude products with 0 rating
    if (sort === 'rating-desc') {
      query.rating = { $gt: 0 };
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'rating-desc':
        sortObj = { rating: -1, createdAt: -1 }; // Secondary sort by date
        break;
      case 'price-asc':
        sortObj = { price: 1, createdAt: -1 };
        break;
      case 'price-desc':
        sortObj = { price: -1, createdAt: -1 };
        break;
      case 'latest':
      default:
        sortObj = { createdAt: -1 };
        break;
    }

    console.log('Fetching products with query:', query); // Debug log
    console.log('Fetching products with sort:', sortObj); // Debug log
    console.log('Sort parameter received:', sort); // Debug log

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortObj)
      .lean(); // Use lean for better performance

    console.log(`Found ${products.length} products`); // Debug log
    
    // Debug: Log first few products with their sort-relevant fields
    if (products.length > 0) {
      console.log('Sample product data:', products.slice(0, 3).map(p => ({
        title: p.title,
        price: p.price,
        rating: p.rating,
        createdAt: p.createdAt
      })));
    }

    res.json({ success: true, products, count: products.length });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, image, category, price, rating, affiliateLink, buttonText, tags } = req.body;

    // Validation
    if (!title || !description || !image || !category || !price || !affiliateLink || !buttonText) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required (title, description, image, category, price, affiliateLink, buttonText)' 
      });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const product = new Product({
      title,
      description,
      image,
      category,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 0,
      affiliateLink,
      buttonText,
      tags: tags || []
    });

    await product.save();
    await product.populate('category', 'name slug');

    res.status(201).json({ success: true, product, message: 'Product created successfully' });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, description, image, category, price, rating, affiliateLink, buttonText, tags } = req.body;

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Verify category exists if being updated
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ success: false, message: 'Invalid category' });
      }
    }

    // Update fields
    if (title) product.title = title;
    if (description) product.description = description;
    if (image) product.image = image;
    if (category) product.category = category;
    if (price) product.price = parseFloat(price);
    if (rating !== undefined) product.rating = parseFloat(rating);
    if (affiliateLink) product.affiliateLink = affiliateLink;
    if (buttonText) product.buttonText = buttonText;
    if (tags !== undefined) product.tags = tags;

    await product.save();
    await product.populate('category', 'name slug');

    res.json({ success: true, product, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
