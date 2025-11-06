'use client';

import { useState } from 'react';
import axios from 'axios';
import Alert from '@/components/Alert';
import { Mail, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setAlert({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        setAlert({ type: 'success', message: response.data.message });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500/10 via-light-bg dark:via-dark-bg to-light-bg dark:to-dark-bg border-b border-light-border dark:border-dark-border transition-colors duration-300">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={40} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in{' '}
              <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary">
              Have a question or feedback? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
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

          {/* Contact Form */}
          <div className="card animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="input-field"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows="6"
                  className="input-field resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <a 
                href="mailto:ammarahmadkhan757@gmail.com"
                className="text-primary-500 hover:underline"
              >
                ammarahmadkhan757@gmail.com
              </a>
            </div>

            <div className="card text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
