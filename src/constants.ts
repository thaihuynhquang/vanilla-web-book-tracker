import type { RouteId } from "./types/appState";

export const STORAGE_KEY = "vanilla-web-tracker-state";
export const THEME_KEY = "vanilla-web-tracker-theme";
export const LANG_KEY = "vanilla-web-tracker-lang";

export const ROUTE_IDS: RouteId[] = [
  "dashboard",
  "chapters",
  "pomodoro",
  "resources",
  "quitcriteria",
];

// Pre-merge saves/backups may still reference retired route ids.
export const LEGACY_ROUTE_ALIASES: Record<string, RouteId> = {
  glossary: "resources",
  labs: "chapters",
};

export const CHAPTER_STATUS_COLOR: Record<"notStarted" | "inProgress" | "done", string> = {
  notStarted: "var(--status-idle)",
  inProgress: "var(--accent-amber)",
  done: "var(--accent-lime)",
};

export const TOTAL_SECTIONS = 95;
export const TOTAL_LABS = 15;
export const TOTAL_FLASHCARDS = 15;

export const DEFAULT_POMODORO_WORK_MINUTES = 25;
export const DEFAULT_POMODORO_BREAK_MINUTES = 5;
export const DEFAULT_POMODORO_LONG_BREAK_MINUTES = 15;

export const FLASHCARDS_GUIDE_URL =
  "https://github.com/thaihuynhquang/vanilla-web-book-tracker/blob/main/docs/content/flashcards_guide.md";
