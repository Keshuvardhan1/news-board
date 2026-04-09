import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ArticleCard({ article }) {
  const bookmarks = useStore((state) => state.bookmarks);
  const toggleBookmark = useStore((state) => state.toggleBookmark);
  
  const isBookmarked = bookmarks.some(b => b.url === article.url);
  const articleId = encodeURIComponent(article.url);

  return (
    <div className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out overflow-hidden">
      <div>
        <div className="relative overflow-hidden rounded-xl mb-5">
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt="Thumbnail" 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
              No Image Available
            </div>
          )}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider shadow-sm">
            {article.source?.name || 'Unknown'}
          </div>
        </div>
        
        <h2 className="font-bold text-xl mb-3 leading-snug text-slate-800 line-clamp-3 group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h2>
      </div>
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
        <Link 
          to={`/article/${articleId}`} 
          state={{ article }} 
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/link"
        >
          Read Full Story 
          <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
        </Link>
        <button
          onClick={() => toggleBookmark(article)}
          className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isBookmarked 
              ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100' 
              : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-yellow-500'
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      </div>
    </div>
  );
}