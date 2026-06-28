import "./style/forecast-page.css";
import searchImage from "./img/search-icon.svg";
import { createEl, createSearchBar } from "./dom-helpers.js";
import { getWeatherForLocation } from "./weather-controller.js";
import rainIcon from "./img/cloud_rain.svg";
import sunIcon from "./img/sun.svg";
import sunCloudIcon from "./img/sun_cloud.svg";

export async function renderForecastPage(location) {
  const weatherData = await getWeatherForLocation(location);
  if (Error.isError(weatherData)) {
    console.log(weatherData);
    return;
  }

  const content = document.getElementById("content");
  content.innerHTML = "";

  console.log(weatherData);
  const pageTitle = createEl("h1", {
    className: "page-title",
    textContent: weatherData.locationName,
  });

  const leftColumn = createEl(
    "section",
    {
      className: "left-column",
    },

    createSearchBar(searchImage),
    createWeatherCard(weatherData.currentForecast),
  );

  const forecastPanel = createForecastPanel(weatherData.weekForecast);

  const dashboard = createEl(
    "div",
    {
      className: "dashboard",
    },
    leftColumn,
    forecastPanel,
  );

  const rootEl = createEl(
    "main",
    {
      id: "root-el",
      className: "forecast-page",
    },
    pageTitle,
    dashboard,
  );

  rootEl.addEventListener("click", (event) => {
    const search = event.target.closest("#search-icon");

    if (search) {
      const searchField = document.getElementById("search-field");
      renderForecastPage(searchField.value);
    }
  });

  content.append(rootEl);
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    fullDate: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
  };
}

function getWeatherIcon(conditions) {
  const value = conditions.toLowerCase();

  if (value.includes("rain")) return rainIcon;
  if (value.includes("sun") || value.includes("clear")) return sunIcon;
  if (value.includes("cloud")) return sunCloudIcon;

  return "./img/sun.svg";
}

function createWeatherCard(current) {
  const temperature = createEl("p", {
    className: "weather-temp",
    textContent: `${Math.round(current.tempreture)}°C`,
  });

  const condition = createEl("p", {
    className: "weather-condition",
    textContent: current.conditions,
  });

  const mainInfo = createEl("div", {}, temperature, condition);

  const icon = createEl("img", {
    className: "weather-icon",
    attrs: {
      src: getWeatherIcon(current.conditions),
      alt: current.conditions,
    },
  });

  const cardTop = createEl(
    "div",
    {
      className: "weather-card-top",
    },
    mainInfo,
    icon,
  );

  const feelsLike = createEl(
    "p",
    {},
    `Feels like ${Math.round(current.feelsLike)}°C`,
  );

  const wind = createEl("p", {}, `Wind: ${Math.round(current.windSpeed)}km/h`);

  const uvIndex = createEl("p", {
    className: "uv-index",
    textContent: `UV Index: ${current.uvIndex}`,
  });

  const details = createEl(
    "div",
    {
      className: "weather-details",
    },
    feelsLike,
    wind,
    uvIndex,
  );

  return createEl(
    "section",
    {
      className: "weather-card",
    },
    cardTop,
    details,
  );
}

function createForecastDay(day) {
  const { weekday, fullDate } = formatDate(day.dateTime);

  const forecastWeekday = createEl("span", {
    className: "forecast-weekday",
    textContent: weekday,
  });

  const forecastFullDate = createEl("span", {
    className: "forecast-full-date",
    textContent: fullDate,
  });

  const dateBlock = createEl(
    "div",
    {
      className: "forecast-date",
    },
    forecastWeekday,
    forecastFullDate,
  );

  const icon = createEl("img", {
    attrs: {
      src: getWeatherIcon(day.conditions),
      alt: "",
    },
  });

  const conditionText = createEl("span", {
    textContent: day.conditions,
  });

  const conditionBlock = createEl(
    "div",
    {
      className: "forecast-condition",
    },
    icon,
    conditionText,
  );

  const minTemp = createEl("span", {
    className: "temp-min",
    textContent: `${Math.round(day.tempMin)}°`,
  });

  const maxTemp = createEl("span", {
    className: "temp-max",
    textContent: `${Math.round(day.tempMax)}°`,
  });

  const tempBlock = createEl(
    "div",
    {
      className: "forecast-temp",
    },
    minTemp,
    createEl("span", { textContent: " / " }),
    maxTemp,
  );

  return createEl(
    "article",
    {
      className: "forecast-day",
    },
    dateBlock,
    conditionBlock,
    tempBlock,
  );
}

function createForecastPanel(week) {
  const title = createEl("h2", {
    className: "forecast-title",
    textContent: "7-day forecast",
  });

  const forecastDays = week.map((day) => createForecastDay(day));

  return createEl(
    "section",
    {
      className: "forecast-panel",
    },
    title,
    ...forecastDays,
  );
}
