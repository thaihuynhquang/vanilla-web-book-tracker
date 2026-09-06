import { getChapters, getQuitCriteriaData } from "../data/bookData";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import type { QuitCriteriaRow, Chapter } from "../types/appState";
import { BookView } from "./base";
import { bindSearch } from "./helpers";

export class BookViewQuitCriteria extends BookView {
  private searchQuery = "";

  refresh(): void {
    this.innerHTML = `
      <section class="view-header">
        <h2>${t("quitcriteria.title")}</h2>
        <input type="search" id="quit-search-input" class="search-input" placeholder="${escapeHtml(t("quitcriteria.searchPlaceholder"))}"/>
      </section>
      <div class="quit-matrix-grid" id="quit-results"></div>
    `;

    bindSearch(this, "quit-search-input", this.searchQuery, (value) => {
      this.searchQuery = value;
      this.renderResults();
    });

    this.renderResults();
  }

  private renderResults(): void {
    const chapters = getChapters();
    const rows = getQuitCriteriaData();
    const chapterById = new Map(chapters.map((c) => [c.id, c]));
    const filtered = this.filterRows(rows, chapterById);

    const results = this.querySelector("#quit-results");
    if (!results) return;
    results.innerHTML = filtered.length > 0
      ? filtered.map((row) => this.rowCardHtml(row, chapterById.get(row.chapterId))).join("")
      : `<p class="empty-state">${t("quitcriteria.empty")}</p>`;
  }

  private filterRows(rows: QuitCriteriaRow[], chapterById: Map<string, Chapter>): QuitCriteriaRow[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) => {
      const chapter = chapterById.get(row.chapterId);
      const haystack = `${chapter?.title ?? ""} ${row.stopSignal} ${row.exitCriteria}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  private rowCardHtml(row: QuitCriteriaRow, chapter: Chapter | undefined): string {
    return `
      <div class="quit-module-card">
        <h3 class="quit-card-title">${chapter?.num}. ${escapeHtml(chapter?.title ?? "")}</h3>
        <div class="quit-box quit-box--trigger">
          <span class="quit-box-icon">${icon("warningAmber")}</span>
          <div>
            <p class="quit-box-label">${t("quitcriteria.stopSignal")}</p>
            <p class="quit-box-text">${escapeHtml(row.stopSignal)}</p>
          </div>
        </div>
        <div class="quit-box quit-box--pivot">
          <span class="quit-box-icon">${icon("checkCircle")}</span>
          <div>
            <p class="quit-box-label">${t("quitcriteria.exitCriteria")}</p>
            <p class="quit-box-text">${escapeHtml(row.exitCriteria)}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("book-view-quitcriteria", BookViewQuitCriteria);
