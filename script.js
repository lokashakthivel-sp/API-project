import { getWeatherData, getWeatherDataByCoords } from "./js/api/weatherAPI.js";
import { getNewsData } from "./js/api/newsAPI.js";
import { renderWeather, renderNews } from "./js/ui.js";

const weather_form = document.getElementById("weather-form");
const news_form = document.getElementById("news-form");

weather_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  if (!city) return;
  const weather_data = await getWeatherData(city);
  console.log(weather_data);
  renderWeather(weather_data);
});

document.getElementById("weather-my-location").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weather_data = await getWeatherDataByCoords(latitude, longitude);
        renderWeather(weather_data);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
      }
    );
  }
});

//TODO - add more options for news like top headlines by country/category or search from everything by user entered query
news_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const topic = document.getElementById("category-select").value.trim();
  if (!topic) return;
  const news_data = await getNewsData(topic);
  renderNews(news_data);
});
