export interface SubSection {
  num: string;
  title: string;
}

export interface Section {
  id: string;
  num: string;
  title: string;
  subsections: SubSection[];
  estMinutes: number;
}

export interface Chapter {
  id: string;
  num: number;
  title: string;
  summary: string;
  tbd: boolean;
  sections: Section[];
  labId: string;
  flashcardId: string;
  glossaryRefs: string[];
}

export interface Lab {
  id: string;
  chapterId: string;
  title: string;
  goal: string;
  requirements: string[];
  acceptanceCriteria: string[];
  apisUsed: string[];
  tbd: boolean;
}

export interface FlashcardTask {
  id: string;
  chapterId: string;
}

export interface GlossaryTerm {
  id: string;
  name: string;
  chapterIds: string[];
  descriptionVi: string;
  mdnUrl: string;
  specUrl?: string;
}

export type ResourceType = "mdn" | "spec" | "article" | "video" | "demo" | "tool";

export interface Resource {
  id: string;
  chapterId: string;
  title: string;
  url: string;
  type: ResourceType;
}

export interface QuitCriteriaRow {
  id: string;
  chapterId: string;
  stopSignal: string;
  exitCriteria: string;
}

export type RouteId = "dashboard" | "chapters" | "labs" | "glossary" | "resources" | "quitcriteria";

export type Theme = "dark" | "light";
export type Lang = "vi" | "en";

export interface PomodoroSettings {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
}

export interface PomodoroSession {
  completedAt: string;
  durationMinutes: number;
}

export interface AppState {
  read: Record<string, boolean>;
  handsOn: Record<string, boolean>;
  labDone: Record<string, boolean>;
  flashcardDone: Record<string, boolean>;
  resourceFlags: Record<string, boolean>;
  activeTab: RouteId;
  theme: Theme;
  lang: Lang;
  pomodoroSettings: PomodoroSettings;
  pomodoroSessions: PomodoroSession[];
}
