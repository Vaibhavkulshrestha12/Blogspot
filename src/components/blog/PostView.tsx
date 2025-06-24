import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, User, BookOpen, Heart } from 'lucide-react';
import { useBlog } from '../../hooks/useBlog';
import { useTheme } from '../../contexts/ThemeContext';
import ReactionButtons from './ReactionButtons';
import LoadingSpinner from '../common/LoadingSpinner';

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, loading } = useBlog();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const post = getPost(id);

  if (!post || post.status !== 'published') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Post Not Found
          </h1>
          <p className={`mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The post you're looking for doesn't exist or has been removed.
          </p>
          <a 
            href="/"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReadTime = (minutes: number) => {
    return `${minutes} min read`;
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className={`text-4xl font-bold mb-6 mt-8 first:mt-0 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {paragraph.substring(2)}
          </h1>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className={`text-3xl font-bold mb-4 mt-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {paragraph.substring(3)}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className={`text-2xl font-bold mb-4 mt-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {paragraph.substring(4)}
          </h3>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className={`text-lg mb-4 leading-relaxed font-bold ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {paragraph.substring(2, paragraph.length - 2)}
          </p>
        );
      }
      if (paragraph.trim() === '') {
        return <div key={index} className="mb-2" />;
      }
      if (paragraph.match(/^\d+\./)) {
        return (
          <li key={index} className={`text-lg mb-2 leading-relaxed ml-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {paragraph.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className={`text-lg mb-2 leading-relaxed ml-4 list-disc ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {paragraph.substring(2)}
          </li>
        );
      }
      return (
        <p key={index} className={`text-lg mb-4 leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className={`rounded-2xl overflow-hidden border ${
        theme === 'dark'
          ? 'bg-gray-800/30 border-gray-700/50'
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        {post.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-8 sm:p-12">
         
          <header className="mb-8">
            <div className={`flex items-center space-x-4 text-sm mb-6 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatReadTime(post.readTime)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                {post.category === 'blog' ? (
                  <BookOpen className="h-4 w-4 text-blue-500" />
                ) : (
                  <Heart className="h-4 w-4 text-purple-500" />
                )}
                <span className={post.category === 'blog' ? 'text-blue-500' : 'text-purple-500'}>
                  {post.category}
                </span>
              </div>
            </div>

            <h1 className={`text-4xl sm:text-5xl font-bold mb-6 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-8">
                <Tag className={`h-4 w-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className={`text-sm px-3 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </header>

          
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>

          
          <div className={`mt-12 pt-8 border-t ${
            theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
          }`}>
            <ReactionButtons post={post} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostView;