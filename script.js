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

// for pagination of news api call
let query = "";
let sortOrder = "";
let newsPage = 1;
const loadMore = document.getElementById("load-more");
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
  query = document.getElementById("news-search").value.trim();
  document.getElementById("news-search").value = "";
  sortOrder = document.getElementById("sorting-select").value;
  if (!query && !sortOrder) return;
  newsPage = 1;
  news_loader.style.display = "block";
  const news_data = await getQueryNewsData(query, newsPage, sortOrder);
  news_loader.style.display = "none";
  renderNews(news_data);
  loadMore.style.display = news_data.length === 6 ? "block" : "none";
});

//load more button handle
loadMore.addEventListener("click", async () => {
  newsPage++;
  news_loader.style.display = "block";
  const news_data = await getQueryNewsData(query, newsPage, sortOrder);
  news_loader.style.display = "none";
  appendNews(news_data);
  loadMore.style.display = news_data.length === 6 ? "block" : "none";
});

const appendNews = (data) => {
  const newsResult = document.getElementById("news-result");
  if (!data || data.length === 0) {
    loadMore.style.display = "none";
    return;
  }
  data.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `<h4><a href="${article.url}" target="_blank">${
      article.title
    }</a></h4>
      <p>${article.description || ""}</p>
      <p><em>Source: ${article.source.name}</em></p>
      <p><em>Published At: ${article.publishedAt.toLocaleString()}</em></p>
      <img src="${article.image || ""}" alt="Article Image"/>
    `;
    newsResult.appendChild(card);
    requestAnimationFrame(() => card.classList.add("show"));
  });
};
