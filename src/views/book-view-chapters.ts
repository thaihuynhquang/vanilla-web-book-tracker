import { getChapters } from "../data/bookData";
import { getState, toggleRead, toggleHandsOn } from "../state/storage";
import { calculateProgress, type ChapterProgress } from "../progress";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import { chapterFilterChipsHtml } from "./helpers";
import type { Section } from "../types/appState";
import { BookView } from "./base";

export class BookViewChapters extends BookView {
  private missingHandsonOnly = false;
  private selectedChapterId: string | null = null;

  refresh(): void {
    const chapters = getChapters();
    const state = getState();
    const stats = calculateProgress();
    const focusedInput = document.activeElement as HTMLElement | null;
    const focusedReadId = focusedInput?.dataset.readId ?? null;
    const focusedHandsonId = focusedInput?.dataset.handsonId ?? null;

    const visibleChapters = this.selectedChapterId
      ? chapters.filter((c) => c.id === this.selectedChapterId)
      : chapters;

    this.innerHTML = `
      <section class="section-heading">
        <div>
          <h2 class="section-heading-title">${t("chapters.title")}</h2>
          <p class="section-heading-subtitle">${t("chapters.header.subtitle")}</p>
        </div>
        <label class="filter-toggle">
          <input type="checkbox" id="filter-missing-handson" ${this.missingHandsonOnly ? "checked" : ""}/>
          ${t("chapters.filter.missingHandson")}
        </label>
      </section>
      ${chapterFilterChipsHtml(chapters, this.selectedChapterId, t("chapters.filter.allChapters"))}
      <div class="chapter-accordion">
        ${visibleChapters.map((c) => this.chapterCardHtml(c, stats.chapterProgresses.find((cp) => cp.chapter.id === c.id)!, state)).join("")}
      </div>
    `;

    this.querySelector("#filter-missing-handson")?.addEventListener("change", (e) => {
      this.missingHandsonOnly = (e.target as HTMLInputElement).checked;
      this.refresh();
    });

    this.querySelectorAll<HTMLElement>("[data-chapter-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.selectedChapterId = chip.dataset.chapterFilter || null;
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

    if (focusedReadId) {
      this.querySelector<HTMLInputElement>(`[data-read-id="${CSS.escape(focusedReadId)}"]`)?.focus();
    } else if (focusedHandsonId) {
      this.querySelector<HTMLInputElement>(`[data-handson-id="${CSS.escape(focusedHandsonId)}"]`)?.focus();
    }
  }

  private chapterCardHtml(chapter: ChapterProgress["chapter"], progress: ChapterProgress, state: ReturnType<typeof getState>): string {
    if (chapter.tbd) {
      return `
        <div class="chapter-card chapter-card--tbd">
          <div class="chapter-card-header">
            <span class="chapter-number-badge">${escapeHtml(String(chapter.num))}</span>
            <span class="chapter-card-title">${escapeHtml(chapter.title)}</span>
          </div>
          <p class="chapter-tbd-notice">${t("chapters.tbd")}</p>
        </div>
      `;
    }

    const visibleSections = this.missingHandsonOnly
      ? chapter.sections.filter((s) => state.read[s.id] && !state.handsOn[s.id])
      : chapter.sections;

    return `
      <div class="chapter-card">
        <div class="chapter-card-header">
          <span class="chapter-number-badge">${escapeHtml(String(chapter.num))}</span>
          <div class="chapter-card-title-group">
            <span class="chapter-card-title">${escapeHtml(chapter.title)}</span>
            <span class="chapter-card-meta">${progress.total} ${t("chapters.meta.sections")} · ~${progress.estMinutes} ${t("chapters.meta.estMinutes")}</span>
          </div>
          <div class="chapter-card-status">
            <span class="status-badge status-badge--dynamic" style="--status-color: ${progress.statusColor};">${t(`status.${progress.status}`)}</span>
            <span class="chapter-card-pct" style="--status-color: ${progress.statusColor};">${progress.completedCount}/${progress.total} (${progress.percentage}%)</span>
          </div>
        </div>
        <div class="progress-bar-track progress-bar-track--sm">
          <div class="progress-bar-fill progress-bar-fill--dynamic" style="--progress: ${progress.percentage}%; --status-color: ${progress.statusColor};"></div>
        </div>
        <div class="chapter-card-body">
          ${chapter.summary ? `<div class="chapter-summary-box"><div class="chapter-summary-title">${t("chapters.summary.title")}</div><p>${escapeHtml(chapter.summary)}</p></div>` : ""}
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
      <div class="item-row ${isRead && isHandsOn ? "checked" : ""}">
        <div class="item-row-main">
          <span class="section-num">${escapeHtml(section.num)}</span>
          <span class="section-title">${escapeHtml(section.title)}</span>
          <span class="section-badge ${badge.cls}">${badge.text}</span>
          <span class="tag">${section.estMinutes} ${t("chapters.meta.estMinutes")}</span>
        </div>
        <div class="section-row-checks">
          <label class="section-check">
            ${icon("bookOpen")}
            <input type="checkbox" data-read-id="${escapeHtml(section.id)}" ${isRead ? "checked" : ""}/>
            <span>${t("chapters.section.read")}</span>
          </label>
          <label class="section-check">
            ${icon("flask")}
            <input type="checkbox" data-handson-id="${escapeHtml(section.id)}" ${isHandsOn ? "checked" : ""}/>
            <span>${t("chapters.section.handson")}</span>
          </label>
        </div>
        ${section.subsections.length > 0
          ? `<div class="subsection-list">${section.subsections.map((sub) => `<span class="tag">${escapeHtml(sub.num)} ${escapeHtml(sub.title)}</span>`).join("")}</div>`
          : ""}
      </div>
    `;
  }
}

customElements.define("book-view-chapters", BookViewChapters);
