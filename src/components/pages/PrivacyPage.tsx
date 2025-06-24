import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Shield, Eye, Lock, Database, Cookie, Mail } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information (email, display name) when you create an account',
        'Content you create (blog posts, comments, reactions)',
        'Usage data (pages visited, time spent, interactions)',
        'Device information (browser type, IP address, operating system)',
        'Newsletter subscription email addresses'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our blogging platform',
        'To personalize your experience and content recommendations',
        'To send newsletter updates (only if subscribed)',
        'To improve our services and user experience',
        'To communicate with you about your account or our services',
        'To ensure platform security and prevent abuse'
      ]
    },
    {
      icon: Lock,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'Published content is publicly visible by design',
        'We may share aggregated, non-personal data for analytics',
        'Legal compliance: We may disclose information if required by law',
        'Service providers: We use trusted third parties (Firebase) to operate our platform'
      ]
    },
    {
      icon: Cookie,
      title: 'Cookies and Tracking',
      content: [
        'We use essential cookies for platform functionality',
        'Analytics cookies to understand user behavior (anonymized)',
        'Preference cookies to remember your theme and settings',
        'You can control cookies through your browser settings',
        'Some features may not work properly without cookies'
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption for data transmission',
        'Your data is stored securely using Firebase infrastructure',
        'Regular security audits and updates',
        'Access controls and authentication measures',
        'However, no method of transmission is 100% secure'
      ]
    },
    {
      icon: Mail,
      title: 'Your Rights',
      content: [
        'Access: Request a copy of your personal data',
        'Correction: Update or correct your information',
        'Deletion: Request deletion of your account and data',
        'Portability: Export your content and data',
        'Unsubscribe: Opt out of newsletters at any time',
        'Contact us to exercise any of these rights'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     
      <div className="text-center mb-16">
        <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Privacy{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Policy
          </span>
        </h1>
        <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Your privacy is important to us. This policy explains how we collect, use, 
          and protect your information when you use WriterSpace.
        </p>
        <p className={`text-sm mt-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className={`rounded-2xl p-8 border ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                <section.icon className="h-6 w-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {section.title}
              </h2>
            </div>
            <ul className="space-y-3">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className={`flex items-start space-x-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500'
                  }`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`mt-12 p-8 rounded-2xl border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50'
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Contact Us About Privacy
        </h2>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          If you have any questions about this Privacy Policy, your data, or your rights, 
          please don't hesitate to contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/contact"
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
          >
            <Mail className="h-5 w-5" />
            <span>Contact Us</span>
          </a>
          <a
            href="mailto:privacy@writerspace.com"
            className={`inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 font-medium ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Mail className="h-5 w-5" />
            <span>privacy@writerspace.com</span>
          </a>
        </div>
      </div>

      
      <div className={`mt-8 p-6 rounded-xl border ${
        theme === 'dark'
          ? 'bg-amber-500/10 border-amber-500/20'
          : 'bg-amber-50 border-amber-200'
      }`}>
        <h3 className={`font-bold mb-2 ${
          theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
        }`}>
          Policy Changes
        </h3>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
        }`}>
          We may update this Privacy Policy from time to time. We will notify you of any 
          changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;