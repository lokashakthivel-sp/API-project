import { getWeatherData, getWeatherDataByCoords } from "./js/api/weatherAPI.js";
import { getQueryNewsData } from "./js/api/newsAPI.js";
import { renderWeather, renderNews } from "./js/ui.js";

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".content-section");
const results = document.querySelectorAll(".result");

const navMenu = document.getElementById("nav-menu");
const menuClose = document.getElementById("menu-close");

// ham menu for smaller screen
document.getElementById("menu-ham").addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menuClose.style.display = navMenu.classList.contains("show")
    ? "block"
    : "none";
});

menuClose.addEventListener("click", () => {
  navMenu.classList.remove("show");
  menuClose.style.display = "none";
});

// for switching between the section from nav btns
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active  from all
    navButtons.forEach((b) => b.classList.remove("active"));
    sections.forEach((s) => s.classList.remove("active"));
    results.forEach((r) => {
      r.innerHTML = "";
    });
    // add active to clicked button and corresponding section
    btn.classList.add("active");
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});

const weather_form = document.getElementById("weather-form");
const news_search_form = document.getElementById("news-search-form");

const weather_loader = document.getElementById("weather-loader");
const news_loader = document.getElementById("news-loader");

// searched location weather
weather_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  document.getElementById("city").value = "";
  if (!city) return;
  weather_loader.style.display = "block";
  const weather_data = await getWeatherData(city);
  weather_loader.style.display = "none";
  renderWeather(weather_data);
});

// my location weather
document.getElementById("weather-my-location").addEventListener("click", () => {
  if (navigator.geolocation) {
    weather_loader.style.display = "block";
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weather_data = await getWeatherDataByCoords(latitude, longitude);
        weather_loader.style.display = "none";
        renderWeather(weather_data);
      },
      (error) => {
        weather_loader.style.display = "none";
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
  news_loader.style.display = "block";
  const news_data = await getQueryNewsData(query, sortOrder);
  news_loader.style.display = "none";
  renderNews(news_data);
});
