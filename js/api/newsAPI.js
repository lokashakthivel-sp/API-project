import { NEWS_API_KEY } from "../../config/config.js";
import { NEWS_API_URL } from "../../config/config.js";

export const getQueryNewsData = async (
  query,
  page,
  sortOrder = "publishedAt"
) => {
  //* NewsAPI doesn't work in static gh pages because newsAPI blocks direct calls from browser(client side), only from backend.
  //const url = `${NEWS_API_URL}/everything?q=${query}&sortBy=${sortOrder}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=6&language=en`;
  //* so use GNewsAPI (cons - only 100 requests/day)
  const url = `${NEWS_API_URL}/search?q=${query}&sortBy=${sortOrder}&apikey=${NEWS_API_KEY}&page=${page}&max=6&lang=en`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await res.json();
    return data.articles;
  } catch (err) {
    console.error(err);
    return null;
  }
};
