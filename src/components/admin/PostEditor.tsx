import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, EyeOff, ArrowLeft, FileText, Link as LinkIcon, X, Upload } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useBlog } from '../../hooks/useBlog';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';


const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, createPost, updatePost } = useBlog();
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const isEditing = id !== 'new';
  const existingPost = isEditing ? getPost(id!) : null;

  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: user?.displayName || user?.username || 'Editorial Team',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published',
    category: 'blog' as 'blog' | 'poetry',
    readTime: 1,
    imageUrl: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (existingPost) {
      setPost({
        title: existingPost.title,
        content: existingPost.content,
        excerpt: existingPost.excerpt,
        author: existingPost.author,
        tags: existingPost.tags,
        status: existingPost.status,
        category: existingPost.category,
        readTime: existingPost.readTime,
        imageUrl: existingPost.imageUrl || ''
      });
    }
  }, [existingPost]);

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ''); 
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleContentChange = (content: string) => {
    setPost(prev => ({
      ...prev,
      content,
      readTime: calculateReadTime(content)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

  
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }

    setImageUploading(true);

    try {
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPost(prev => ({ ...prev, imageUrl }));
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setImageUploading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!post.tags.includes(newTag)) {
        setPost(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!post.title.trim() || !post.content.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    setSaving(true);

    try {
      const postData = {
        ...post,
        status,
        excerpt: post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
      };

      if (isEditing) {
        await updatePost(id!, postData);
      } else {
        await createPost(postData);
      }

      navigate('/admin');
    } catch (error) {
      alert('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderPreview = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

 
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin')}
            className={`transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {isEditing ? 'Update your existing post' : 'Create a new blog post'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700/50 hover:bg-gray-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
          
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900'
            }`}
          >
            <Save className="h-4 w-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg transition-all duration-300"
          >
            <FileText className="h-4 w-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <div className={`rounded-xl p-6 border ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Post Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Title
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Category
                </label>
                <select
                  value={post.category}
                  onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value as 'blog' | 'poetry' }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="blog">Blog</option>
                  <option value="poetry">Poetry</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Featured Image
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <div className="relative flex-1">
                      <LinkIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="url"
                        value={post.imageUrl}
                        onChange={(e) => setPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={imageUploading}
                      />
                      <button
                        type="button"
                        disabled={imageUploading}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                        } ${imageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {imageUploading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-amber-500" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">Upload</span>
                      </button>
                    </div>
                  </div>
                  {post.imageUrl && (
                    <div className="relative">
                      <img 
                        src={post.imageUrl} 
                        alt="Featured" 
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <button
                        onClick={() => setPost(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Excerpt (Optional)
                </label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Brief description of your post..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Author
                </label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Tags
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Type a tag and press Enter..."
                />
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center bg-amber-500/20 text-amber-400 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-amber-300 hover:text-amber-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Estimated read time: {post.readTime} minute{post.readTime !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 border ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Content
            </h2>
            <div className={`quill-editor ${theme === 'dark' ? 'quill-dark' : ''}`}>
              <ReactQuill
                theme="snow"
                value={post.content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                style={{ height: '400px', marginBottom: '50px' }}
                placeholder="Write your post content here..."
              />
            </div>
          </div>
        </div>

        {showPreview && (
          <div className={`rounded-xl p-6 border ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Preview
            </h2>
            <div className="prose prose-lg max-w-none">
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              {post.title && (
                <h1 className={`text-3xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h1>
              )}
              <div className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {renderPreview(post.content)}
              </div>
            </div>
          </div>
        )}
      </div>

     
      <style jsx global>{`
        .quill-dark .ql-toolbar {
          border-color: #374151 !important;
          background-color: #1f2937 !important;
        }
        .quill-dark .ql-toolbar .ql-stroke {
          stroke: #9ca3af !important;
        }
        .quill-dark .ql-toolbar .ql-fill {
          fill: #9ca3af !important;
        }
        .quill-dark .ql-toolbar button:hover .ql-stroke {
          stroke: #f3f4f6 !important;
        }
        .quill-dark .ql-toolbar button:hover .ql-fill {
          fill: #f3f4f6 !important;
        }
        .quill-dark .ql-container {
          border-color: #374151 !important;
          background-color: #1f2937 !important;
        }
        .quill-dark .ql-editor {
          color: #f3f4f6 !important;
        }
        .quill-dark .ql-editor.ql-blank::before {
          color: #9ca3af !important;
        }
        .quill-dark .ql-tooltip {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #f3f4f6 !important;
        }
        .quill-dark .ql-tooltip input {
          background-color: #1f2937 !important;
          border-color: #4b5563 !important;
          color: #f3f4f6 !important;
        }
        
        /* Fix React Quill warnings */
        .ql-editor {
          line-height: 1.6;
        }
        .ql-editor p {
          margin-bottom: 1em;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
      `}</style>
    </div>
  );
};

export default PostEditor;