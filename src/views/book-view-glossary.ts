import { getChapters, getGlossary } from "../data/bookData";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import type { GlossaryTerm } from "../types/appState";
import { BookView } from "./base";
import { chapterFilterChipsHtml, bindSearch } from "./helpers";

export class BookViewGlossary extends BookView {
  private searchQuery = "";
  private selectedChapterId: string | null = null;

  refresh(): void {
    const chapters = getChapters();

    this.innerHTML = `
      <section class="view-header">
        <h2>${t("glossary.title")}</h2>
        <input type="search" id="glossary-search-input" class="search-input" placeholder="${escapeHtml(t("glossary.searchPlaceholder"))}"/>
      </section>
      ${chapterFilterChipsHtml(chapters, this.selectedChapterId, t("glossary.filterAll"))}
      <div class="glossary-grid" id="glossary-results"></div>
    `;

    bindSearch(this, "glossary-search-input", this.searchQuery, (value) => {
      this.searchQuery = value;
      this.renderResults();
    });

    this.querySelectorAll<HTMLElement>("[data-chapter-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.chapterFilter;
        this.selectedChapterId = id ? id : null;
        this.refresh();
      });
    });

    this.renderResults();
  }

  private renderResults(): void {
    const chapters = getChapters();
    const terms = getGlossary();
    const filtered = this.filterTerms(terms);
    const chapterTitleById = new Map(chapters.map((c) => [c.id, `${c.num}. ${c.title}`]));

    const results = this.querySelector("#glossary-results");
    if (!results) return;
    results.innerHTML = filtered.length > 0
      ? filtered.map((term) => this.termCardHtml(term, chapterTitleById)).join("")
      : `<p class="empty-state">${t("glossary.empty")}</p>`;
  }

  private filterTerms(terms: GlossaryTerm[]): GlossaryTerm[] {
    const query = this.searchQuery.trim().toLowerCase();
    return terms.filter((term) => {
      const matchesQuery = !query || term.name.toLowerCase().includes(query) || term.description.toLowerCase().includes(query);
      const matchesChapter = !this.selectedChapterId || term.chapterIds.includes(this.selectedChapterId);
      return matchesQuery && matchesChapter;
    });
  }

  private termCardHtml(term: GlossaryTerm, chapterTitleById: Map<string, string>): string {
    return `
      <div class="glossary-card">
        <h3 class="glossary-term-name">${escapeHtml(term.name)}</h3>
        <p class="glossary-term-desc">${escapeHtml(term.description)}</p>
        <div class="chip-row">
          ${term.chapterIds.map((id) => `<span class="chip chip--chapter" title="${escapeHtml(chapterTitleById.get(id) ?? id)}">${id.replace("ch-", "Ch. ")}</span>`).join("")}
        </div>
        <div class="glossary-links">
          <a href="${term.mdnUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${icon("externalLink")} ${t("glossary.mdnLink")}</a>
          ${term.specUrl ? `<a href="${term.specUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${icon("externalLink")} ${t("glossary.specLink")}</a>` : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("book-view-glossary", BookViewGlossary);
