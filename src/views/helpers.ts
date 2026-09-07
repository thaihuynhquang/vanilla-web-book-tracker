import { escapeHtml } from "../utils/html";
import type { Chapter } from "../types/appState";

export function chapterFilterChipsHtml(chapters: Chapter[], selectedId: string | null, allLabel: string): string {
  return `
    <div class="filter-bar">
      <button type="button" class="filter-pill ${selectedId === null ? "active" : ""}" data-chapter-filter="">${escapeHtml(allLabel)}</button>
      ${chapters.map((c) => `<button type="button" class="filter-pill ${selectedId === c.id ? "active" : ""}" data-chapter-filter="${c.id}">${c.num}</button>`).join("")}
    </div>
  `;
}

export function searchHeaderHtml(inputId: string, title: string, placeholder: string): string {
  return `
    <section class="view-header">
      <h2>${escapeHtml(title)}</h2>
      <input type="search" id="${inputId}" class="search-input" placeholder="${escapeHtml(placeholder)}"/>
    </section>
  `;
}

// Binds a search input without touching its DOM node on every keystroke, so
// focus and caret position survive typing. `currentValue` re-syncs the input
// after a full shell re-render (e.g. language switch); `onInput` should only
// update the results container, never call the view's full refresh().
export function bindSearch(root: ParentNode, inputId: string, currentValue: string, onInput: (value: string) => void): void {
  const input = root.querySelector<HTMLInputElement>(`#${inputId}`);
  if (!input) return;
  input.value = currentValue;
  input.addEventListener("input", () => onInput(input.value));
}
