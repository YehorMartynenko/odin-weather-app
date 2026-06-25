import "./style/search-page.css";
import { createEl } from "./dom-helpers.js";
import { WeatherController } from "./weather-controller.js";
import searchImage from "./img/search-icon.svg";

export function renderSearchPage() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const title = createEl("h1", {
    className: "intro-title",
    textContent: "Welcome to Weather Here",
  });

  const subtitle = createEl("p", {
    className: "intro-subtitle",
    textContent: "Enter a city name to check a forecast",
  });

  const wrapperIntro = createEl(
    "div",
    {
      className: "wrapper-intro",
    },
    title,
    subtitle,
  );

  const searchField = createEl("input", {
    id: "search-field",
    attrs: {
      name: "search_field",
      type: "text",
      placeholder: "Search forecast..",
    },
  });

  const searchIcon = createEl("img", {
    id: "search-icon",
    attrs: {
      src: searchImage,
      alt: "",
    },
  });

  const searchBtn = createEl(
    "button",
    {
      id: "search-btn",
      attrs: {
        type: "button",
        "aria-label": "Search",
      },
    },
    searchIcon,
  );

  const wrapperSearch = createEl(
    "div",
    {
      className: "wrapper-search",
    },
    searchField,
    searchBtn,
  );

  const rootEl = createEl(
    "main",
    {
      id: "root-el",
      className: "search-page",
    },
    wrapperIntro,
    wrapperSearch,
  );
  rootEl.addEventListener("click", (event) => {
    const search = event.target.closest("#search-icon");

    if (search) {
      WeatherController(searchField.value);
    }
  });
  content.append(rootEl);
}
