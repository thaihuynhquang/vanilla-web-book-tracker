import type { Chapter, Lab, GlossaryTerm, Resource, QuitCriteriaRow, FlashcardTask, Lang } from "../types/appState";
import { getChaptersVi, getLabsVi, getQuitCriteriaVi, getGlossaryVi, getResourcesVi, getFlashcardTasksVi } from "./bookData.vi";
import { getChaptersEn, getLabsEn, getQuitCriteriaEn, getGlossaryEn, getResourcesEn, getFlashcardTasksEn } from "./bookData.en";
import { getLangState } from "../state/storage";
import { TOTAL_SECTIONS, TOTAL_LABS, TOTAL_FLASHCARDS } from "../constants";

function assertIdSetsMatch(label: string, viIds: string[], enIds: string[]): void {
  if (import.meta.env.PROD) return;
  const viSet = new Set(viIds);
  const enSet = new Set(enIds);
  const diverged = viIds.length !== enIds.length || viIds.some((id) => !enSet.has(id)) || enIds.some((id) => !viSet.has(id));
  if (diverged) {
    console.error(`[bookData] id set mismatch between bookData.vi.ts and bookData.en.ts for ${label}`);
  }
}

function assertContentCounts(): void {
  if (import.meta.env.PROD) return;
  const chapters = getChaptersVi();
  const totalSections = chapters.reduce((sum, c) => sum + c.sections.length, 0);
  if (chapters.length !== 15) {
    console.error(`[bookData] expected 15 chapters, found ${chapters.length}`);
  }
  if (totalSections !== TOTAL_SECTIONS) {
    console.error(`[bookData] expected ${TOTAL_SECTIONS} sections, found ${totalSections}`);
  }
  if (getLabsVi().length !== TOTAL_LABS) {
    console.error(`[bookData] expected ${TOTAL_LABS} labs, found ${getLabsVi().length}`);
  }
  if (getFlashcardTasksVi().length !== TOTAL_FLASHCARDS) {
    console.error(`[bookData] expected ${TOTAL_FLASHCARDS} flashcard tasks, found ${getFlashcardTasksVi().length}`);
  }
}

assertIdSetsMatch("chapters", getChaptersVi().map((c) => c.id), getChaptersEn().map((c) => c.id));
assertIdSetsMatch("labs", getLabsVi().map((l) => l.id), getLabsEn().map((l) => l.id));
assertIdSetsMatch("quitCriteria", getQuitCriteriaVi().map((q) => q.id), getQuitCriteriaEn().map((q) => q.id));
assertContentCounts();

function lang(): Lang {
  return getLangState();
}

export function getChapters(): Chapter[] {
  return lang() === "vi" ? getChaptersVi() : getChaptersEn();
}

export function getLabs(): Lab[] {
  return lang() === "vi" ? getLabsVi() : getLabsEn();
}

export function getQuitCriteriaData(): QuitCriteriaRow[] {
  return lang() === "vi" ? getQuitCriteriaVi() : getQuitCriteriaEn();
}

export function getGlossary(): GlossaryTerm[] {
  return lang() === "vi" ? getGlossaryVi() : getGlossaryEn();
}

export function getResources(): Resource[] {
  return lang() === "vi" ? getResourcesVi() : getResourcesEn();
}

export function getFlashcardTasks(): FlashcardTask[] {
  return lang() === "vi" ? getFlashcardTasksVi() : getFlashcardTasksEn();
}

export function getMetaData(): { totalSections: number; totalLabs: number; totalFlashcards: number } {
  const chapters = getChapters();
  return {
    totalSections: chapters.reduce((sum, c) => sum + c.sections.length, 0),
    totalLabs: getLabs().length,
    totalFlashcards: getFlashcardTasks().length,
  };
}
