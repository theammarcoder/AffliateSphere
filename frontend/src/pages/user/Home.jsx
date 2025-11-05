import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/user/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, searchQuery]);

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
      console.log('Fetching products from:', url);
      console.log('Sort parameter:', sortBy);

      const response = await axios.get(url);
      console.log('Products received:', response.data);
      
      if (response.data.success) {
        setProducts(response.data.products);
        console.log('Products count:', response.data.products.length);
        
        // Debug: Log products with sort-relevant data
        console.log('Products with sorting data:', response.data.products.map(p => ({
          title: p.title,
          price: p.price,
          rating: p.rating,
          createdAt: p.createdAt
        })));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-darker to-darker border-b border-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing{' '}
              <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
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
              <span className="text-gray-400 text-lg ml-2">({products.length})</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sorted by: <span className="text-primary font-medium">
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
                <h4 className="text-sm font-semibold text-gray-400 mb-3">CATEGORY</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-darker text-gray-300 hover:bg-gray-800'
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
                          ? 'bg-primary text-white'
                          : 'bg-darker text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">SORT BY</h4>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    console.log('Sorting changed to:', e.target.value);
                    setSortBy(e.target.value);
                  }}
                  className="input-field w-full"
                >
                  <option value="latest">Latest Products</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                {sortBy === 'rating-desc' && (
                  <p className="text-xs text-gray-500 mt-2">
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
                <p className="text-gray-400 text-lg">No products found</p>
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
};

export default Home;
