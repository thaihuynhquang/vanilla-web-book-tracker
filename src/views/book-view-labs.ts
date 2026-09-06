import { getChapters, getLabs, getGlossary } from "../data/bookData";
import { getState, toggleLabDone, toggleFlashcardDone } from "../state/storage";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { FLASHCARDS_GUIDE_URL } from "../constants";
import type { Lab } from "../types/appState";
import { BookView } from "./base";

export class BookViewLabs extends BookView {
  refresh(): void {
    const labs = getLabs();
    const glossary = getGlossary();
    const state = getState();
    const glossaryById = new Map(glossary.map((g) => [g.id, g]));

    this.innerHTML = `
      <section class="view-header">
        <h2>${t("labs.title")}</h2>
      </section>
      <div class="labs-list">
        ${labs.map((lab) => this.labCardHtml(lab, glossaryById, state)).join("")}
      </div>
    `;

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
  }

  private labCardHtml(lab: Lab, glossaryById: Map<string, { id: string; name: string }>, state: ReturnType<typeof getState>): string {
    const chapters = getChapters();
    const chapter = chapters.find((c) => c.id === lab.chapterId);
    const isLabDone = !!state.labDone[lab.id];
    const isFlashcardDone = !!state.flashcardDone[chapter?.flashcardId ?? ""];

    const flashcardRowHtml = `
      <div class="flashcard-task-row">
        ${icon("cards")}
        <span class="flashcard-task-label">${t("labs.flashcard.label")}</span>
        <a href="${FLASHCARDS_GUIDE_URL}" target="_blank" rel="noopener noreferrer" class="flashcard-guide-link">${t("labs.flashcard.guideLink")}</a>
        <label class="lab-checkbox">
          <input type="checkbox" data-flashcard-id="${chapter?.flashcardId}" ${isFlashcardDone ? "checked" : ""}/>
          ${t("labs.flashcard.markDone")}
        </label>
      </div>
    `;

    if (lab.tbd) {
      return `
        <div class="lab-card lab-card--tbd">
          <div class="lab-card-header">
            <span class="chapter-number-badge">${chapter?.num}</span>
            <span>${chapter?.title}</span>
          </div>
          <p class="lab-tbd-notice">${t("labs.tbd")}</p>
          ${flashcardRowHtml}
        </div>
      `;
    }

    return `
      <div class="lab-card">
        <div class="lab-card-header">
          <span class="chapter-number-badge">${chapter?.num}</span>
          <span class="lab-card-title">${lab.title}</span>
        </div>
        <div class="lab-card-body">
          <p class="lab-goal"><strong>${t("labs.goal")}:</strong> ${lab.goal}</p>
          <p class="lab-section-label">${t("labs.requirements")}</p>
          <ul class="lab-list">${lab.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>
          <p class="lab-section-label">${t("labs.acceptanceCriteria")}</p>
          <ul class="lab-list lab-list--criteria">${lab.acceptanceCriteria.map((a) => `<li>${a}</li>`).join("")}</ul>
          ${lab.apisUsed.length > 0
            ? `<p class="lab-section-label">${t("labs.apisUsed")}</p>
               <div class="chip-row">${lab.apisUsed.map((id) => `<span class="chip chip--api">${glossaryById.get(id)?.name ?? id}</span>`).join("")}</div>`
            : ""}
        </div>
        <div class="lab-card-footer">
          <label class="lab-checkbox">
            <input type="checkbox" data-lab-id="${lab.id}" ${isLabDone ? "checked" : ""}/>
            ${t("labs.markDone")}
          </label>
        </div>
        ${flashcardRowHtml}
      </div>
    `;
  }
}

customElements.define("book-view-labs", BookViewLabs);
