import { getChapters, getGlossary, getResources } from "../data/bookData";
import { t } from "../i18n";
import type { UIStringKey } from "../i18n/strings";
import { icon, type IconKey } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import type { Chapter, GlossaryTerm, Resource, ResourceType } from "../types/appState";
import { BookView } from "./base";
import { chapterFilterChipsHtml, bindSearch } from "./helpers";

type ResourceKind = "term" | ResourceType;

interface ResourceItem {
  id: string;
  kind: ResourceKind;
  title: string;
  description: string;
  chapterIds: string[];
  sortChapterNum: number;
  primaryUrl: string;
  primaryLabelKey: UIStringKey;
  secondaryUrl?: string;
  secondaryLabelKey?: UIStringKey;
}

const BADGE_ICON: Record<ResourceKind, IconKey> = {
  term: "glossary",
  mdn: "bookOpen",
  spec: "layers",
  article: "fileText",
  video: "video",
  demo: "monitor",
  tool: "wrench",
};

const BADGE_LABEL_KEY: Record<ResourceKind, UIStringKey> = {
  term: "resources.type.term",
  mdn: "resources.type.mdn",
  spec: "resources.type.spec",
  article: "resources.type.article",
  video: "resources.type.video",
  demo: "resources.type.demo",
  tool: "resources.type.tool",
};

export class BookViewResources extends BookView {
  private searchQuery = "";
  private selectedChapterId: string | null = null;

  refresh(): void {
    const chapters = getChapters();

    this.innerHTML = `
      <section class="view-header">
        <h2>${t("resources.title")}</h2>
        <input type="search" id="resources-search-input" class="search-input" placeholder="${escapeHtml(t("resources.searchPlaceholder"))}"/>
      </section>
      ${chapterFilterChipsHtml(chapters, this.selectedChapterId, t("resources.filterAll"))}
      <div class="resources-grid" id="resources-results"></div>
    `;

    bindSearch(this, "resources-search-input", this.searchQuery, (value) => {
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

  private buildItems(chapters: Chapter[]): ResourceItem[] {
    const chapterNumById = new Map(chapters.map((c) => [c.id, c.num]));
    const chapterTitleById = new Map(chapters.map((c) => [c.id, `${c.num}. ${c.title}`]));

    const termItems: ResourceItem[] = getGlossary().map((term: GlossaryTerm) => ({
      id: term.id,
      kind: "term",
      title: term.name,
      description: term.description,
      chapterIds: term.chapterIds,
      sortChapterNum: Math.min(...term.chapterIds.map((id) => chapterNumById.get(id) ?? Infinity)),
      primaryUrl: term.mdnUrl,
      primaryLabelKey: "resources.mdnLink",
      secondaryUrl: term.specUrl,
      secondaryLabelKey: term.specUrl ? "resources.specLink" : undefined,
    }));

    const linkItems: ResourceItem[] = getResources().map((resource: Resource) => ({
      id: resource.id,
      kind: resource.type,
      title: resource.title,
      description: chapterTitleById.get(resource.chapterId) ?? resource.chapterId,
      chapterIds: [resource.chapterId],
      sortChapterNum: chapterNumById.get(resource.chapterId) ?? Infinity,
      primaryUrl: resource.url,
      primaryLabelKey: "resources.open",
    }));

    return [...termItems, ...linkItems].sort((a, b) => {
      if (a.sortChapterNum !== b.sortChapterNum) return a.sortChapterNum - b.sortChapterNum;
      if (a.kind === "term" && b.kind !== "term") return -1;
      if (a.kind !== "term" && b.kind === "term") return 1;
      return a.title.localeCompare(b.title);
    });
  }

  private filterItems(items: ResourceItem[]): ResourceItem[] {
    const query = this.searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery = !query || item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      const matchesChapter = !this.selectedChapterId || item.chapterIds.includes(this.selectedChapterId);
      return matchesQuery && matchesChapter;
    });
  }

  private renderResults(): void {
    const chapters = getChapters();
    const chapterTitleById = new Map(chapters.map((c) => [c.id, `${c.num}. ${c.title}`]));
    const items = this.buildItems(chapters);
    const filtered = this.filterItems(items);

    const results = this.querySelector("#resources-results");
    if (!results) return;
    results.innerHTML = filtered.length > 0
      ? filtered.map((item) => this.resourceCardHtml(item, chapterTitleById)).join("")
      : `<p class="empty-state">${t("resources.empty")}</p>`;
  }

  private resourceCardHtml(item: ResourceItem, chapterTitleById: Map<string, string>): string {
    return `
      <article class="resource-card">
        <div class="resource-card-body">
          <div class="resource-tag-row">
            <span class="resource-badge resource-badge--${escapeHtml(item.kind)}">${icon(BADGE_ICON[item.kind])} ${escapeHtml(t(BADGE_LABEL_KEY[item.kind]))}</span>
            ${item.chapterIds.map((id) => `<span class="tag tag--primary" title="${escapeHtml(chapterTitleById.get(id) ?? id)}">${id.replace("ch-", "Ch. ")}</span>`).join("")}
          </div>
          <h3 class="resource-title">${escapeHtml(item.title)}</h3>
          <p class="resource-desc">${escapeHtml(item.description)}</p>
        </div>
        <div class="resource-footer">
          ${item.secondaryUrl
            ? `<a href="${escapeHtml(item.secondaryUrl)}" target="_blank" rel="noopener noreferrer" class="resource-secondary-link">${escapeHtml(t(item.secondaryLabelKey!))}</a>`
            : "<span></span>"}
          <a href="${escapeHtml(item.primaryUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--resource btn-sm">
            ${escapeHtml(t(item.primaryLabelKey))} ${icon("externalLink")}
          </a>
        </div>
      </article>
    `;
  }
}

customElements.define("book-view-resources", BookViewResources);
