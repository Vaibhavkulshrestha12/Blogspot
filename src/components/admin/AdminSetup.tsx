import React, { useState } from 'react';
import { Shield, User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { createAdminUser } from '../../utils/adminSetup';

const AdminSetup: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: 'Admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; uid?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await createAdminUser(formData.email, formData.password, formData.displayName);
    
    if (response.success) {
      setResult({
        success: true,
        message: 'Admin user created successfully! You can now sign in with these credentials.',
        uid: response.uid
      });
      setFormData({ email: '', password: '', displayName: 'Admin' });
    } else {
      setResult({
        success: false,
        message: response.error || 'Failed to create admin user'
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8">
      <div className={`rounded-2xl p-8 border shadow-2xl ${
        theme === 'dark' 
          ? 'bg-gray-800/90 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}>
        
        <div className="text-center mb-8">
          <div className="p-3 rounded-full bg-amber-500/20 text-amber-500 w-fit mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Setup
          </h1>
          <p className={`text-sm mt-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Create your admin account to access the dashboard
          </p>
        </div>

        {result?.success ? (
          <div className="text-center space-y-6">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <p className="text-green-400 font-medium mb-2">Admin Account Created!</p>
              <p className="text-sm text-green-300">{result.message}</p>
              {result.uid && (
                <p className="text-xs text-green-200 mt-2 font-mono">UID: {result.uid}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Go to Homepage</span>
              </Link>
              
              <button
                onClick={() => {
                  setResult(null);
                  setFormData({ email: '', password: '', displayName: 'Admin' });
                }}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Create Another Admin
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {result && !result.success && (
              <div className="p-4 rounded-lg border bg-red-500/10 border-red-500/20">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{result.message}</p>
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Display Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Admin"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Admin Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="admin@yourdomain.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Strong password (min 6 chars)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              {loading ? 'Creating Admin...' : 'Create Admin Account'}
            </button>
          </form>
        )}

        {!result?.success && (
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'
          }`}>
            <h3 className={`font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Security Notes:
            </h3>
            <ul className={`text-sm space-y-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Use a strong, unique password</li>
              <li>• Store credentials securely</li>
              <li>• Admin role grants full dashboard access</li>
              <li>• Multiple admin accounts can be created</li>
            </ul>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/"
            className={`text-sm transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;