export const renderWeather = (data) => {
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = ""; // Clear previous results
  if (!data) {
    weatherResult.innerHTML = "<p>Error fetching weather data.</p>";
    return;
  }

  const card = document.createElement("div");
  card.className = "weather-card";
  card.innerHTML = `
    <div class="w-left" aria-hidden="true">
      <div class="w-icon">
        <img alt="${
          data.weather[0].description
        }" src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png" width="72" height="72" />
      </div>
      <div class="w-temp">${data.main.temp + "°C"}
      </div>
      <div class="small">Feels like ${data.main.feels_like + "°C"}</div>
    </div>

    <div class="w-right">
      <div>
        <div class="location">${
          data.name || "" + " " + data.sys.country || ""
        }</div>
        <div class="desc">${data.weather[0].description}</div>
      </div>

      <div class="stats" role="list">
        <div class="stat" role="listitem">Rain:<span>${
          data.main.humidity
        }</span></div>
        <div class="stat" role="listitem">Wind:<span>${
          data.wind.speed
        }</span></div>
        <div class="stat" role="listitem">Pressure:<span>${
          data.main.pressure
        }</span></div>
      </div>

     <div class="small" style="margin-top:0.5rem">Last updated: <span>${new Date().toLocaleString()}</span></div>
    </div>
  `;
  weatherResult.appendChild(card);
  requestAnimationFrame(() => card.classList.add("show"));
};

export const renderNews = (data) => {
  const newsResult = document.getElementById("news-result");
  newsResult.innerHTML = "";
  if (!data || data.length === 0) {
    newsResult.innerHTML = "<p>No news articles found.</p>";
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
                <p><em>Author: ${article.author}</em></p>
                <img src="${article.urlToImage || ""}" alt="Article Image"/>
        `;
    newsResult.appendChild(card);
    requestAnimationFrame(() => card.classList.add("show"));
  });
};
