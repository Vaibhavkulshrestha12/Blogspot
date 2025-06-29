import React, { useState } from 'react';
import { Mail, Heart, Github, Twitter, Linkedin, Instagram, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNewsletter } from '../../hooks/useNewsletter';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { subscribeToNewsletter, loading } = useNewsletter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const success = await subscribeToNewsletter(email);
    if (success) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } else {
      setError('Failed to subscribe. Please try again.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-900/95 border-gray-800' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'
              }`}>
                WriterSpace
              </span>
            </div>
            <p className={`text-sm leading-relaxed mb-6 max-w-md ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              A sophisticated blogging platform where stories come to life. Discover compelling narratives, 
              insightful essays, and beautiful poetry crafted for the curious mind.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h3 className={`font-semibold text-sm sm:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Stay Updated
              </h3>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Successfully subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-600 text-white text-sm rounded-lg transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Send className="h-4 w-4" />
                    <span>Subscribe</span>
                  </button>
                </form>
              )}
              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Get notified when we publish new posts. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 text-sm sm:text-base ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Blog', href: '/' },
                { name: 'Poetry', href: '/poetry' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className={`font-semibold mb-4 text-sm sm:text-base ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              About
            </h3>
            <div className="space-y-3">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                WriterSpace is crafted with passion for storytelling and beautiful design.
              </p>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                <p className="mb-1">Created by:</p>
                <p className="font-medium">vaibhav with <Heart className="h-4 w-4 text-red-500 fill-current" /></p>
                <p>Powered by Koffee</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className={`mt-8 pt-6 sm:pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className={`text-sm text-center sm:text-left ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p className="flex items-center justify-center sm:justify-start space-x-1">
              <span>© {currentYear} WriterSpace. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for writers and readers.</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className={`text-xs ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Follow us:
            </span>
            <div className="flex items-center space-x-3">
              {[
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;