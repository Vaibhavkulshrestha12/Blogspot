import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  increment,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Post, BlogState, PostCategory } from '../types';
import { useAuth } from './useAuth';
import { useNewsletter } from './useNewsletter';

const POSTS_COLLECTION = 'posts';

export const useBlog = () => {
  const { user, isAuthenticated } = useAuth();
  const { notifySubscribers } = useNewsletter();
  const [state, setState] = useState<BlogState>({
    posts: [],
    currentPost: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = loadPosts();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loadPosts = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const postsQuery = query(
        collection(db, POSTS_COLLECTION),
        orderBy('publishedAt', 'desc')
      );

      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const posts: Post[] = [];
        snapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() } as Post);
        });
        
        setState(prev => ({
          ...prev,
          posts,
          loading: false
        }));
      }, (error) => {
        console.error('Error loading posts:', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to load posts. Please check your internet connection.',
          loading: false
        }));
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error setting up posts listener:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to load posts. Please check your internet connection.',
        loading: false
      }));
      return null;
    }
  };

  const getPost = (id: string): Post | null => {
    return state.posts.find(post => post.id === id) || null;
  };

  const uploadImage = async (file: File): Promise<string> => {
    throw new Error('Image upload is not available. Please use external image URLs.');
  };

  const createPost = async (postData: Omit<Post, 'id' | 'publishedAt' | 'updatedAt' | 'reactions' | 'authorId'>): Promise<Post> => {
    if (!user) throw new Error('User must be authenticated to create posts');

    const newPost = {
      ...postData,
      authorId: user.id,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reactions: { likes: 0, dislikes: 0, shares: 0 },
      isRecommended: postData.isRecommended || false
    };

    const docRef = await addDoc(collection(db, POSTS_COLLECTION), newPost);
    const createdPost = { id: docRef.id, ...newPost };

    if (postData.status === 'published') {
      const postUrl = `${window.location.origin}/post/${docRef.id}`;
      await notifySubscribers(postData.title, postData.excerpt, postUrl);
    }

    return createdPost;
  };

  const updatePost = async (id: string, updates: Partial<Post>): Promise<boolean> => {
    if (!user) throw new Error('User must be authenticated to update posts');

    try {
      const postRef = doc(db, POSTS_COLLECTION, id);
      const wasPublished = getPost(id)?.status === 'published';
      
      await updateDoc(postRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      if (!wasPublished && updates.status === 'published') {
        const post = getPost(id);
        if (post) {
          const postUrl = `${window.location.origin}/post/${id}`;
          await notifySubscribers(post.title, post.excerpt, postUrl);
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating post:', error);
      return false;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    if (!user) throw new Error('User must be authenticated to delete posts');

    try {
      await deleteDoc(doc(db, POSTS_COLLECTION, id));
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  };

  const toggleRecommendation = async (postId: string): Promise<boolean> => {
    if (!user || user.role !== 'admin') {
      throw new Error('Only admins can toggle recommendations');
    }

    try {
      const post = getPost(postId);
      if (!post) return false;

      const postRef = doc(db, POSTS_COLLECTION, postId);
      await updateDoc(postRef, {
        isRecommended: !post.isRecommended,
        updatedAt: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('Error toggling recommendation:', error);
      return false;
    }
  };

  const updateReactions = async (postId: string, type: 'likes' | 'dislikes' | 'shares'): Promise<boolean> => {
    try {
      
      const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '{}');
      const reactionKey = `${postId}_${type}`;
      
      if (localReactions[reactionKey]) {
        return false; 
      }
      
      localReactions[reactionKey] = true;
      localStorage.setItem('blog_reactions', JSON.stringify(localReactions));
      
      const postRef = doc(db, POSTS_COLLECTION, postId);
      await updateDoc(postRef, {
        [`reactions.${type}`]: increment(1)
      });
      
      return true;
    } catch (error) {
      console.error('Error updating reactions:', error);
      
      const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '{}');
      const reactionKey = `${postId}_${type}`;
      delete localReactions[reactionKey];
      localStorage.setItem('blog_reactions', JSON.stringify(localReactions));
      
      return false;
    }
  };

  const getPublishedPosts = (category?: PostCategory): Post[] => {
    let posts = state.posts.filter(post => post.status === 'published');
    if (category) {
      posts = posts.filter(post => post.category === category);
    }
    return posts;
  };

  const getRecommendedPosts = (): Post[] => {
    return state.posts.filter(post => post.status === 'published' && post.isRecommended);
  };

  const getUserReaction = async (postId: string): Promise<string | null> => {
   
    const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '{}');
    for (const type of ['likes', 'dislikes', 'shares']) {
      if (localReactions[`${postId}_${type}`]) {
        return type;
      }
    }
    return null;
  };

  const hasUserReacted = (postId: string, type: 'likes' | 'dislikes' | 'shares'): boolean => {
    const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '{}');
    return !!localReactions[`${postId}_${type}`];
  };

  return {
    ...state,
    loadPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    toggleRecommendation,
    updateReactions,
    getPublishedPosts,
    getRecommendedPosts,
    getUserReaction,
    hasUserReacted,
    uploadImage
  };
};