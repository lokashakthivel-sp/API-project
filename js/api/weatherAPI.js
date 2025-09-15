import { WEATHER_API_KEY } from "../../config/config.js";
import { WEATHER_API_URL } from "../../config/config.js";

export const getWeatherData = async (city) => {
  const url = `${WEATHER_API_URL}?q=${encodeURIComponent(
    city
  )}&appid=${WEATHER_API_KEY}&units=metric`; //encodeURIComponent to handle spaces and special characters
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getWeatherDataByCoords = async (lat, lon) => {
  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch weather data by coordinates");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
