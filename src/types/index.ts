export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  status: 'draft' | 'published';
  readTime: number;
  category: 'blog' | 'poetry';
  imageUrl?: string;
  reactions: {
    likes: number;
    dislikes: number;
    shares: number;
  };
}

export interface User {
  id: string;
  username?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading?: boolean;
}

export interface BlogState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

export interface Reaction {
  id?: string;
  postId: string;
  userId: string;
  type: 'like' | 'dislike';
  timestamp: string;
}

export type PostCategory = 'blog' | 'poetry';