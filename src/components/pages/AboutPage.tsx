import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Users, Heart, Target, Award, Mail, PenTool } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { theme } = useTheme();

  const teamMembers = [
    {
      name: 'Editorial Team',
      role: 'Content Creators',
      description: 'Passionate writers and poets dedicated to crafting compelling stories.',
      icon: PenTool
    },
    {
      name: 'Community',
      role: 'Our Readers',
      description: 'The heart of WriterSpace - readers who inspire us to create better content.',
      icon: Users
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Writing',
      description: 'We believe in the power of words to inspire, educate, and transform lives.'
    },
    {
      icon: Target,
      title: 'Quality Content',
      description: 'Every piece we publish is carefully crafted and thoughtfully curated.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our platform and content.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="text-center mb-16">
        <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          About{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Blogspot
          </span>
        </h1>
        <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A sophisticated blogging platform where stories come to life, ideas flourish, 
          and the art of writing is celebrated in all its forms.
        </p>
      </div>

      
      <div className={`rounded-2xl p-8 mb-16 border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50'
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Our Mission
        </h2>
        <p className={`text-lg leading-relaxed text-center max-w-3xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Blogspot exists to provide a beautiful, distraction-free environment where writers 
          can share their thoughts, stories, and poetry with the world. We believe that every 
          voice deserves to be heard and every story deserves to be told with elegance and grace.
        </p>
      </div>

      
      <div className="mb-16">
        <h2 className={`text-3xl font-bold mb-12 text-center ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className={`text-center p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800/30 border-gray-700/50'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 w-fit mx-auto mb-4">
                <value.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {value.title}
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mb-16">
        <h2 className={`text-3xl font-bold mb-12 text-center ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className={`p-8 rounded-xl border text-center ${
              theme === 'dark'
                ? 'bg-gray-800/30 border-gray-700/50'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 w-fit mx-auto mb-4">
                <member.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {member.name}
              </h3>
              <p className={`text-amber-500 font-medium mb-3`}>
                {member.role}
              </p>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`text-center p-8 rounded-2xl border ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-700/50'
          : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-lg'
      }`}>
        <Mail className={`h-12 w-12 mx-auto mb-4 ${
          theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
        }`} />
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Get in Touch
        </h3>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Have questions or want to contribute? We'd love to hear from you.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
        >
          <Mail className="h-5 w-5" />
          <span>Contact Us</span>
        </a>
      </div>
    </div>
  );
};

export default AboutPage;