import type { AppState, Lang, RouteId, Theme } from "../types/appState";
import {
  DEFAULT_POMODORO_BREAK_MINUTES,
  DEFAULT_POMODORO_LONG_BREAK_MINUTES,
  DEFAULT_POMODORO_WORK_MINUTES,
  LANG_KEY,
  LEGACY_ROUTE_ALIASES,
  ROUTE_IDS,
  STORAGE_KEY,
  THEME_KEY,
} from "../constants";

export function normalizeActiveTab(tab: unknown, fallback: RouteId): RouteId {
  const resolved = LEGACY_ROUTE_ALIASES[tab as string] ?? tab;
  return ROUTE_IDS.includes(resolved as RouteId) ? (resolved as RouteId) : fallback;
}

function defaultState(): AppState {
  return {
    read: {},
    handsOn: {},
    labDone: {},
    flashcardDone: {},
    activeTab: "dashboard",
    theme: "dark",
    lang: "vi",
    pomodoroSettings: {
      workMinutes: DEFAULT_POMODORO_WORK_MINUTES,
      breakMinutes: DEFAULT_POMODORO_BREAK_MINUTES,
      longBreakMinutes: DEFAULT_POMODORO_LONG_BREAK_MINUTES,
    },
    pomodoroSessions: [],
  };
}

function detectPreferredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function detectPreferredLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "vi" || stored === "en") return stored;
  return "vi";
}

export function loadState(): AppState {
  const fallback = defaultState();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    fallback.theme = detectPreferredTheme();
    fallback.lang = detectPreferredLang();
    return fallback;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      read: parsed.read ?? fallback.read,
      handsOn: parsed.handsOn ?? fallback.handsOn,
      labDone: parsed.labDone ?? fallback.labDone,
      flashcardDone: parsed.flashcardDone ?? fallback.flashcardDone,
      activeTab: normalizeActiveTab(parsed.activeTab, fallback.activeTab),
      theme: parsed.theme ?? detectPreferredTheme(),
      lang: parsed.lang ?? detectPreferredLang(),
      pomodoroSettings: { ...fallback.pomodoroSettings, ...parsed.pomodoroSettings },
      pomodoroSessions: parsed.pomodoroSessions ?? fallback.pomodoroSessions,
    };
  } catch {
    fallback.theme = detectPreferredTheme();
    fallback.lang = detectPreferredLang();
    return fallback;
  }
}

let state: AppState = loadState();

export function saveState(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(THEME_KEY, state.theme);
  localStorage.setItem(LANG_KEY, state.lang);
}

export function getState(): AppState {
  return state;
}

export function replaceState(next: AppState): void {
  state = {
    ...next,
    activeTab: normalizeActiveTab(next.activeTab, "dashboard"),
    pomodoroSettings: { ...defaultState().pomodoroSettings, ...next.pomodoroSettings },
  };
  saveState();
}

export function setThemeState(theme: Theme): void {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  saveState();
}

export function getLangState(): Lang {
  return state.lang;
}

export function setLangState(lang: Lang): void {
  state.lang = lang;
  document.documentElement.lang = lang;
  saveState();
}

export function setActiveTabState(tab: RouteId): void {
  state.activeTab = tab;
  saveState();
}

export function toggleRead(sectionId: string): void {
  state.read[sectionId] = !state.read[sectionId];
  saveState();
}

export function toggleHandsOn(sectionId: string): void {
  state.handsOn[sectionId] = !state.handsOn[sectionId];
  saveState();
}

export function toggleLabDone(labId: string): void {
  state.labDone[labId] = !state.labDone[labId];
  saveState();
}

export function toggleFlashcardDone(flashcardId: string): void {
  state.flashcardDone[flashcardId] = !state.flashcardDone[flashcardId];
  saveState();
}

export function setPomodoroSettings(workMinutes: number, breakMinutes: number, longBreakMinutes: number): void {
  state.pomodoroSettings = { workMinutes, breakMinutes, longBreakMinutes };
  saveState();
}

export function addPomodoroSession(durationMinutes: number): void {
  state.pomodoroSessions.push({ completedAt: new Date().toISOString(), durationMinutes });
  saveState();
}

export function removePomodoroSession(index: number): void {
  state.pomodoroSessions.splice(index, 1);
  saveState();
}

export function resetProgress(): void {
  const preserved: Pick<AppState, "activeTab" | "theme" | "lang"> = {
    activeTab: state.activeTab,
    theme: state.theme,
    lang: state.lang,
  };
  state = {
    ...defaultState(),
    ...preserved,
  };
  saveState();
}
