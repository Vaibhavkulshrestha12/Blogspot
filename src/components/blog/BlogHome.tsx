import React from 'react';
import { useBlog } from '../../hooks/useBlog';
import { useTheme } from '../../contexts/ThemeContext';
import PostCard from './PostCard';
import LoadingSpinner from '../common/LoadingSpinner';

const BlogHome: React.FC = () => {
  const { getPublishedPosts, loading, error } = useBlog();
  const { theme } = useTheme();
  const blogPosts = getPublishedPosts('blog');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Error
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <div className="text-center mb-12 sm:mb-16">
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Stories Worth{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Reading
          </span>
        </h1>
        <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover compelling narratives, insightful essays, and thought-provoking content crafted for the curious mind.
        </p>
      </div>

      {/* Posts Grid */}
      {blogPosts.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            No Posts Yet
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
            Check back soon for new content.
          </p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {blogPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogHome;