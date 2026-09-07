import { getChapters, getLabs, getGlossary } from "../data/bookData";
import { getState, toggleRead, toggleHandsOn, toggleLabDone, toggleFlashcardDone } from "../state/storage";
import { calculateProgress, type ChapterProgress } from "../progress";
import { updateNavBadge } from "../nav-badge";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import { chapterFilterChipsHtml, surfaceCardHtml } from "./helpers";
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

    this.querySelectorAll<HTMLElement>("[data-chapter-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedChapterId = btn.dataset.chapterFilter || null;
        this.refresh();
      });
    });

    this.bindChecklistListeners(this);

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

  // Scoped to `root` so it can bind either the whole view (full refresh) or a single
  // freshly-swapped `.chapter-card` (patchChapterCard) without re-binding every input.
  private bindChecklistListeners(root: ParentNode): void {
    root.querySelectorAll<HTMLInputElement>("[data-read-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleRead(input.dataset.readId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-read-id", input.dataset.readId!);
      });
    });

    root.querySelectorAll<HTMLInputElement>("[data-handson-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleHandsOn(input.dataset.handsonId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-handson-id", input.dataset.handsonId!);
      });
    });

    root.querySelectorAll<HTMLInputElement>("[data-lab-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleLabDone(input.dataset.labId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-lab-id", input.dataset.labId!);
      });
    });

    root.querySelectorAll<HTMLInputElement>("[data-flashcard-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleFlashcardDone(input.dataset.flashcardId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-flashcard-id", input.dataset.flashcardId!);
      });
    });
  }

  // A section/lab/flashcard toggle only ever changes one chapter's data. Patching just
  // that chapter's card (instead of renderAll() -> a full-view rebuild) keeps every other
  // .chapter-card's DOM node untouched, so content-visibility's remembered size for them
  // is never invalidated and the page never jumps (see docs/guides/ui_system_design_guide.md §3.4 Perf).
  private afterChecklistToggle(chapterId: string, refocusAttr: string, refocusId: string): void {
    updateNavBadge();
    this.patchChapterCard(chapterId, { attr: refocusAttr, id: refocusId });
  }

  private patchChapterCard(chapterId: string, refocus: { attr: string; id: string }): void {
    const oldCard = this.querySelector(`[data-chapter-id="${CSS.escape(chapterId)}"]`);
    if (!oldCard) return;

    const state = getState();
    const stats = calculateProgress();
    const chapter = getChapters().find((c) => c.id === chapterId);
    const progress = stats.chapterProgresses.find((cp) => cp.chapter.id === chapterId);
    if (!chapter || !progress) return;

    const labByChapterId = new Map(getLabs().map((l) => [l.chapterId, l]));
    const glossaryById = new Map(getGlossary().map((g) => [g.id, g]));

    const template = document.createElement("template");
    template.innerHTML = this.chapterCardHtml(chapter, progress, state, labByChapterId, glossaryById).trim();
    const newCard = template.content.firstElementChild as HTMLElement;

    // The new card has no "remembered size" yet, so content-visibility:auto would size it via
    // the 320px contain-intrinsic-size placeholder until the browser's next (lazy, unpredictably
    // timed) proximity check — even though it's the one card guaranteed to be on/near screen.
    // Pin it to `visible` so it always lays out at its real size. This one chapter loses the
    // off-screen-skip optimization for the rest of the session, but every other (untouched)
    // card keeps it, and a full rebuild (tab switch, filter change, language switch) recreates
    // every card fresh from `chapterCardHtml()` without this override, restoring `auto` for all.
    newCard.style.contentVisibility = "visible";
    oldCard.replaceWith(newCard);
    this.bindChecklistListeners(newCard);
    newCard.querySelector<HTMLInputElement>(`[${refocus.attr}="${CSS.escape(refocus.id)}"]`)?.focus({ preventScroll: true });
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
        <div class="chapter-card chapter-card--tbd" data-chapter-id="${escapeHtml(chapter.id)}">
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
      <div class="chapter-card" data-chapter-id="${escapeHtml(chapter.id)}">
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
          ${chapter.summary ? this.summaryBoxHtml(chapter.summary) : ""}
          ${visibleSections.map((s) => this.sectionRowHtml(s, chapter.id, state)).join("") || `<p class="chapter-empty-filter">—</p>`}
          ${this.flashcardBlockHtml(chapter, state)}
          ${this.labBlockHtml(labByChapterId.get(chapter.id), glossaryById, state)}
        </div>
      </div>
    `;
  }

  private summaryBoxHtml(summary: string): string {
    return surfaceCardHtml({
      className: "chapter-summary-box",
      iconHtml: icon("fileText"),
      headerHtml: `<span class="surface-card-title">${t("chapters.summary.title")}</span>`,
      bodyHtml: `<p>${escapeHtml(summary)}</p>`,
    });
  }

  private flashcardBlockHtml(chapter: ChapterProgress["chapter"], state: ReturnType<typeof getState>): string {
    const isFlashcardDone = !!state.flashcardDone[chapter.flashcardId];

    return surfaceCardHtml({
      className: "deliverable-card deliverable-card--flashcard",
      iconHtml: icon("cards"),
      headerHtml: `<span class="surface-card-title">${t("chapters.flashcard.label")}</span>`,
      bodyHtml: `<p><a href="${FLASHCARDS_GUIDE_URL}" target="_blank" rel="noopener noreferrer" class="flashcard-guide-link">${t("chapters.flashcard.guideLink")}</a></p>`,
      footerHtml: `
        <label class="deliverable-checkbox">
          <input type="checkbox" data-flashcard-id="${escapeHtml(chapter.flashcardId)}" data-chapter-id="${escapeHtml(chapter.id)}" ${isFlashcardDone ? "checked" : ""}/>
          ${t("chapters.flashcard.markDone")}
        </label>
      `,
    });
  }

  private labBlockHtml(lab: Lab | undefined, glossaryById: Map<string, { id: string; name: string }>, state: ReturnType<typeof getState>): string {
    if (!lab) return "";
    const isLabDone = !!state.labDone[lab.id];

    if (lab.tbd) {
      return surfaceCardHtml({
        className: "deliverable-card",
        iconHtml: icon("flask"),
        headerHtml: `<span class="surface-card-title">${t("chapters.lab.title")}</span>`,
        bodyHtml: `<p class="lab-tbd-notice">${t("chapters.lab.tbd")}</p>`,
      });
    }

    return surfaceCardHtml({
      className: "deliverable-card",
      iconHtml: icon("flask"),
      headerHtml: `<span class="surface-card-title">${escapeHtml(lab.title)}</span>`,
      bodyHtml: `
        <p class="lab-goal"><strong>${t("chapters.lab.goal")}:</strong> ${escapeHtml(lab.goal)}</p>
        <p class="lab-section-label">${t("chapters.lab.requirements")}</p>
        <ul class="lab-list">${lab.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
        <p class="lab-section-label">${t("chapters.lab.acceptanceCriteria")}</p>
        <ul class="lab-list lab-list--criteria">${lab.acceptanceCriteria.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
        ${lab.apisUsed.length > 0
          ? `<p class="lab-section-label">${t("chapters.lab.apisUsed")}</p>
             <div class="tag-row">${lab.apisUsed.map((id) => `<span class="tag">${escapeHtml(glossaryById.get(id)?.name ?? id)}</span>`).join("")}</div>`
          : ""}
      `,
      footerHtml: `
        <label class="deliverable-checkbox">
          <input type="checkbox" data-lab-id="${escapeHtml(lab.id)}" data-chapter-id="${escapeHtml(lab.chapterId)}" ${isLabDone ? "checked" : ""}/>
          ${t("chapters.lab.markDone")}
        </label>
      `,
    });
  }

  private sectionRowHtml(section: Section, chapterId: string, state: ReturnType<typeof getState>): string {
    const isRead = !!state.read[section.id];
    const isHandsOn = !!state.handsOn[section.id];
    const badge = isRead && isHandsOn
      ? { cls: "section-badge--done", text: t("chapters.badge.done") }
      : isRead
        ? { cls: "section-badge--read", text: t("chapters.badge.read") }
        : { cls: "section-badge--none", text: t("chapters.badge.notStarted") };

    const stateClass = isRead && isHandsOn ? "item-row--done" : isRead ? "item-row--read" : "";

    return `
      <div class="item-row ${stateClass}">
        <span class="section-num">${escapeHtml(section.num)}</span>
        <div class="item-row-main">
          <div class="item-row-title-line">
            <span class="section-title">${escapeHtml(section.title)}</span>
            <span class="section-badge ${badge.cls}">${badge.text}</span>
            <span class="tag">${section.estMinutes} ${t("chapters.meta.estMinutes")}</span>
          </div>
          ${section.subsections.length > 0
            ? `<div class="subsection-list">${section.subsections.map((sub) => `<span class="tag">${escapeHtml(sub.num)} ${escapeHtml(sub.title)}</span>`).join("")}</div>`
            : ""}
        </div>
        <div class="item-row-footer">
          <label class="section-check">
            ${icon("bookOpen")}
            <input type="checkbox" data-read-id="${escapeHtml(section.id)}" data-chapter-id="${escapeHtml(chapterId)}" ${isRead ? "checked" : ""}/>
            <span>${t("chapters.section.read")}</span>
          </label>
          <label class="section-check">
            ${icon("flask")}
            <input type="checkbox" data-handson-id="${escapeHtml(section.id)}" data-chapter-id="${escapeHtml(chapterId)}" ${isHandsOn ? "checked" : ""}/>
            <span>${t("chapters.section.handson")}</span>
          </label>
        </div>
      </div>
    `;
  }
}

customElements.define("book-view-chapters", BookViewChapters);
