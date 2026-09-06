import type { AppState } from "../types/appState";
import { getState, normalizeActiveTab, replaceState } from "../state/storage";
import { renderAll } from "../renderer";
import { showToast } from "../toast";
import { t } from "../i18n";

function isFinitePositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isValidAppState(value: unknown): value is AppState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (
    typeof v.read !== "object" ||
    typeof v.handsOn !== "object" ||
    typeof v.labDone !== "object" ||
    typeof v.flashcardDone !== "object" ||
    typeof v.resourceFlags !== "object" ||
    typeof v.activeTab !== "string" ||
    typeof v.theme !== "string" ||
    typeof v.lang !== "string" ||
    typeof v.pomodoroSettings !== "object" ||
    v.pomodoroSettings === null ||
    !Array.isArray(v.pomodoroSessions)
  ) {
    return false;
  }
  if (v.theme !== "dark" && v.theme !== "light") return false;
  if (v.lang !== "vi" && v.lang !== "en") return false;

  const pomodoroSettings = v.pomodoroSettings as Record<string, unknown>;
  if (!isFinitePositiveNumber(pomodoroSettings.workMinutes)) return false;
  if (!isFinitePositiveNumber(pomodoroSettings.breakMinutes)) return false;
  if (pomodoroSettings.longBreakMinutes !== undefined && !isFinitePositiveNumber(pomodoroSettings.longBreakMinutes)) return false;

  return true;
}

export function exportStateJSON(): void {
  const state = getState();
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0, 10);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vanilla-web-tracker-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(t("toast.export.success"), "success");
}

export function importState(file: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!isValidAppState(parsed)) throw new Error("Invalid AppState shape");
      parsed.activeTab = normalizeActiveTab(parsed.activeTab, "dashboard");
      replaceState(parsed);
      document.documentElement.setAttribute("data-theme", parsed.theme);
      renderAll();
      showToast(t("toast.import.success"), "success");
    } catch {
      showToast(t("toast.import.error"), "error");
    }
  };
  reader.onerror = () => showToast(t("toast.import.error"), "error");
  reader.readAsText(file);
}
