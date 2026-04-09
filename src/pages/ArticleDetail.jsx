import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  const toggleBookmark = useStore((state) => state.toggleBookmark);
  const bookmarks = useStore((state) => state.bookmarks);
  const addToHistory = useStore((state) => state.addToHistory);

  const isBookmarked = bookmarks.some(b => b?.url === article?.url);

  useEffect(() => {
    if (!article) return;
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpentMs = endTime - startTime;
      const minutes = Math.floor(timeSpentMs / 60000);
      const seconds = Math.floor((timeSpentMs % 60000) / 1000);
      const formattedTime = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

      addToHistory({
        article,
        timeSpent: formattedTime,
        date: new Date().toLocaleString()
      });
    };
  }, [article, addToHistory]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article not found</h2>
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
          Return to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <button 
        onClick={() => navigate(-1)} 
        className="group flex items-center gap-2 text-slate-500 font-semibold mb-8 hover:text-indigo-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Feed
      </button>

      <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {article.urlToImage && (
          <div className="w-full h-[400px] relative">
            <img src={article.urlToImage} alt="Header" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                {article.source.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        )}

        <div className="p-8 md:p-12">
          {!article.urlToImage && (
            <>
              <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2 block">
                {article.source.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                {article.title}
              </h1>
            </>
          )}

          <div className="flex items-center text-sm text-slate-500 font-medium mb-8 pb-8 border-b border-slate-100">
            <span>Published on {new Date(article.publishedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <div className="prose prose-lg prose-indigo max-w-none text-slate-700 leading-relaxed">
            <p className="text-xl text-slate-600 font-medium mb-6">
              {article.description}
            </p>
            <p>
              {article.content ? article.content.split('[+')[0] : 'Full content not provided by API.'}
            </p>
          </div>
        </div>
      </article>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-grow md:flex-grow-0 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors text-center shadow-md hover:shadow-lg"
          >
            Read Full Story on {article.source.name}
          </a>
          
          <button
            onClick={() => toggleBookmark(article)}
            className={`px-6 py-3 border-2 rounded-xl font-bold transition-all flex gap-2 items-center justify-center min-w-[160px] ${
              isBookmarked 
                ? 'border-yellow-400 bg-yellow-50 text-yellow-600 shadow-sm' 
                : 'border-slate-200 text-slate-600 bg-white hover:border-indigo-200 hover:text-indigo-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {isBookmarked ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}