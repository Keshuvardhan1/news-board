import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      bookmarks: [],
      history: [],
      
      toggleBookmark: (article) => set((state) => {
        const exists = state.bookmarks.find(b => b.url === article.url);
        if (exists) {
          return { bookmarks: state.bookmarks.filter(b => b.url !== article.url) };
        }
        return { bookmarks: [...state.bookmarks, article] };
      }),
      
      removeBookmarks: (urls) => set((state) => ({
        bookmarks: state.bookmarks.filter(b => !urls.includes(b.url))
      })),
      
      addToHistory: (entry) => set((state) => ({
        history: [entry, ...state.history] // puts newest at the top
      })),
      
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'news-board-storage' }
  )
);