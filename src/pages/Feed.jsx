import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArticleCard from '../components/ArticleCard';
import SkeletonCard from '../components/SkeletonCard';

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('general');
  const [limit, setLimit] = useState(12);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchNews = async () => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY; 
    const url = debouncedSearch
      ? `https://newsapi.org/v2/everything?q=${debouncedSearch}&pageSize=${limit}&apiKey=${apiKey}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${limit}&apiKey=${apiKey}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    
    setLastUpdated(new Date().toLocaleTimeString());
    return data.articles;
  };

  const { data: articles, isError, isLoading } = useQuery({
    queryKey: ['news', category, debouncedSearch, limit],
    queryFn: fetchNews,
    refetchInterval: 60000, 
  });

  if (isError) {
    return (
      <div className="p-10 text-red-500 font-bold text-center border-2 border-red-500 rounded bg-red-50">
        Something went wrong. Please check your connection or API key and try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg w-full md:w-auto justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          Live as of {lastUpdated}
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto flex-grow justify-end">
          <div className="relative w-full md:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="w-full md:w-48 py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-700 cursor-pointer disabled:opacity-50" 
            value={category} 
            onChange={(e) => { setCategory(e.target.value); setSearchTerm(''); }}
            disabled={!!debouncedSearch}
          >
            <option value="general">🌐 General</option>
            <option value="technology">💻 Technology</option>
            <option value="business">📈 Business</option>
            <option value="sports">⚽ Sports</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading 
          ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          : articles?.filter(a => a.title !== '[Removed]').map((article, idx) => (
              <ArticleCard key={idx} article={article} />
            ))
        }
      </div>

      {!isLoading && articles?.length > 0 && (
        <button 
          onClick={() => setLimit(l => l + 12)} 
          className="w-full bg-slate-200 text-slate-800 font-bold p-4 rounded-lg mt-4 hover:bg-slate-300 transition-colors"
        >
          Load More Articles
        </button>
      )}
    </div>
  );
}