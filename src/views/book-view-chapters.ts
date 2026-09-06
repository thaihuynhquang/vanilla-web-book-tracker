import { getChapters, getLabs, getGlossary } from "../data/bookData";
import { getState, toggleRead, toggleHandsOn, toggleLabDone, toggleFlashcardDone } from "../state/storage";
import { calculateProgress, type ChapterProgress } from "../progress";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import { chapterFilterChipsHtml } from "./helpers";
import { FLASHCARDS_GUIDE_URL } from "../constants";
import type { Section, Lab } from "../types/appState";
import { BookView } from "./base";

export class BookViewChapters extends BookView {
  private missingHandsonOnly = false;
  private selectedChapterId: string | null = null;

  refresh(): void {
    const chapters = getChapters();
    const state = getState();
    const stats = calculateProgress();
    const labByChapterId = new Map(getLabs().map((l) => [l.chapterId, l]));
    const glossaryById = new Map(getGlossary().map((g) => [g.id, g]));
    const focusedInput = document.activeElement as HTMLElement | null;
    const focusedReadId = focusedInput?.dataset.readId ?? null;
    const focusedHandsonId = focusedInput?.dataset.handsonId ?? null;
    const focusedLabId = focusedInput?.dataset.labId ?? null;
    const focusedFlashcardId = focusedInput?.dataset.flashcardId ?? null;

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
        ${visibleChapters.map((c) => this.chapterCardHtml(c, stats.chapterProgresses.find((cp) => cp.chapter.id === c.id)!, state, labByChapterId, glossaryById)).join("")}
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

    this.querySelectorAll<HTMLInputElement>("[data-lab-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleLabDone(input.dataset.labId!);
        renderAll();
      });
    });

    this.querySelectorAll<HTMLInputElement>("[data-flashcard-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleFlashcardDone(input.dataset.flashcardId!);
        renderAll();
      });
    });

    if (focusedReadId) {
      this.querySelector<HTMLInputElement>(`[data-read-id="${CSS.escape(focusedReadId)}"]`)?.focus();
    } else if (focusedHandsonId) {
      this.querySelector<HTMLInputElement>(`[data-handson-id="${CSS.escape(focusedHandsonId)}"]`)?.focus();
    } else if (focusedLabId) {
      this.querySelector<HTMLInputElement>(`[data-lab-id="${CSS.escape(focusedLabId)}"]`)?.focus();
    } else if (focusedFlashcardId) {
      this.querySelector<HTMLInputElement>(`[data-flashcard-id="${CSS.escape(focusedFlashcardId)}"]`)?.focus();
    }
  }

  private chapterCardHtml(
    chapter: ChapterProgress["chapter"],
    progress: ChapterProgress,
    state: ReturnType<typeof getState>,
    labByChapterId: Map<string, Lab>,
    glossaryById: Map<string, { id: string; name: string }>,
  ): string {
    if (chapter.tbd) {
      return `
        <div class="chapter-card chapter-card--tbd">
          <div class="chapter-card-header">
            <span class="chapter-number-badge">${escapeHtml(String(chapter.num))}</span>
            <span class="chapter-card-title">${escapeHtml(chapter.title)}</span>
          </div>
          <p class="chapter-tbd-notice">${t("chapters.tbd")}</p>
          ${this.flashcardBlockHtml(chapter, state)}
          ${this.labBlockHtml(labByChapterId.get(chapter.id), glossaryById, state)}
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
          ${this.flashcardBlockHtml(chapter, state)}
          ${this.labBlockHtml(labByChapterId.get(chapter.id), glossaryById, state)}
        </div>
      </div>
    `;
  }

  private flashcardBlockHtml(chapter: ChapterProgress["chapter"], state: ReturnType<typeof getState>): string {
    const isFlashcardDone = !!state.flashcardDone[chapter.flashcardId];

    return `
      <div class="deliverable-card deliverable-card--flashcard">
        <div class="deliverable-card-header">
          ${icon("cards")}
          <span class="deliverable-card-title">${t("chapters.flashcard.label")}</span>
        </div>
        <div class="deliverable-card-body">
          <p><a href="${FLASHCARDS_GUIDE_URL}" target="_blank" rel="noopener noreferrer" class="flashcard-guide-link">${t("chapters.flashcard.guideLink")}</a></p>
        </div>
        <div class="deliverable-card-footer">
          <label class="deliverable-checkbox">
            <input type="checkbox" data-flashcard-id="${escapeHtml(chapter.flashcardId)}" ${isFlashcardDone ? "checked" : ""}/>
            ${t("chapters.flashcard.markDone")}
          </label>
        </div>
      </div>
    `;
  }

  private labBlockHtml(lab: Lab | undefined, glossaryById: Map<string, { id: string; name: string }>, state: ReturnType<typeof getState>): string {
    if (!lab) return "";
    const isLabDone = !!state.labDone[lab.id];

    if (lab.tbd) {
      return `
        <div class="deliverable-card deliverable-card--lab">
          <div class="deliverable-card-header">
            ${icon("flask")}
            <span class="deliverable-card-title">${t("chapters.lab.title")}</span>
          </div>
          <div class="deliverable-card-body">
            <p class="lab-tbd-notice">${t("chapters.lab.tbd")}</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="deliverable-card deliverable-card--lab">
        <div class="deliverable-card-header">
          ${icon("flask")}
          <span class="deliverable-card-title">${escapeHtml(lab.title)}</span>
        </div>
        <div class="deliverable-card-body">
          <p class="lab-goal"><strong>${t("chapters.lab.goal")}:</strong> ${escapeHtml(lab.goal)}</p>
          <p class="lab-section-label">${t("chapters.lab.requirements")}</p>
          <ul class="lab-list">${lab.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
          <p class="lab-section-label">${t("chapters.lab.acceptanceCriteria")}</p>
          <ul class="lab-list lab-list--criteria">${lab.acceptanceCriteria.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
          ${lab.apisUsed.length > 0
            ? `<p class="lab-section-label">${t("chapters.lab.apisUsed")}</p>
               <div class="chip-row">${lab.apisUsed.map((id) => `<span class="chip chip--api">${escapeHtml(glossaryById.get(id)?.name ?? id)}</span>`).join("")}</div>`
            : ""}
        </div>
        <div class="deliverable-card-footer">
          <label class="deliverable-checkbox">
            <input type="checkbox" data-lab-id="${escapeHtml(lab.id)}" ${isLabDone ? "checked" : ""}/>
            ${t("chapters.lab.markDone")}
          </label>
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
