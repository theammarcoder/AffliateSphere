import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Grid, Package } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesResponse = await axios.get('/api/categories');
      if (categoriesResponse.data.success) {
        const cats = categoriesResponse.data.categories;
        setCategories(cats);

        // Fetch product count for each category
        const productsResponse = await axios.get('/api/products');
        if (productsResponse.data.success) {
          const products = productsResponse.data.products;
          const productCount = {};
          
          cats.forEach(cat => {
            productCount[cat._id] = products.filter(p => p.category._id === cat._id).length;
          });
          
          setCategoryProducts(productCount);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/?category=${categoryId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darker">
        <LoadingSpinner size="lg" text="Loading categories..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darker">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-darker to-darker border-b border-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Grid size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Browse by{' '}
              <span className="gradient-text">Category</span>
            </h1>
            <p className="text-xl text-gray-400">
              Explore our curated collection organized by category
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className="card-hover text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Grid size={28} />
                  </div>
                  <div className="bg-darker px-3 py-1 rounded-full">
                    <span className="text-sm text-gray-400">
                      {categoryProducts[category._id] || 0} products
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-400 text-sm">
                  Explore {category.name.toLowerCase()} products
                </p>

                <div className="mt-4 flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="text-sm font-semibold">View Products</span>
                  <Package size={16} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Grid size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No categories available yet</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Categories;
