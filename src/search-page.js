import "./style/search-page.css";
import { createEl, createSearchBar } from "./dom-helpers.js";
import { renderForecastPage } from "./forecast-page.js";
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

  const wrapperSearch = createSearchBar(searchImage);

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
      const searchField = document.getElementById("search-field");
      renderForecastPage(searchField.value);
    }
  });
  content.append(rootEl);
}
