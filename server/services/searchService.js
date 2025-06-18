const fetch = require('node-fetch');

async function searchWeb(query) {
  const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`DuckDuckGo API error: ${response.status}`);
  }
  const data = await response.json();

  // Extract relevant results
  const results = [];

  if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
    for (const topic of data.RelatedTopics) {
      if (topic.Text && topic.FirstURL) {
        results.push({
          text: topic.Text,
          url: topic.FirstURL
        });
      } else if (topic.Topics) {
        for (const sub of topic.Topics) {
          if (sub.Text && sub.FirstURL) {
            results.push({ text: sub.Text, url: sub.FirstURL });
          }
        }
      }
      if (results.length >= 5) break;
    }
  }

  return results;
}

module.exports = { searchWeb };