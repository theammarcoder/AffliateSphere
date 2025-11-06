import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  affiliateLink: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true,
    trim: true,
    default: 'Buy Now'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

productSchema.index({ createdAt: -1 });
productSchema.index({ rating: -1 });
productSchema.index({ price: 1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

