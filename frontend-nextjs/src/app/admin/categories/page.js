'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import Alert from '@/components/Alert';
import { Plus, Edit2, Trash2, Grid } from 'lucide-react';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setAlert({ type: 'error', message: 'Failed to load categories' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setAlert({ type: 'error', message: 'Category name is required' });
      return;
    }

    try {
      if (editingCategory) {
        const response = await axios.put(`/api/categories/${editingCategory._id}`, {
          name: categoryName
        });
        if (response.data.success) {
          setAlert({ type: 'success', message: 'Category updated successfully' });
          fetchCategories();
        }
      } else {
        const response = await axios.post('/api/categories', {
          name: categoryName
        });
        if (response.data.success) {
          setAlert({ type: 'success', message: 'Category created successfully' });
          fetchCategories();
        }
      }
      
      handleCloseModal();
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to save category' 
      });
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(`/api/categories/${categoryId}`);
      if (response.data.success) {
        setAlert({ type: 'success', message: 'Category deleted successfully' });
        fetchCategories();
      }
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to delete category' 
      });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading categories..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Category Management
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Organize your products by creating and managing categories
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
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

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl p-6 group hover:border-purple-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Grid size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text">{category.name}</h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{category.slug}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 bg-purple-500/20 hover:bg-purple-500 text-purple-500 hover:text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(category)}
                  className="flex-1 bg-red-500/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl text-center py-20">
          <Grid size={64} className="mx-auto text-light-textSecondary dark:text-dark-textSecondary mb-4" />
          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">No Categories Yet</h3>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
            Create your first category to start organizing products
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="categoryName" className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Electronics, Home & Kitchen"
                  className="w-full px-4 py-3 bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-purple-500 text-light-text dark:text-dark-text"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-4 py-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-light-bg dark:bg-dark-bg border border-red-500 rounded-xl p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Delete Category?</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              Are you sure you want to delete "<strong className="text-light-text dark:text-dark-text">{deleteConfirm.name}</strong>"? 
              This action cannot be undone.
            </p>
            <p className="text-sm text-yellow-500 mb-6">
              Note: You cannot delete a category that has products assigned to it.
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
