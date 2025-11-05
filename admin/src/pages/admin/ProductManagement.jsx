import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import { Plus, Edit2, Trash2, Package, Search, Star } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold gradient-text mb-2">Product Management</h1>
          <p className="text-gray-400">Manage your product catalog with AI assistance</p>
        </div>
        <Link
          to="/admin/products/add"
          className="btn-primary flex items-center gap-2 justify-center"
        >
          <Plus size={20} />
          Add Product
        </Link>
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
      <div className="card mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, description, or category..."
            className="input-field pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Products Table/Grid */}
      {filteredProducts.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Product</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Price</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Rating</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Tags</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-800 hover:bg-darker transition-colors">
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
                          <h3 className="font-semibold mb-1 truncate">{product.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold">${product.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {product.tags?.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags?.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{product.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="p-2 bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product)}
                          className="p-2 bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all"
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
        <div className="card text-center py-20">
          <Package size={64} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? 'No products found' : 'No Products Yet'}
          </h3>
          <p className="text-gray-400 mb-6">
            {searchQuery 
              ? 'Try adjusting your search query'
              : 'Add your first product to get started'
            }
          </p>
          {!searchQuery && (
            <Link
              to="/admin/products/add"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-dark border border-red-800 rounded-xl p-6 w-full max-w-md animate-scale-in">
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
                <p className="font-semibold">{deleteConfirm.title}</p>
                <p className="text-sm text-gray-400">{deleteConfirm.category?.name}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              This action cannot be undone. The product will be permanently removed from your catalog.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="btn-danger flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
