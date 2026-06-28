export function createEl(tag, options = {}, ...children) {
  const el = document.createElement(tag);

  if (options.id) {
    el.id = options.id;
  }

  if (options.className) {
    el.className = options.className;
  }

  if (options.textContent !== undefined) {
    el.textContent = options.textContent;
  }

  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      el.setAttribute(name, value);
    }
  }

  el.append(...children);

  return el;
}

export function createSearchBar(searchImg) {
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
      src: searchImg,
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

  return createEl(
    "div",
    {
      className: "wrapper-search",
    },
    searchField,
    searchBtn,
  );
}
