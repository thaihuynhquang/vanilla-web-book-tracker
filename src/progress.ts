import { getChapters } from "./data/bookData";
import { getState } from "./state/storage";
import type { Chapter, Section } from "./types/appState";
import { CHAPTER_STATUS_COLOR, TOTAL_FLASHCARDS, TOTAL_LABS, TOTAL_SECTIONS } from "./constants";

export type ChapterStatus = "notStarted" | "inProgress" | "done";

export interface ChapterProgress {
  chapter: Chapter;
  total: number;
  readCount: number;
  handsOnCount: number;
  completedCount: number;
  percentage: number;
  estMinutes: number;
  status: ChapterStatus;
  statusColor: string;
}

export interface ProgressStats {
  readPct: number;
  handsOnPct: number;
  deliverablesPct: number;
  overallPct: number;
  readCount: number;
  handsOnCount: number;
  labDoneCount: number;
  flashcardDoneCount: number;
  activeChapter: Chapter | null;
  nextSection: Section | null;
  chapterProgresses: ChapterProgress[];
}

function isChapterComplete(chapter: Chapter, state: ReturnType<typeof getState>): boolean {
  if (chapter.tbd) return true;
  return chapter.sections.every((s) => state.read[s.id] && state.handsOn[s.id]);
}

function buildChapterProgress(chapter: Chapter, state: ReturnType<typeof getState>): ChapterProgress {
  const total = chapter.sections.length;

  if (chapter.tbd || total === 0) {
    return {
      chapter,
      total: 0,
      readCount: 0,
      handsOnCount: 0,
      completedCount: 0,
      percentage: 0,
      estMinutes: 0,
      status: "notStarted",
      statusColor: CHAPTER_STATUS_COLOR.notStarted,
    };
  }

  let readCount = 0;
  let handsOnCount = 0;
  let completedCount = 0;
  let estMinutes = 0;
  for (const section of chapter.sections) {
    const isRead = !!state.read[section.id];
    const isHandsOn = !!state.handsOn[section.id];
    if (isRead) readCount++;
    if (isHandsOn) handsOnCount++;
    if (isRead && isHandsOn) completedCount++;
    estMinutes += section.estMinutes;
  }

  const percentage = Math.round(((readCount + handsOnCount) / (total * 2)) * 100);
  const status: ChapterStatus = percentage === 100 ? "done" : percentage > 0 ? "inProgress" : "notStarted";

  return {
    chapter,
    total,
    readCount,
    handsOnCount,
    completedCount,
    percentage,
    estMinutes,
    status,
    statusColor: CHAPTER_STATUS_COLOR[status],
  };
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

  const chapterProgresses = chapters.map((c) => buildChapterProgress(c, state));

  return {
    readPct,
    handsOnPct,
    deliverablesPct,
    overallPct,
    readCount,
    handsOnCount,
    labDoneCount,
    flashcardDoneCount,
    activeChapter,
    nextSection,
    chapterProgresses,
  };
}
