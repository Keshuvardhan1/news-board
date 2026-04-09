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
**Production API Restrictions (CORS / 426 Error)**
During deployment, I encountered a critical issue: NewsAPI recently updated their Free Tier rules to aggressively block requests coming from deployed production domains. While the app worked perfectly on `localhost`, deploying it to Netlify resulted in the browser blocking the fetch requests entirely. This meant the app would crash in production despite the code being completely valid.

## How I Solved It
I bypassed the client-side browser restrictions by building a Backend-for-Frontend (BFF) proxy using **Netlify Serverless Functions**. 

1. I created a Node.js serverless function (`netlify/functions/news.js`) to handle the actual communication with NewsAPI. Since the request now comes from a backend server instead of a browser, NewsAPI accepts it.
2. I moved the `VITE_NEWS_API_KEY` out of the Vite environment and into Netlify's secure backend environment variables. This had the added bonus of completely hiding the API key from the client's network tab, drastically improving security.
3. I updated the React `fetchNews` function to call my local serverless endpoint (`/.netlify/functions/news`) instead of the external NewsAPI URL. 

This solution not only fixed the deployment crash but also resulted in a much more secure and production-ready architecture.