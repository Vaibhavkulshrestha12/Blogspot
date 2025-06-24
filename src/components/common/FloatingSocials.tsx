import React, { useState } from 'react';
import { Twitter, Github, Linkedin, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingSocials: React.FC = () => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  const socials = [
    { 
      icon: Twitter, 
      href: 'https://twitter.com', 
      label: 'Twitter',
      color: 'hover:text-blue-400 hover:bg-blue-400/10'
    },
    { 
      icon: Github, 
      href: 'https://github.com', 
      label: 'GitHub',
      color: theme === 'dark' ? 'hover:text-white hover:bg-white/10' : 'hover:text-gray-900 hover:bg-gray-900/10'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600 hover:bg-blue-600/10'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com', 
      label: 'Instagram',
      color: 'hover:text-pink-500 hover:bg-pink-500/10'
    }
  ];

  return (
    <div className="fixed left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30">
      <div className="flex items-center">
        
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700'
              : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200'
          } backdrop-blur-sm`}
          title={isExpanded ? 'Hide socials' : 'Show socials'}
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        <div className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-w-xs opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'
        }`}>
          <div className="flex flex-col space-y-1 sm:space-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm border ${
                  theme === 'dark'
                    ? 'bg-transparent hover:bg-gray-800/40 text-gray-400 border-transparent'
                    : 'bg-transparent hover:bg-white/40 text-gray-600 border-transparent'
                } ${social.color}`}
                title={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingSocials;