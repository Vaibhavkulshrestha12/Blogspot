import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, LogOut, Home, Settings, User, BookOpen, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import UnifiedAuthModal from '../auth/UnifiedAuthModal';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={`${
        theme === 'dark' 
          ? 'bg-gray-900/95 border-gray-800' 
          : 'bg-white/95 border-gray-200'
      } backdrop-blur-sm border-b sticky top-0 z-40 transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           
            <Link 
              to="/" 
              className={`flex items-center space-x-2 ${
                theme === 'dark' ? 'text-white hover:text-amber-400' : 'text-gray-900 hover:text-amber-500'
              } transition-colors group`}
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-300">
                <PenTool className="h-5 w-5 text-white" />
              </div>
             
              <span className={`text-xl font-bold hidden md:block ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'
              }`}>
                WriterSpace
              </span>
            </Link>

            
            <nav className="hidden lg:flex items-center space-x-6">
              {!isAdminRoute && (
                <>
                  <Link 
                    to="/" 
                    className={`${
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-colors flex items-center space-x-1 ${
                      location.pathname === '/' ? 'text-amber-500' : ''
                    }`}
                  >
                    
                 
                  </Link>
                  <Link 
                    to="/blog" 
                    className={`${
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-colors flex items-center space-x-1 ${
                      location.pathname === '/blog' ? 'text-amber-500' : ''
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Blog</span>
                  </Link>
                  <Link 
                    to="/poetry" 
                    className={`${
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-colors flex items-center space-x-1 ${
                      location.pathname === '/poetry' ? 'text-amber-500' : ''
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Poetry</span>
                  </Link>
                </>
              )}

             
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {isAuthenticated && user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`${
                    theme === 'dark' ? 'text-gray-300 hover:text-amber-400' : 'text-gray-600 hover:text-amber-500'
                  } transition-colors flex items-center space-x-1`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || user.username}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className={`text-sm hidden xl:inline ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {user?.displayName || user?.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className={`${
                      theme === 'dark' ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
                    } transition-colors flex items-center space-x-1`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden xl:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                >
                  Sign In
                </button>
              )}
            </nav>

            
            <div className="lg:hidden flex items-center space-x-2">
            
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

         
          {mobileMenuOpen && (
            <div className={`lg:hidden border-t ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'
            } backdrop-blur-sm`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {!isAdminRoute && (
                  <>
                    <Link 
                      to="/" 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${
                        theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      } transition-colors flex items-center space-x-2 px-3 py-2 rounded-md ${
                        location.pathname === '/' ? 'text-amber-500 bg-amber-500/10' : ''
                      }`}
                    >
                      
                      
                    </Link>
                    <Link 
                      to="/blog" 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${
                        theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      } transition-colors flex items-center space-x-2 px-3 py-2 rounded-md ${
                        location.pathname === '/blog' ? 'text-amber-500 bg-amber-500/10' : ''
                      }`}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Blog</span>
                    </Link>
                    <Link 
                      to="/poetry" 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${
                        theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      } transition-colors flex items-center space-x-2 px-3 py-2 rounded-md ${
                        location.pathname === '/poetry' ? 'text-amber-500 bg-amber-500/10' : ''
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Poetry</span>
                    </Link>
                  </>
                )}

                {isAuthenticated && user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${
                      theme === 'dark' ? 'text-gray-300 hover:text-amber-400 hover:bg-gray-800' : 'text-gray-600 hover:text-amber-500 hover:bg-gray-100'
                    } transition-colors flex items-center space-x-2 px-3 py-2 rounded-md`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}

                {isAuthenticated && (
                  <div className="space-y-1">
                    <div className={`flex items-center space-x-2 px-3 py-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || user.username}
                          className="h-6 w-6 rounded-full"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <span className="text-sm">{user?.displayName || user?.username}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className={`${
                        theme === 'dark' ? 'text-gray-300 hover:text-red-400 hover:bg-gray-800' : 'text-gray-600 hover:text-red-500 hover:bg-gray-100'
                      } transition-colors flex items-center space-x-2 px-3 py-2 rounded-md w-full text-left`}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <UnifiedAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;