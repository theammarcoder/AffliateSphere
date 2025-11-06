'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Alert from '@/components/Alert';
import { LogIn, Home } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    axios.get('/api/auth/check', { withCredentials: true })
      .then(response => {
        if (response.data.success && response.data.authenticated) {
          router.push('/admin/dashboard');
        }
      })
      .catch(() => {
        // Not authenticated, stay on login page
      });
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setAlert({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', formData, { withCredentials: true });
      
      if (response.data.success) {
        router.push('/admin/dashboard');
      } else {
        setAlert({ type: 'error', message: response.data.message || 'Login failed' });
      }
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md animate-scale-in">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors mb-6"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">A</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Admin Login</h1>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">Sign in to access the admin panel</p>
          </div>

          {alert && (
            <div className="mb-6">
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary text-center">
              Protected area for authorized administrators only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

