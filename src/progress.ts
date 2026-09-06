import { getChapters } from "./data/bookData";
import { getState } from "./state/storage";
import type { Chapter, Section } from "./types/appState";
import { TOTAL_FLASHCARDS, TOTAL_LABS, TOTAL_SECTIONS } from "./constants";

export interface ProgressStats {
  readPct: number;
  handsOnPct: number;
  deliverablesPct: number;
  overallPct: number;
  activeChapter: Chapter | null;
  nextSection: Section | null;
}

function isChapterComplete(chapter: Chapter, state: ReturnType<typeof getState>): boolean {
  if (chapter.tbd) return true;
  return chapter.sections.every((s) => state.read[s.id] && state.handsOn[s.id]);
}

export function calculateProgress(): ProgressStats {
  const chapters = getChapters();
  const state = getState();

  let readCount = 0;
  let handsOnCount = 0;
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (state.read[section.id]) readCount++;
      if (state.handsOn[section.id]) handsOnCount++;
    }
  }

  let labDoneCount = 0;
  let flashcardDoneCount = 0;
  for (const chapter of chapters) {
    if (state.labDone[chapter.labId]) labDoneCount++;
    if (state.flashcardDone[chapter.flashcardId]) flashcardDoneCount++;
  }

  const readPct = (readCount / TOTAL_SECTIONS) * 100;
  const handsOnPct = (handsOnCount / TOTAL_SECTIONS) * 100;
  const deliverablesPct = ((labDoneCount + flashcardDoneCount) / (TOTAL_LABS + TOTAL_FLASHCARDS)) * 100;
  const overallPct = readPct * 0.4 + handsOnPct * 0.4 + deliverablesPct * 0.2;

  const activeChapter = chapters.find((c) => !isChapterComplete(c, state)) ?? null;
  const nextSection = activeChapter
    ? (activeChapter.sections.find((s) => !state.read[s.id]) ?? null)
    : null;

  return { readPct, handsOnPct, deliverablesPct, overallPct, activeChapter, nextSection };
}
