export function createEl(tag, options = {}, ...children) {
  const el = document.createElement(tag);

  if (options.id) {
    el.id = options.id;
  }

  if (options.className) {
    el.className = options.className;
  }

  if (options.textContent) {
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
