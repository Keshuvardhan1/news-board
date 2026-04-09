import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Feed from './pages/Feed';
import ArticleDetail from './pages/ArticleDetail';
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';

const queryClient = new QueryClient();

export default function App() {
  const navLinkStyle = ({ isActive }) => 
    `transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-white/20 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
        <Router>
          <nav className="bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-8">
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
                    NewsBoard.
                  </span>
                  <div className="hidden md:flex space-x-2">
                    <NavLink to="/" className={navLinkStyle}>Feed</NavLink>
                    <NavLink to="/bookmarks" className={navLinkStyle}>Bookmarks</NavLink>
                    <NavLink to="/history" className={navLinkStyle}>History</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </Router>
      </div>
    </QueryClientProvider>
  );
}