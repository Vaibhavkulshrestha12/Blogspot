import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FileText, Users, Shield, AlertTriangle, Scale, Mail } from 'lucide-react';

const TermsPage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using WriterSpace, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our platform',
        'These terms apply to all visitors, users, and others who access the service',
        'We reserve the right to update these terms at any time without prior notice'
      ]
    },
    {
      icon: FileText,
      title: 'Use of the Service',
      content: [
        'WriterSpace is a blogging platform for sharing written content and poetry',
        'You must be at least 13 years old to use this service',
        'You are responsible for maintaining the confidentiality of your account',
        'You agree to use the service only for lawful purposes',
        'You will not use the service to harass, abuse, or harm others'
      ]
    },
    {
      icon: Shield,
      title: 'Content and Conduct',
      content: [
        'You retain ownership of content you create and publish on WriterSpace',
        'By publishing content, you grant us a license to display and distribute it',
        'You are solely responsible for the content you post',
        'Content must not violate any laws or infringe on others\' rights',
        'We reserve the right to remove content that violates these terms',
        'Prohibited content includes: spam, hate speech, illegal material, copyrighted content'
      ]
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: [
        'WriterSpace and its original content are protected by copyright and other laws',
        'You may not copy, modify, or distribute our platform without permission',
        'User-generated content remains the property of its creators',
        'You must respect the intellectual property rights of others',
        'Report any copyright infringement to us immediately'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimers and Limitations',
      content: [
        'WriterSpace is provided "as is" without warranties of any kind',
        'We do not guarantee the accuracy or reliability of user-generated content',
        'We are not liable for any damages arising from your use of the service',
        'Our liability is limited to the maximum extent permitted by law',
        'You use the service at your own risk'
      ]
    },
    {
      icon: Mail,
      title: 'Account Termination',
      content: [
        'You may delete your account at any time through your account settings',
        'We may suspend or terminate accounts that violate these terms',
        'Upon termination, your right to use the service ceases immediately',
        'We may retain certain information as required by law or for legitimate business purposes',
        'Termination does not affect any rights or obligations that arose before termination'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Terms of{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Service
          </span>
        </h1>
        <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          These terms and conditions outline the rules and regulations for the use of WriterSpace.
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

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className={`p-8 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Governing Law
          </h3>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            These terms are governed by and construed in accordance with applicable laws. 
            Any disputes will be resolved through appropriate legal channels.
          </p>
        </div>

        <div className={`p-8 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Severability
          </h3>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            If any provision of these terms is found to be unenforceable, 
            the remaining provisions will continue to be valid and enforceable.
          </p>
        </div>
      </div>

      <div className={`mt-12 p-8 rounded-2xl border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50'
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Questions About These Terms?
        </h2>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          If you have any questions about these Terms of Service, please contact us. 
          We're here to help clarify any concerns you may have.
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
            href="mailto:legal@writerspace.com"
            className={`inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 font-medium ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Mail className="h-5 w-5" />
            <span>legal@writerspace.com</span>
          </a>
        </div>
      </div>

      
      <div className={`mt-8 p-6 rounded-xl border ${
        theme === 'dark'
          ? 'bg-blue-500/10 border-blue-500/20'
          : 'bg-blue-50 border-blue-200'
      }`}>
        <h3 className={`font-bold mb-2 ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
        }`}>
          Changes to Terms
        </h3>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
        }`}>
          We reserve the right to modify these terms at any time. Changes will be effective 
          immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;