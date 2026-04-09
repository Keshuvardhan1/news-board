export default function SkeletonCard() {
  return (
    <div className="border border-slate-200 p-4 rounded-lg shadow-sm flex flex-col justify-between bg-white animate-pulse">
      <div>
        <div className="w-full h-40 bg-slate-200 rounded mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
        <div className="h-10 bg-slate-200 rounded w-28"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
}