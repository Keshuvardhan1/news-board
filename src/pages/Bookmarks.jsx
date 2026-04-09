import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Bookmarks() {
  const bookmarks = useStore((state) => state.bookmarks);
  const removeBookmarks = useStore((state) => state.removeBookmarks);

  const [sortType, setSortType] = useState('date');
  const [selected, setSelected] = useState([]);
  const [pendingDeletes, setPendingDeletes] = useState([]);
  const deleteTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) {
        clearTimeout(deleteTimerRef.current);
        if (pendingDeletes.length > 0) {
          removeBookmarks(pendingDeletes);
        }
      }
    };
  }, [pendingDeletes, removeBookmarks]);

  const sortedAndFilteredBookmarks = [...bookmarks]
    .filter((b) => !pendingDeletes.includes(b.url))
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
      if (sortType === 'source') {
        return a.source.name.localeCompare(b.source.name);
      }
      if (sortType === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const toggleSelect = (url) => {
    if (selected.includes(url)) {
      setSelected(selected.filter((item) => item !== url));
    } else {
      setSelected([...selected, url]);
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    setPendingDeletes(selected);
    setSelected([]);

    deleteTimerRef.current = setTimeout(() => {
      removeBookmarks(selected);
      setPendingDeletes([]);
      deleteTimerRef.current = null;
    }, 5000);
  };

  const handleUndo = () => {
    if (deleteTimerRef.current) {
      clearTimeout(deleteTimerRef.current);
      deleteTimerRef.current = null;
    }
    setPendingDeletes([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-100 p-4 rounded shadow-sm gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Your Bookmarks</h1>
        
        <div className="flex gap-4 items-center w-full md:w-auto">
          <label className="text-sm font-semibold text-slate-600">Sort By:</label>
          <select
            className="border border-slate-300 p-2 rounded bg-white flex-grow md:flex-grow-0"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="date">Date Saved</option>
            <option value="source">News Source</option>
            <option value="title">Article Title</option>
          </select>
        </div>
      </div>

      {pendingDeletes.length > 0 && (
        <div className="bg-slate-900 text-white p-4 rounded-lg shadow-lg flex justify-between items-center sticky top-4 z-10 animate-pulse">
          <span className="font-semibold">Deleting {pendingDeletes.length} article(s)...</span>
          <button 
            onClick={handleUndo}
            className="bg-white text-slate-900 px-4 py-2 rounded font-bold hover:bg-slate-200 transition-colors"
          >
            Undo Delete
          </button>
        </div>
      )}

      {selected.length > 0 && pendingDeletes.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">
          <span className="font-semibold text-blue-800">{selected.length} items selected</span>
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {sortedAndFilteredBookmarks.length === 0 && pendingDeletes.length === 0 ? (
        <div className="text-center p-10 bg-slate-50 rounded-lg border border-slate-200 text-slate-500">
          <p className="text-xl font-bold mb-2">No bookmarks yet</p>
          <p>Head to the feed and click the star icon to save articles for later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredBookmarks.map((article, idx) => {
            const isSelected = selected.includes(article.url);
            const articleId = encodeURIComponent(article.url);

            return (
              <div 
                key={idx} 
                className={`border-2 p-4 rounded-lg flex flex-col justify-between bg-white transition-all cursor-pointer ${
                  isSelected ? 'border-blue-500 shadow-md ring-2 ring-blue-100' : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
                onClick={() => toggleSelect(article.url)}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      readOnly
                      className="w-5 h-5 mt-1 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">
                      {article.source.name}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg mb-2 leading-tight">{article.title}</h2>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link 
                    to={`/article/${articleId}`} 
                    state={{ article }}
                    onClick={(e) => e.stopPropagation()} 
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}