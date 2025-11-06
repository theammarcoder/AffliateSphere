'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import Alert from '@/components/Alert';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function EditProduct() {
  const params = useParams();
  const id = params.id;
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    price: '',
    rating: '0',
    affiliateLink: '',
    buttonText: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesResponse = await axios.get('/api/categories');
      if (categoriesResponse.data.success) {
        setCategories(categoriesResponse.data.categories);
      }

      // Fetch product
      const productResponse = await axios.get(`/api/products/${id}`);
      if (productResponse.data.success) {
        const product = productResponse.data.product;
        setFormData({
          title: product.title,
          description: product.description,
          image: product.image,
          category: product.category._id,
          price: product.price.toString(),
          rating: product.rating.toString(),
          affiliateLink: product.affiliateLink,
          buttonText: product.buttonText || '',
          tags: product.tags ? product.tags.join(', ') : ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAlert({ type: 'error', message: 'Failed to load product' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image || 
        !formData.category || !formData.price || !formData.affiliateLink || !formData.buttonText) {
      setAlert({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    try {
      setSaving(true);
      
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      const productData = {
        ...formData,
        tags: tagsArray,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating)
      };

      const response = await axios.put(`/api/products/${id}`, productData);

      if (response.data.success) {
        setAlert({ type: 'success', message: 'Product updated successfully!' });
        setTimeout(() => {
          router.push('/admin/products');
        }, 1500);
      }
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to update product' 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading product..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/admin/products')}
          className="flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-purple-500 transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          Edit Product
        </h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">
          Update product information
        </p>
      </div>

      {/* Alert */}
      {alert && (
        <div className="mb-6">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Form */}
      <div className="bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Wireless Bluetooth Headphones"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Product Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed product description..."
                rows="5"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text resize-none"
                required
              ></textarea>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Product Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                required
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 rounded-lg object-cover border border-light-border dark:border-dark-border"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128?text=Invalid+Image';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Affiliate Link */}
            <div className="md:col-span-2">
              <label htmlFor="affiliateLink" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Affiliate Link *
              </label>
              <input
                type="url"
                id="affiliateLink"
                name="affiliateLink"
                value={formData.affiliateLink}
                onChange={handleChange}
                placeholder="https://amazon.com/product-name/dp/..."
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="29.99"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="4.5"
                step="0.1"
                min="0"
                max="5"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
              />
            </div>

            {/* Button Text */}
            <div>
              <label htmlFor="buttonText" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Buy Button Text *
              </label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                placeholder="e.g., Buy on Amazon, Get Deal, Shop Now"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                required
              />
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="wireless, bluetooth, audio"
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 border-t border-light-border dark:border-dark-border">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="flex-1 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-4 py-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Updating Product...
                </>
              ) : (
                'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
