import { createEl } from "./dom-helpers.js";
import { WeatherController } from "./weather-controller.js";
import searchImage from "./img/search-icon.svg";
export function renderSearchPage() {
  const content = document.getElementById("content");

  const title = createEl("p", {
    textContent: "Welcome to Weather Here",
  });

  const subtitle = createEl("p", {
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
      placeholder: "Search..",
    },
  });

  const searchIcon = createEl("img", {
    id: "search-icon",
    attrs: {
      src: searchImage,
      alt: "",
    },
  });

  const wrapperSearch = createEl(
    "div",
    {
      className: "wrapper-search",
    },
    searchField,
    searchIcon,
  );

  const rootEl = createEl(
    "div",
    {
      id: "root-el",
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

renderSearchPage();
