import { RIDDLE_API_KEY, RIDDLE_API_URL } from "../../config/config.js";

export const getRiddleData = async () => {
  try {
    const res = await fetch(RIDDLE_API_URL, {
      headers: { "X-Api-Key": RIDDLE_API_KEY },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(err);
    return null;
  }
};
