'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Package, Grid, Clock, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats/dashboard', { withCredentials: true });
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">Welcome back! Here&apos;s an overview of your affiliate store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card group hover:border-primary-500/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-1">Total Products</p>
              <h3 className="text-3xl font-bold">{stats?.totalProducts || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package size={24} className="text-primary-500" />
            </div>
          </div>
          <Link href="/admin/products" className="text-primary-500 text-sm mt-4 inline-block hover:underline">
            View all products →
          </Link>
        </div>

        <div className="card group hover:border-primary-500/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-1">Categories</p>
              <h3 className="text-3xl font-bold">{stats?.totalCategories || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Grid size={24} className="text-pink-500" />
            </div>
          </div>
          <Link href="/admin/categories" className="text-primary-500 text-sm mt-4 inline-block hover:underline">
            Manage categories →
          </Link>
        </div>

        <div className="card group hover:border-primary-500/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-1">Recent (7 days)</p>
              <h3 className="text-3xl font-bold">{stats?.recentProductsCount || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={24} className="text-blue-500" />
            </div>
          </div>
          <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mt-4">
            Products added this week
          </p>
        </div>

        <div className="card group hover:border-primary-500/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-1">System Status</p>
              <h3 className="text-xl font-bold text-green-500">Online</h3>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity size={24} className="text-green-500" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              DB: <span className="text-green-500">{stats?.systemStatus?.database}</span>
            </p>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              AI: <span className="text-green-500">{stats?.systemStatus?.geminiAPI}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recently Added Products</h2>
          <Link href="/admin/products/add" className="btn-primary">
            Add New Product
          </Link>
        </div>

        {stats?.recentProducts && stats.recentProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentProducts.map((product) => (
                  <tr key={product._id} className="border-b border-light-border dark:border-dark-border hover:bg-light-bgSecondary dark:hover:bg-dark-bg transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48';
                          }}
                        />
                        <span className="font-medium">{product.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-primary-500/20 text-primary-500 px-3 py-1 rounded-full text-sm">
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold">${product.price}</td>
                    <td className="py-4 px-4">
                      <span className="text-yellow-500">★ {product.rating}</span>
                    </td>
                    <td className="py-4 px-4 text-light-textSecondary dark:text-dark-textSecondary">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-light-textSecondary dark:text-dark-textSecondary">No products added in the last 7 days</p>
            <Link href="/admin/products/add" className="btn-primary mt-4 inline-block">
              Add Your First Product
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="/admin/products/add" className="card-hover text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Add Product</h3>
          <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">Use AI to quickly add new products</p>
        </Link>

        <Link href="/admin/categories" className="card-hover text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Grid size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Manage Categories</h3>
          <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">Organize your product catalog</p>
        </Link>

        <Link href="/admin/products" className="card-hover text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Activity size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">View All Products</h3>
          <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">Browse and edit existing products</p>
        </Link>
      </div>
    </div>
  );
}

