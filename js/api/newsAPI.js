import { NEWS_API_KEY } from "../../config/config.js";
import { NEWS_API_URL } from "../../config/config.js";

export const getQueryNewsData = async (query,page, sortOrder = "publishedAt") => {
  const url = `${NEWS_API_URL}/everything?q=${query}&sortBy=${sortOrder}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=6&language=en`;
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
