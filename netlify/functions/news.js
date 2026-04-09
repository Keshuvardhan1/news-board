exports.handler = async function(event) {
  const { search, category, limit } = event.queryStringParameters;
  
  const API_KEY = process.env.VITE_NEWS_API_KEY;

  const url = search
    ? `https://newsapi.org/v2/everything?q=${search}&pageSize=${limit}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${limit}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    };
  }
}