export const mockArticles = [
  {
    source: { name: "TechCrunch" },
    title: "The Future of React: What to Expect in the Next Major Release",
    description: "A deep dive into the upcoming features of React, including Server Components, concurrent rendering improvements, and a new hook ecosystem.",
    url: "https://react.dev",
    urlToImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    publishedAt: new Date().toISOString(),
    content: "The React core team has been hard at work on the next major iteration of the popular library. With the introduction of React Server Components..."
  },
  {
    source: { name: "Wired" },
    title: "How Global State Management is Evolving in Modern Web Apps",
    description: "From Redux to Zustand and Jotai. Exploring the shift towards atomic and proxy-based state management in complex JavaScript applications.",
    url: "https://github.com/pmndrs/zustand",
    urlToImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    content: "State management has always been one of the most debated topics in the React ecosystem. For years, Redux was the undisputed king..."
  },
  {
    source: { name: "The Verge" },
    title: "Designing for the User: The Importance of Micro-Interactions",
    description: "Why subtle animations, loading states, and instant feedback loops are critical for user retention in 2026.",
    url: "https://tailwindcss.com",
    urlToImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    content: "When users interact with a digital product, they expect immediate visual feedback. A simple hover effect or a smooth transition can..."
  }
];