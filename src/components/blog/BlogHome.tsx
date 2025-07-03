import React, { useState } from 'react';
import { useBlog } from '../../hooks/useBlog';
import { useTheme } from '../../contexts/ThemeContext';
import PostCard from './PostCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { BookOpen, Heart, Filter, Grid, List, Star } from 'lucide-react';

const BlogHome: React.FC = () => {
  const { getPublishedPosts, getRecommendedPosts, loading, error } = useBlog();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'blog' | 'poetry'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

 
  const allPosts = getPublishedPosts();
  const blogPosts = getPublishedPosts('blog');
  const poetryPosts = getPublishedPosts('poetry');
  const recommendedPosts = getRecommendedPosts();

  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : selectedCategory === 'blog' 
      ? blogPosts 
      : poetryPosts;

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <div className="text-center mb-12 sm:mb-16">
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Welcome to{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            WriterSpace
          </span>
        </h1>
        <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover compelling narratives, insightful essays, and beautiful poetry crafted for the curious mind.
          A place where stories come to life and words dance with meaning.
        </p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className={`text-center p-4 sm:p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-800/30 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 w-fit mx-auto mb-3">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {blogPosts.length}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Blog Posts
          </div>
        </div>

        <div className={`text-center p-4 sm:p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-800/30 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 w-fit mx-auto mb-3">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {poetryPosts.length}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Poems
          </div>
        </div>

        <div className={`text-center p-4 sm:p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-800/30 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 w-fit mx-auto mb-3">
            <Filter className="h-6 w-6 text-white" />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {allPosts.length}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Total Posts
          </div>
        </div>
      </div>

     
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                : theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>All ({allPosts.length})</span>
            </span>
          </button>
          <button
            onClick={() => setSelectedCategory('blog')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'blog'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Blog ({blogPosts.length})</span>
            </span>
          </button>
          <button
            onClick={() => setSelectedCategory('poetry')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'poetry'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Poetry ({poetryPosts.length})</span>
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'list'
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-900'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="List view"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'grid'
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-900'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Grid view"
          >
            <Grid className="h-5 w-5" />
          </button>
        </div>
      </div>

      {recommendedPosts.length > 0 && (
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Recommended by Writer
              </h2>
              <p className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Handpicked stories and poems that showcase our best work
              </p>
            </div>
          </div>
          
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
              : 'space-y-6 sm:space-y-8'
          }>
            {recommendedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}



      <div className="mb-8">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {selectedCategory === 'all' 
            ? 'All Posts' 
            : selectedCategory === 'blog'
              ? 'Blog Posts'
              : 'Poetry Collection'
          }
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 w-fit mx-auto mb-6">
              {selectedCategory === 'blog' ? (
                <BookOpen className="h-8 w-8 text-white" />
              ) : selectedCategory === 'poetry' ? (
                <Heart className="h-8 w-8 text-white" />
              ) : (
                <Filter className="h-8 w-8 text-white" />
              )}
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {selectedCategory === 'all' 
                ? 'No Posts Yet' 
                : selectedCategory === 'blog'
                  ? 'No Blog Posts Yet'
                  : 'No Poetry Yet'
              }
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
              {selectedCategory === 'all' 
                ? 'Check back soon for new content.' 
                : `Check back soon for new ${selectedCategory === 'blog' ? 'blog posts' : 'poetry'}.`
              }
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
              : 'space-y-6 sm:space-y-8'
          }>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHome;