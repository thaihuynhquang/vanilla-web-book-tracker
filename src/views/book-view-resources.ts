import { getChapters, getResources } from "../data/bookData";
import { getState, toggleResourceFlag } from "../state/storage";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import type { Resource } from "../types/appState";
import { BookView } from "./base";
import { chapterFilterChipsHtml } from "./helpers";

export class BookViewResources extends BookView {
  private selectedChapterId: string | null = null;

  refresh(): void {
    const chapters = getChapters();
    const resources = getResources();
    const state = getState();
    const filtered = this.selectedChapterId
      ? resources.filter((r) => r.chapterId === this.selectedChapterId)
      : resources;

    this.innerHTML = `
      <section class="view-header">
        <h2>${t("resources.title")}</h2>
      </section>
      ${chapterFilterChipsHtml(chapters, this.selectedChapterId, t("resources.filterAll"))}
      <div class="resources-grid">
        ${filtered.length > 0
          ? filtered.map((r) => this.resourceCardHtml(r, state)).join("")
          : `<p class="empty-state">${t("resources.empty")}</p>`}
      </div>
    `;

    this.querySelectorAll<HTMLElement>("[data-chapter-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.chapterFilter;
        this.selectedChapterId = id ? id : null;
        this.refresh();
      });
    });

    this.querySelectorAll<HTMLElement>("[data-bookmark-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleResourceFlag(btn.dataset.bookmarkId!);
        renderAll();
      });
    });
  }

  private resourceCardHtml(resource: Resource, state: ReturnType<typeof getState>): string {
    const isBookmarked = !!state.resourceFlags[resource.id];
    return `
      <div class="resource-card">
        <span class="chip chip--type chip--type-${resource.type}">${resource.type}</span>
        <h3 class="resource-title">${resource.title}</h3>
        <div class="resource-actions">
          <button type="button" class="icon-btn" data-bookmark-id="${resource.id}" aria-pressed="${isBookmarked}">
            ${icon(isBookmarked ? "starFilled" : "starOutline")}
          </button>
          <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            ${icon("externalLink")} ${t("resources.open")}
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("book-view-resources", BookViewResources);
