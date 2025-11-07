'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Menu, X, Home, Grid, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Header = ({ onSearch }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home page with search query
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      // Clear search if empty
      router.push('/');
    }
    
    // Legacy support for onSearch callback
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Auto-clear search when input becomes empty
    if (value === '' && searchParams.get('search')) {
      router.push('/');
    }
  };

  return (
    <header className="bg-white dark:bg-dark-bgSecondary border-b border-light-border dark:border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-dark-bgSecondary/95 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative transform group-hover:scale-110 transition-transform">
              <Image 
                src="/favicon.svg" 
                alt="AffiliateSphere Logo" 
                width={40} 
                height={40}
                className="w-full h-full"
                priority
              />
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
                onChange={handleSearchChange}
                placeholder="Search products, categories, or tags..."
                className="w-full bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              href="/categories" 
              className="flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors"
            >
              <Grid size={20} />
              <span>Categories</span>
            </Link>
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Contact
            </Link>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary-500 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-primary-500" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Button - Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-primary-500" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors p-3 rounded-lg hover:bg-light-bgSecondary dark:hover:bg-dark-bg"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link 
                href="/categories" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors p-3 rounded-lg hover:bg-light-bgSecondary dark:hover:bg-dark-bg"
              >
                <Grid size={20} />
                <span>Categories</span>
              </Link>
              <Link 
                href="/contact" 
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
