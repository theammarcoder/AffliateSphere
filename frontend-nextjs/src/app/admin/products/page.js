'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import Alert from '@/components/Alert';
import { Plus, Edit2, Trash2, Package, Search, Star } from 'lucide-react';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setAlert({ type: 'error', message: 'Failed to load products' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.data.success) {
        setAlert({ type: 'success', message: 'Product deleted successfully' });
        fetchProducts();
      }
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to delete product' 
      });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading products..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Manage your product catalog with AI assistance
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/products/add')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 justify-center"
        >
          <Plus size={20} />
          Add Product
        </button>
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

      {/* Search Bar */}
      <div className="bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, description, or category..."
            className="w-full pl-12 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
        </div>
      </div>

      {/* Products Table/Grid */}
      {filteredProducts.length > 0 ? (
        <div className="bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Product</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Price</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Rating</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Tags</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64';
                          }}
                        />
                        <div className="max-w-xs">
                          <h3 className="font-semibold mb-1 truncate text-light-text dark:text-dark-text">{product.title}</h3>
                          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-purple-500/20 text-purple-500 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-light-text dark:text-dark-text">${product.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-light-text dark:text-dark-text">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {product.tags?.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-light-bg dark:bg-dark-bg text-light-textSecondary dark:text-dark-textSecondary px-2 py-1 rounded-full border border-light-border dark:border-dark-border"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags?.length > 2 && (
                          <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                            +{product.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                          className="p-2 bg-purple-500/20 hover:bg-purple-500 text-purple-500 hover:text-white rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product)}
                          className="p-2 bg-red-500/20 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl text-center py-20">
          <Package size={64} className="mx-auto text-light-textSecondary dark:text-dark-textSecondary mb-4" />
          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
            {searchQuery ? 'No products found' : 'No Products Yet'}
          </h3>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
            {searchQuery 
              ? 'Try adjusting your search query'
              : 'Add your first product to get started'
            }
          </p>
          {!searchQuery && (
            <button
              onClick={() => router.push('/admin/products/add')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-light-bg dark:bg-dark-bg border border-red-500 rounded-xl p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Delete Product?</h2>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={deleteConfirm.image}
                alt={deleteConfirm.title}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64';
                }}
              />
              <div>
                <p className="font-semibold text-light-text dark:text-dark-text">{deleteConfirm.title}</p>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{deleteConfirm.category?.name}</p>
              </div>
            </div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              This action cannot be undone. The product will be permanently removed from your catalog.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-4 py-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
