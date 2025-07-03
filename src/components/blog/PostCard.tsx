import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Heart, Share2, BookOpen, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Post } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { useBlog } from '../../hooks/useBlog';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { theme } = useTheme();
  const { updateReactions, hasUserReacted } = useBlog();
  const [loading, setLoading] = React.useState(false);
  const [localReactions, setLocalReactions] = React.useState(post.reactions);

  const userHasLiked = hasUserReacted(post.id, 'likes');
  const userHasDisliked = hasUserReacted(post.id, 'dislikes');

  React.useEffect(() => {
    setLocalReactions(post.reactions);
  }, [post.reactions]);

  const cleanHtmlContent = (html: string): string => {
   
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    return textContent.replace(/\s+/g, ' ').trim();
  };

  const getCleanExcerpt = (content: string, excerpt?: string): string => {
    if (excerpt) {
      return cleanHtmlContent(excerpt);
    }
    
    const cleanContent = cleanHtmlContent(content);
    return cleanContent.length > 150 
      ? cleanContent.substring(0, 150) + '...'
      : cleanContent;
  };

  const handleReaction = async (type: 'likes' | 'dislikes', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const hasReacted = type === 'likes' ? userHasLiked : userHasDisliked;
    
    if (hasReacted || loading) return;
    
    setLoading(true);
    
    setLocalReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    
    const success = await updateReactions(post.id, type);
    if (!success) {
      
      setLocalReactions(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
    }
    
    setLoading(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    const url = `${window.location.origin}/post/${post.id}`;
    
    setLoading(true);

    setLocalReactions(prev => ({
      ...prev,
      shares: prev.shares + 1
    }));

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: getCleanExcerpt(post.content, post.excerpt),
          url: url
        });
        await updateReactions(post.id, 'shares');
      } catch (error) {
     
        setLocalReactions(prev => ({
          ...prev,
          shares: prev.shares - 1
        }));
      }
    } else {
      
      try {
        await navigator.clipboard.writeText(url);
        await updateReactions(post.id, 'shares');
        
        const button = e.currentTarget as HTMLButtonElement;
        const span = button.querySelector('span:last-child');
        if (span) {
          const originalText = span.textContent;
          span.textContent = 'Copied!';
          setTimeout(() => {
            span.textContent = originalText;
          }, 2000);
        }
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        
        setLocalReactions(prev => ({
          ...prev,
          shares: prev.shares - 1
        }));
      }
    }
    
    setLoading(false);
  };

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

  return (
    <article className={`group rounded-xl overflow-hidden transition-all duration-300 border ${
      theme === 'dark'
        ? 'bg-gray-800/50 hover:bg-gray-800/70 border-gray-700/50 hover:border-gray-600/50'
        : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
    }`}>
      {post.imageUrl && (
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className={`flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
            <span className="sm:hidden">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{formatReadTime(post.readTime)}</span>
          </div>
          <div className="flex items-center space-x-1">
            {post.category === 'blog' ? (
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
            ) : (
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
            )}
            <span className={post.category === 'blog' ? 'text-blue-500' : 'text-purple-500'}>
              {post.category}
            </span>
          </div>
        </div>

        <Link 
          to={`/post/${post.id}`}
          className="block mb-4 group-hover:text-amber-500 transition-colors"
        >
          <h2 className={`text-xl sm:text-2xl font-bold mb-3 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed line-clamp-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {getCleanExcerpt(post.content, post.excerpt)}
          </p>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-amber-500 font-medium text-sm sm:text-base">{post.author}</span>
            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                <Tag className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div className="flex space-x-1 sm:space-x-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span 
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className={`flex items-center justify-center space-x-2 sm:space-x-4 mt-6 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
        }`}>
          <button
            onClick={(e) => handleReaction('likes', e)}
            disabled={userHasLiked || loading}
            className={`flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
              userHasLiked
                ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-gray-700/50 hover:bg-red-500/20 text-gray-300 hover:text-red-400'
                  : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ThumbsUp className={`h-3 w-3 sm:h-4 sm:w-4 ${userHasLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{localReactions.likes}</span>
          </button>

          <button
            onClick={(e) => handleReaction('dislikes', e)}
            disabled={userHasDisliked || loading}
            className={`flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
              userHasDisliked
                ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-gray-700/50 hover:bg-gray-600/20 text-gray-300 hover:text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-500'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ThumbsDown className={`h-3 w-3 sm:h-4 sm:w-4 ${userHasDisliked ? 'fill-current' : ''}`} />
            <span className="font-medium">{localReactions.dislikes}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={loading}
            className={`flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
              theme === 'dark'
                ? 'bg-gray-700/50 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400'
                : 'bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-medium">{localReactions.shares}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;