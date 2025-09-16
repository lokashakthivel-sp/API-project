import { getWeatherData, getWeatherDataByCoords } from "./js/api/weatherAPI.js";
import { getQueryNewsData } from "./js/api/newsAPI.js";
import { renderWeather, renderNews } from "./js/ui.js";

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".content-section");
const results = document.querySelectorAll(".result");

// ham menu for smaller screen
document.getElementById("menu-ham").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("show");
  document.getElementById("menu-close").style.display = document
    .getElementById("nav-menu")
    .classList.contains("show")
    ? "block"
    : "none";
});

document.getElementById("menu-close").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.remove("show");
  document.getElementById("menu-close").style.display = "none";
});

// for switching between the section from nav btns
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active  from all
    navButtons.forEach((b) => b.classList.remove("active"));
    sections.forEach((s) => s.classList.remove("active"));
    results.forEach((r) => {
      r.innerHTML = "";
      console.log(r);
    });
    // add active to clicked button and corresponding section
    btn.classList.add("active");
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});

const weather_form = document.getElementById("weather-form");
const news_search_form = document.getElementById("news-search-form");

// searched location weather
weather_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  document.getElementById("city").value = "";
  if (!city) return;
  const weather_data = await getWeatherData(city);
  console.log(weather_data);
  renderWeather(weather_data);
});

// my location weather
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

// news of searched query
news_search_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("news-search").value.trim();
  document.getElementById("news-search").value = "";
  const sortOrder = document.getElementById("sorting-select").value;
  if (!query && !sortOrder) return;
  const news_data = await getQueryNewsData(query, sortOrder);
  renderNews(news_data);
});
