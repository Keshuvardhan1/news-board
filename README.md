# NewsBoard 🗞️ - React Screening Exercise

A modern, responsive multi-screen news reading application built for a React Developer screening exercise. It features background data refreshing, debounced search, persistent global state, and a highly polished UI.

## Tech Stack
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **State Management:** Zustand (with `persist` middleware)
* **Data Fetching:** TanStack Query (React Query)
* **API:** NewsAPI.org

## Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Keshuvardhan1/news-board.git
   cd news-board

# Reflection

## Top 3 Good Practices Applied

1. **Debouncing API Requests** (`src/pages/Feed.jsx`, lines 13-16)
   Instead of firing a network request on every single keystroke in the search bar, I implemented a local `useEffect` timer to debounce the input. This waits for the user to stop typing for 500ms before updating the search state and triggering React Query, saving significant API quota and preventing race conditions.

2. **Persistent Global State with Zustand** (`src/store/useStore.js`, lines 4-33)
   To keep the Bookmarks and History in sync across the Feed and Detail screens without heavy prop-drilling or complex context providers, I used Zustand. I wrapped the store in Zustand's `persist` middleware, which automatically syncs the state to `localStorage`. This fulfilled the requirement for data persistence across page reloads with minimal boilerplate.

3. **Component Extraction & Skeleton Loading** (`src/components/ArticleCard.jsx` & `src/components/SkeletonCard.jsx`)
   To adhere to DRY (Don't Repeat Yourself) principles, I extracted the complex UI for the article cards into a reusable component. I also implemented a `SkeletonCard` component to display a pulsing, layout-matching placeholder while React Query fetches data. This drastically improves the perceived performance and UX compared to a basic text loading state.

## Challenge Faced
**Implementing the 5-Second Bulk Undo Delete**
The requirement to delete multiple bookmarks but offer a 5-second "Undo" window was tricky. If I immediately removed the items from the global Zustand store, undoing it would mean having to re-insert them (potentially losing their original order or requiring complex history tracking). However, they needed to disappear from the UI instantly so the user felt their action was acknowledged.

## How I Solved It
Process: I decided to decouple the *visual* deletion from the *actual* data deletion.
1. When the user clicks "Delete Selected", I move the selected URLs into a local `pendingDeletes` state array rather than removing them from the global store. 
2. In the render method, I filter out any articles that are in `pendingDeletes`. This makes them instantly vanish from the screen.
3. I use a `useRef` to store a `setTimeout` for 5 seconds. If the timer finishes, it triggers the actual `removeBookmarks` action in the Zustand store and clears the local pending state.
4. If the user clicks "Undo" before the 5 seconds are up, I simply run `clearTimeout()` on the ref and empty the `pendingDeletes` array, which makes the items instantly reappear in the UI. 
5. Finally, I added a `useEffect` cleanup function to ensure that if the user navigates away from the Bookmarks page while the 5-second timer is still ticking, the deletion is officially committed to the global store rather than lost.