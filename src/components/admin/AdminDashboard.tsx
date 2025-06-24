import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Eye, Edit, Trash2, Calendar, Clock, Tag, BookOpen, Heart } from 'lucide-react';
import { useBlog } from '../../hooks/useBlog';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard: React.FC = () => {
  const { posts, loading, deletePost } = useBlog();
  const { theme } = useTheme();

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deletePost(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const blogPosts = posts.filter(post => post.category === 'blog');
  const poetryPosts = posts.filter(post => post.category === 'poetry');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Dashboard
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your blog posts and content
          </p>
        </div>
        <Link
          to="/admin/post/new"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Post</span>
        </Link>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`rounded-xl p-6 border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FileText className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Published Posts
              </p>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {publishedPosts.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Edit className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Draft Posts
              </p>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {draftPosts.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Blog Posts
              </p>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {blogPosts.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Heart className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Poetry Posts
              </p>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {poetryPosts.length}
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50'
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className={`px-6 py-4 border-b ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            All Posts
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className={`h-12 w-12 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              No posts yet
            </h3>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get started by creating your first blog post.
            </p>
            <Link
              to="/admin/post/new"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Title
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Category
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-gray-700/50' : 'divide-gray-200'
              }`}>
                {posts.map((post) => (
                  <tr key={post.id} className={`transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-700/20' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-6 py-4">
                      <div>
                        <div className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {post.title}
                        </div>
                        <div className={`text-sm flex items-center space-x-4 mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime} min read</span>
                          </span>
                          {post.tags.length > 0 && (
                            <span className="flex items-center space-x-1">
                              <Tag className="h-3 w-3" />
                              <span>{post.tags.slice(0, 2).join(', ')}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        post.category === 'blog' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {post.category === 'blog' ? <BookOpen className="h-3 w-3 mr-1" /> : <Heart className="h-3 w-3 mr-1" />}
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm flex items-center space-x-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {post.status === 'published' && (
                          <Link
                            to={`/post/${post.id}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="View post"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          to={`/admin/post/${post.id}`}
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                          title="Edit post"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;