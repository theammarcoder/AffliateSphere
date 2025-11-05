import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Home, Grid } from 'lucide-react';

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-dark border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-dark/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold">A</span>
            </div>
            <span className="text-2xl font-bold gradient-text hidden sm:block">
              AffiliateSphere
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, or tags..."
                className="w-full bg-darker border border-gray-700 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/categories" 
              className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
            >
              <Grid size={20} />
              <span>Categories</span>
            </Link>
            <Link 
              to="/contact" 
              className="btn-primary"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <form 
          onSubmit={handleSearch}
          className="md:hidden pb-4"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-darker border border-gray-700 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors p-3 rounded-lg hover:bg-darker"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link 
                to="/categories" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors p-3 rounded-lg hover:bg-darker"
              >
                <Grid size={20} />
                <span>Categories</span>
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary text-center"
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
