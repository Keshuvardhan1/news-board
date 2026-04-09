import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function History() {
  const history = useStore((state) => state.history);
  const clearHistory = useStore((state) => state.clearHistory);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-100 p-4 rounded shadow-sm gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Reading History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center p-10 bg-slate-50 rounded-lg border border-slate-200 text-slate-500">
          <p className="text-xl font-bold mb-2">No history yet</p>
          <p>Articles you read will appear here automatically.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((entry, idx) => {
            const articleId = encodeURIComponent(entry.article.url);

            return (
              <div key={idx} className="border border-slate-200 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-sm hover:shadow-md transition-shadow gap-4">
                <div className="flex-grow">
                  <h2 className="font-bold text-lg mb-1">{entry.article.title}</h2>
                  <div className="text-sm text-slate-500 flex flex-col md:flex-row gap-2 md:gap-4">
                    <span>Read on: {entry.date}</span>
                    <span className="font-semibold text-slate-700 md:border-l md:border-slate-300 md:pl-4">
                      Time spent: {entry.timeSpent}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/article/${articleId}`}
                  state={{ article: entry.article }}
                  className="whitespace-nowrap bg-slate-100 text-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-50 transition-colors"
                >
                  Read Again
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}