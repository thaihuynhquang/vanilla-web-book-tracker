import { getChapters } from "../data/bookData";
import { getState, toggleRead, toggleHandsOn } from "../state/storage";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import type { Chapter, Section } from "../types/appState";
import { BookView } from "./base";

const RING_RADIUS = 14;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export class BookViewChapters extends BookView {
  private expanded = new Set<string>();
  private missingHandsonOnly = false;

  refresh(): void {
    const chapters = getChapters();
    const state = getState();

    this.innerHTML = `
      <section class="view-header">
        <h2>${t("chapters.title")}</h2>
        <label class="filter-toggle">
          <input type="checkbox" id="filter-missing-handson" ${this.missingHandsonOnly ? "checked" : ""}/>
          ${t("chapters.filter.missingHandson")}
        </label>
      </section>
      <div class="chapter-accordion">
        ${chapters.map((c) => this.chapterCardHtml(c, state)).join("")}
      </div>
    `;

    this.querySelector("#filter-missing-handson")?.addEventListener("change", (e) => {
      this.missingHandsonOnly = (e.target as HTMLInputElement).checked;
      this.refresh();
    });

    this.querySelectorAll<HTMLElement>("[data-chapter-toggle]").forEach((header) => {
      header.addEventListener("click", () => {
        const id = header.dataset.chapterToggle!;
        this.expanded.has(id) ? this.expanded.delete(id) : this.expanded.add(id);
        this.refresh();
      });
    });

    this.querySelectorAll<HTMLInputElement>("[data-read-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleRead(input.dataset.readId!);
        renderAll();
      });
    });

    this.querySelectorAll<HTMLInputElement>("[data-handson-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleHandsOn(input.dataset.handsonId!);
        renderAll();
      });
    });
  }

  private chapterCardHtml(chapter: Chapter, state: ReturnType<typeof getState>): string {
    const isExpanded = this.expanded.has(chapter.id);
    const total = chapter.sections.length;
    const completed = chapter.sections.filter((s) => state.read[s.id] && state.handsOn[s.id]).length;
    const ringFraction = chapter.tbd || total === 0
      ? 0
      : chapter.sections.reduce((sum, s) => sum + (Number(!!state.read[s.id]) + Number(!!state.handsOn[s.id])), 0) / (total * 2);

    if (chapter.tbd) {
      return `
        <div class="chapter-card chapter-card--tbd">
          <div class="chapter-card-header">
            <span class="chapter-number-badge">${chapter.num}</span>
            <span class="chapter-card-title">${chapter.title}</span>
          </div>
          <p class="chapter-tbd-notice">${t("chapters.tbd")}</p>
        </div>
      `;
    }

    const visibleSections = this.missingHandsonOnly
      ? chapter.sections.filter((s) => state.read[s.id] && !state.handsOn[s.id])
      : chapter.sections;

    return `
      <div class="chapter-card ${isExpanded ? "chapter-card--expanded" : ""}">
        <button type="button" class="chapter-card-header" data-chapter-toggle="${chapter.id}" aria-expanded="${isExpanded}">
          <span class="chapter-number-badge">${chapter.num}</span>
          <span class="chapter-card-title">${chapter.title}</span>
          <svg class="chapter-ring" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="${RING_RADIUS}" class="chapter-ring-track"/>
            <circle cx="16" cy="16" r="${RING_RADIUS}" class="chapter-ring-progress"
              stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="${RING_CIRCUMFERENCE * (1 - ringFraction)}"/>
          </svg>
          <span class="chapter-section-counter">${completed}/${total}</span>
          <span class="chapter-chevron">${icon("chevronDown")}</span>
        </button>
        <div class="chapter-card-body" ${isExpanded ? "" : "hidden"}>
          ${visibleSections.map((s) => this.sectionRowHtml(s, state)).join("") || `<p class="chapter-empty-filter">—</p>`}
        </div>
      </div>
    `;
  }

  private sectionRowHtml(section: Section, state: ReturnType<typeof getState>): string {
    const isRead = !!state.read[section.id];
    const isHandsOn = !!state.handsOn[section.id];
    const badge = isRead && isHandsOn
      ? { cls: "section-badge--done", text: t("chapters.badge.done") }
      : isRead
        ? { cls: "section-badge--read", text: t("chapters.badge.read") }
        : { cls: "section-badge--none", text: t("chapters.badge.notStarted") };

    return `
      <div class="section-row">
        <div class="section-row-main">
          <span class="section-num">${section.num}</span>
          <span class="section-title">${section.title}</span>
          <span class="section-badge ${badge.cls}">${badge.text}</span>
        </div>
        <div class="section-row-checks">
          <label class="section-check">
            ${icon("bookOpen")}
            <input type="checkbox" data-read-id="${section.id}" ${isRead ? "checked" : ""}/>
            <span>${t("chapters.section.read")}</span>
          </label>
          <label class="section-check">
            ${icon("flask")}
            <input type="checkbox" data-handson-id="${section.id}" ${isHandsOn ? "checked" : ""}/>
            <span>${t("chapters.section.handson")}</span>
          </label>
        </div>
        ${section.subsections.length > 0
          ? `<ul class="subsection-list">${section.subsections.map((sub) => `<li>${sub.num} ${sub.title}</li>`).join("")}</ul>`
          : ""}
      </div>
    `;
  }
}

customElements.define("book-view-chapters", BookViewChapters);
