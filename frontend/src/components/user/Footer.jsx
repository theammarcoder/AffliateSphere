import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Linkedin, Facebook, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold">A</span>
              </div>
              <span className="text-xl font-bold gradient-text">
                AffiliateSphere
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover the best products with AI-powered recommendations and exclusive affiliate deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
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
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">ammarahmadkhan757@gmail.com</span>
              </a>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 btn-primary text-sm"
              >
                Send Message
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} AffiliateSphere. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/amaar-mazhar-99bb30343/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-darker border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://web.facebook.com/ammar.ahmad.538543"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-darker border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://github.com/theammarcoder"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-darker border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
            </div>
            
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors text-sm">
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
