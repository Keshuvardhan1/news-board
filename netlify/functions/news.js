// netlify/functions/news.js
exports.handler = async function(event) {
  const { search, category, limit } = event.queryStringParameters;
  const API_KEY = process.env.VITE_NEWS_API_KEY;

  const url = search && search !== 'undefined'
    ? `https://newsapi.org/v2/everything?q=${search}&pageSize=${limit}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${limit}&apiKey=${API_KEY}`;

  try {
    // We add a fake "User-Agent" so NewsAPI doesn't block our serverless function as a bot
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'NewsBoard-WebApp/1.0',
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();

    // Check if NewsAPI actually returned an error message inside the JSON
    if (data.status === 'error') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.message })
      };
    }

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