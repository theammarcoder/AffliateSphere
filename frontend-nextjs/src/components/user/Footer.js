'use client';

import Link from 'next/link';
import { Mail, ExternalLink, Linkedin, Facebook, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-bgSecondary dark:bg-dark-bgSecondary border-t border-light-border dark:border-dark-border mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <span className="text-xl font-bold gradient-text">
                AffiliateSphere
              </span>
            </div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
              Discover the best products with AI-powered recommendations and exclusive affiliate deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href="mailto:ammarahmadkhan757@gmail.com"
                className="flex items-center gap-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">ammarahmadkhan757@gmail.com</span>
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 btn-primary text-sm"
              >
                Send Message
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-border dark:border-dark-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
              &copy; {currentYear} AffiliateSphere. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/amaar-mazhar-99bb30343/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary group-hover:text-primary-500 transition-colors" />
              </a>
              <a
                href="https://web.facebook.com/ammar.ahmad.538543"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary group-hover:text-primary-500 transition-colors" />
              </a>
              <a
                href="https://github.com/theammarcoder"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-light-bgSecondary dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary group-hover:text-primary-500 transition-colors" />
              </a>
            </div>
            
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary-500 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
