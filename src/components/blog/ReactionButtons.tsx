import React, { useState, useEffect } from 'react';
import { Heart, ThumbsDown, Share2, Check } from 'lucide-react';
import { Post } from '../../types';
import { useBlog } from '../../hooks/useBlog';
import { useTheme } from '../../contexts/ThemeContext';

interface ReactionButtonsProps {
  post: Post;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
  const { updateReactions, hasUserReacted } = useBlog();
  const { theme } = useTheme();
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localReactions, setLocalReactions] = useState(post.reactions);

  const userHasLiked = hasUserReacted(post.id, 'likes');
  const userHasDisliked = hasUserReacted(post.id, 'dislikes');

  useEffect(() => {
    setLocalReactions(post.reactions);
  }, [post.reactions]);

  const handleReaction = async (type: 'likes' | 'dislikes') => {
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

  const handleShare = async () => {
    if (loading) return;
    
    const url = `${window.location.origin}/post/${post.id}`;
    
    setLoading(true);
    setShared(true);

    setLocalReactions(prev => ({
      ...prev,
      shares: prev.shares + 1
    }));

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url
        });
        await updateReactions(post.id, 'shares');
      } catch (error) {
       
        setShared(false);
        setLocalReactions(prev => ({
          ...prev,
          shares: prev.shares - 1
        }));
      }
    } else {
    
      try {
        await navigator.clipboard.writeText(url);
        await updateReactions(post.id, 'shares');
        setTimeout(() => setShared(false), 2000);
      } catch (error) {
       
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        await updateReactions(post.id, 'shares');
        setTimeout(() => setShared(false), 2000);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center space-x-8">
      <button
        onClick={() => handleReaction('likes')}
        disabled={userHasLiked || loading}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
          userHasLiked
            ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
            : theme === 'dark'
              ? 'bg-gray-700/50 hover:bg-red-500/20 text-gray-300 hover:text-red-400'
              : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Heart className={`h-5 w-5 ${userHasLiked ? 'fill-current' : ''}`} />
        <span className="font-medium">{localReactions.likes}</span>
        <span className="text-sm">Like{localReactions.likes !== 1 ? 's' : ''}</span>
      </button>

      <button
        onClick={() => handleReaction('dislikes')}
        disabled={userHasDisliked || loading}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
          userHasDisliked
            ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed'
            : theme === 'dark'
              ? 'bg-gray-700/50 hover:bg-gray-600/20 text-gray-300 hover:text-gray-400'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-500'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <ThumbsDown className={`h-5 w-5 ${userHasDisliked ? 'fill-current' : ''}`} />
        <span className="font-medium">{localReactions.dislikes}</span>
        <span className="text-sm">Dislike{localReactions.dislikes !== 1 ? 's' : ''}</span>
      </button>

      <button
        onClick={handleShare}
        disabled={loading}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-700/50 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400'
            : 'bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {shared ? (
          <Check className="h-5 w-5" />
        ) : (
          <Share2 className="h-5 w-5" />
        )}
        <span className="font-medium">{localReactions.shares}</span>
        <span className="text-sm">{shared ? 'Copied!' : 'Share'}</span>
      </button>
    </div>
  );
};

export default ReactionButtons;