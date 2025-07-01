
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogLayout from './components/blog/BlogLayout';
import BlogHome from './components/blog/BlogHome';
import BlogOnly from './components/blog/BlogOnly';
import PoetryHome from './components/blog/PoetryHome';
import PostView from './components/blog/PostView';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import PostEditor from './components/admin/PostEditor';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPage from './components/pages/PrivacyPage';
import TermsPage from './components/pages/TermsPage';

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<BlogHome />} />
          <Route path="blog" element={<BlogOnly />} />
          <Route path="poetry" element={<PoetryHome />} />
          <Route path="post/:id" element={<PostView />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>

      
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="post/:id" element={<PostEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;