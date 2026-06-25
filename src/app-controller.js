import { renderSearchPage } from "./search-page.js";

export class AppController {
  constructor() {
    this.currentPage = "search-page";
  }

  initialLoad() {
    this.loadSearchPage();
  }

  loadSearchPage() {
    renderSearchPage();
  }
}
