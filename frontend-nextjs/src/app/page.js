'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '@/components/user/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (sortBy) params.append('sort', sortBy);
      if (searchQuery) params.append('search', searchQuery);

      const url = `/api/products?${params.toString()}`;
      const response = await axios.get(url);
      
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500/10 via-light-bg dark:via-dark-bg to-light-bg dark:to-dark-bg border-b border-light-border dark:border-dark-border transition-colors duration-300">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing{' '}
              <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary mb-8">
              Find the best deals with AI-powered recommendations and exclusive affiliate offers
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Explore Products
              </button>
              <a href="#filters" className="btn-secondary">
                Filter & Search
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section id="filters" className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c._id === selectedCategory)?.name}
              <span className="text-light-textSecondary dark:text-dark-textSecondary text-lg ml-2">({products.length})</span>
            </h2>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
              Sorted by: <span className="text-primary-500 font-medium">
                {sortBy === 'latest' ? 'Latest Products' : 
                 sortBy === 'rating-desc' ? 'Highest Rated' : 
                 sortBy === 'price-asc' ? 'Price: Low to High' : 
                 'Price: High to Low'}
              </span>
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn-secondary flex items-center gap-2"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${showFilters ? '' : 'max-md:hidden'}`}>
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary mb-3">CATEGORY</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-primary-500 text-white'
                        : 'bg-light-bgSecondary dark:bg-dark-bg text-light-textSecondary dark:text-dark-textSecondary hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category._id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category._id
                          ? 'bg-primary-500 text-white'
                          : 'bg-light-bgSecondary dark:bg-dark-bg text-light-textSecondary dark:text-dark-textSecondary hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h4 className="text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary mb-3">SORT BY</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="latest">Latest Products</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                {sortBy === 'rating-desc' && (
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
                    ℹ️ Only showing products with ratings
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3" id="products">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading products..." />
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" key={`products-${sortBy}-${selectedCategory}`}>
                {products.map((product, index) => (
                  <ProductCard key={`${product._id}-${index}-${sortBy}`} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-lg">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
