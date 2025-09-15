export const renderWeather = (data) => {
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = ""; // Clear previous results
  if (!data) {
    weatherResult.innerHTML = "<p>Error fetching weather data.</p>";
    return;
  }
  weatherResult.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
};

export const renderNews = (data) => {
  const newsResult = document.getElementById("news-result");
  newsResult.innerHTML = "";
  if (!data || data.length === 0) {
    newsResult.innerHTML = "<p>No news articles found.</p>";
    return;
  }
  newsResult.innerHTML = data
    .map(
      (article) => `
          <div class="news-article">
              <h4><a href="${article.url}" target="_blank">${
        article.title
      }</a></h4>
                <p>${article.description || ""}</p>
                <p><em>Source: ${article.source.name}</em></p>
                <img src="${
                  article.urlToImage || ""
                }" alt="Article Image" style="max-width: 100%; height: auto;" />
            </div>
        `
    )
    .join("");
};
