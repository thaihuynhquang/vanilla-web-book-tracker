import { getState, addPomodoroSession, removePomodoroSession, setPomodoroSettings } from "../state/storage";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { playChime } from "../utils/audio";
import { requestNotificationPermission, showNotification } from "../utils/notification";
import { BookView } from "./base";

type PomodoroMode = "focus" | "shortBreak" | "longBreak";

const RING_RADIUS = 56;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export class BookViewPomodoro extends BookView {
  private mode: PomodoroMode = "focus";
  private remainingSeconds = 0;
  private endsAt: number | null = null;
  private intervalId: number | null = null;
  private running = false;
  private shellReady = false;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopInterval();
  }

  private renderShell(): void {
    this.innerHTML = `
      <section class="pomodoro-container">
        <div class="card pomodoro-hero-card">
          <h2 data-i18n="pomodoro.stats.title">${t("pomodoro.stats.title")}</h2>
          <div class="pomodoro-widget">
            <div class="pomodoro-modes">
              <button type="button" class="pomodoro-mode-btn active" data-pomo-mode="focus" aria-pressed="true" data-i18n="pomodoro.mode.focus">${t("pomodoro.mode.focus")}</button>
              <button type="button" class="pomodoro-mode-btn" data-pomo-mode="shortBreak" aria-pressed="false" data-i18n="pomodoro.mode.shortBreak">${t("pomodoro.mode.shortBreak")}</button>
              <button type="button" class="pomodoro-mode-btn" data-pomo-mode="longBreak" aria-pressed="false" data-i18n="pomodoro.mode.longBreak">${t("pomodoro.mode.longBreak")}</button>
            </div>
            <div class="pomodoro-ring-wrap">
              <svg viewBox="0 0 120 120" class="pomodoro-ring">
                <circle cx="60" cy="60" r="${RING_RADIUS}" class="pomodoro-ring-track"/>
                <circle cx="60" cy="60" r="${RING_RADIUS}" class="pomodoro-ring-progress" id="pomo-ring-progress"
                  stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="0"/>
              </svg>
              <div class="pomodoro-time" id="pomo-time-display" role="timer" aria-live="off">25:00</div>
            </div>
            <div class="pomodoro-controls">
              <button type="button" class="btn btn-primary" id="pomo-toggle"></button>
              <button type="button" class="btn btn-ghost" id="pomo-reset">${icon("rotateCcw")}<span data-i18n="pomodoro.reset">${t("pomodoro.reset")}</span></button>
            </div>
            <div class="pomodoro-presets">
              <button type="button" class="pomodoro-preset-btn" data-pomo-preset="25-5" aria-pressed="false" data-i18n="pomodoro.preset.2505">${t("pomodoro.preset.2505")}</button>
              <button type="button" class="pomodoro-preset-btn" data-pomo-preset="50-5" aria-pressed="false" data-i18n="pomodoro.preset.5005">${t("pomodoro.preset.5005")}</button>
              <button type="button" class="pomodoro-preset-btn" id="pomo-preset-custom" aria-expanded="false" data-i18n="pomodoro.preset.custom">${t("pomodoro.preset.custom")}</button>
            </div>
            <div class="pomodoro-custom-form" id="pomo-custom-form" hidden>
              <div class="pomodoro-custom-group">
                <label for="pomo-custom-work" data-i18n="pomodoro.custom.work">${t("pomodoro.custom.work")}</label>
                <input type="number" min="1" id="pomo-custom-work" class="pomodoro-custom-input" value="${getState().pomodoroSettings.workMinutes}"/>
              </div>
              <div class="pomodoro-custom-group">
                <label for="pomo-custom-break" data-i18n="pomodoro.custom.break">${t("pomodoro.custom.break")}</label>
                <input type="number" min="1" id="pomo-custom-break" class="pomodoro-custom-input" value="${getState().pomodoroSettings.breakMinutes}"/>
              </div>
              <button type="button" class="btn btn-primary btn-sm" id="pomo-custom-apply" data-i18n="pomodoro.custom.apply">${t("pomodoro.custom.apply")}</button>
            </div>
          </div>
        </div>
        <section class="stat-grid" id="pomo-metrics"></section>
        <div class="card pomodoro-history-card">
          <div class="progress-header">
            <span class="progress-title" data-i18n="pomodoro.history.title">${t("pomodoro.history.title")}</span>
            <span class="section-heading-subtitle" id="pomo-history-count"></span>
          </div>
          <ul class="pomodoro-history-list" id="pomo-history-list"></ul>
        </div>
      </section>
    `;

    this.querySelectorAll<HTMLElement>("[data-pomo-mode]").forEach((btn) => {
      btn.addEventListener("click", () => this.setMode(btn.dataset.pomoMode as PomodoroMode));
    });
    this.querySelector("#pomo-toggle")?.addEventListener("click", () => this.toggleTimer());
    this.querySelector("#pomo-reset")?.addEventListener("click", () => this.resetTimer());
    this.querySelectorAll<HTMLElement>("[data-pomo-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [work, brk] = (btn.dataset.pomoPreset ?? "25-5").split("-").map(Number);
        setPomodoroSettings(work, brk, getState().pomodoroSettings.longBreakMinutes);
        this.resetTimer();
        this.syncPresetChips();
        this.closeCustomForm();
      });
    });
    this.querySelector("#pomo-preset-custom")?.addEventListener("click", (e) => {
      const form = this.querySelector<HTMLElement>("#pomo-custom-form");
      const btn = e.currentTarget as HTMLElement;
      if (form) form.hidden = !form.hidden;
      const isOpen = form ? !form.hidden : false;
      btn.setAttribute("aria-expanded", String(isOpen));
      btn.classList.toggle("active", isOpen);
      if (isOpen) {
        this.querySelectorAll<HTMLElement>("[data-pomo-preset]").forEach((preset) => {
          preset.classList.remove("active");
          preset.setAttribute("aria-pressed", "false");
        });
      }
    });
    this.querySelector("#pomo-custom-apply")?.addEventListener("click", () => {
      const work = Number(this.querySelector<HTMLInputElement>("#pomo-custom-work")?.value);
      const brk = Number(this.querySelector<HTMLInputElement>("#pomo-custom-break")?.value);
      if (Number.isFinite(work) && work > 0 && Number.isFinite(brk) && brk > 0) {
        setPomodoroSettings(work, brk, getState().pomodoroSettings.longBreakMinutes);
        this.resetTimer();
        this.syncPresetChips();
      }
    });

    this.remainingSeconds = this.modeMinutes() * 60;
    this.updateTimerDisplay();
    this.updateToggleButton();
    this.syncPresetChips();
  }

  private syncPresetChips(): void {
    const settings = getState().pomodoroSettings;
    this.querySelectorAll<HTMLElement>("[data-pomo-preset]").forEach((btn) => {
      const [work, brk] = (btn.dataset.pomoPreset ?? "").split("-").map(Number);
      const isActive = work === settings.workMinutes && brk === settings.breakMinutes;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  private closeCustomForm(): void {
    const form = this.querySelector<HTMLElement>("#pomo-custom-form");
    const btn = this.querySelector<HTMLElement>("#pomo-preset-custom");
    if (form) form.hidden = true;
    btn?.setAttribute("aria-expanded", "false");
    btn?.classList.remove("active");
  }

  private setConfigEnabled(enabled: boolean): void {
    this.querySelectorAll<HTMLButtonElement>("[data-pomo-preset], #pomo-preset-custom, #pomo-custom-apply").forEach((btn) => {
      btn.disabled = !enabled;
    });
  }

  private setMode(mode: PomodoroMode): void {
    this.mode = mode;
    this.querySelectorAll<HTMLElement>("[data-pomo-mode]").forEach((btn) => {
      const isActive = btn.dataset.pomoMode === mode;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
    const widget = this.querySelector<HTMLElement>(".pomodoro-widget");
    widget?.classList.toggle("break", mode !== "focus");
    this.resetTimer();
  }

  private modeMinutes(): number {
    const settings = getState().pomodoroSettings;
    if (this.mode === "focus") return settings.workMinutes;
    if (this.mode === "shortBreak") return settings.breakMinutes;
    return settings.longBreakMinutes;
  }

  private toggleTimer(): void {
    this.running ? this.pauseTimer() : this.startTimer();
  }

  private startTimer(): void {
    if (this.running) return;
    requestNotificationPermission();
    this.running = true;
    this.endsAt = Date.now() + this.remainingSeconds * 1000;
    this.updateToggleButton();
    this.setConfigEnabled(false);
    this.querySelector(".pomodoro-ring-wrap")?.classList.add("running");
    this.intervalId = window.setInterval(() => this.tick(), 250);
  }

  private pauseTimer(): void {
    if (this.endsAt !== null) {
      this.remainingSeconds = Math.max(0, Math.round((this.endsAt - Date.now()) / 1000));
    }
    this.running = false;
    this.endsAt = null;
    this.updateToggleButton();
    this.setConfigEnabled(true);
    this.querySelector(".pomodoro-ring-wrap")?.classList.remove("running");
    this.stopInterval();
  }

  private resetTimer(): void {
    this.pauseTimer();
    this.remainingSeconds = this.modeMinutes() * 60;
    this.updateTimerDisplay();
  }

  private stopInterval(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private tick(): void {
    if (this.endsAt === null) return;
    const remaining = Math.round((this.endsAt - Date.now()) / 1000);
    if (remaining <= 0) {
      this.remainingSeconds = 0;
      this.updateTimerDisplay();
      this.onTimerComplete();
      return;
    }
    this.remainingSeconds = remaining;
    this.updateTimerDisplay();
  }

  private onTimerComplete(): void {
    const wasFocus = this.mode === "focus";
    const completedMinutes = this.modeMinutes();
    this.pauseTimer();
    playChime();
    showNotification(
      t("pomodoro.notification.title"),
      wasFocus ? t("pomodoro.notification.focusDone") : t("pomodoro.notification.breakDone"),
    );
    if (wasFocus) {
      addPomodoroSession(completedMinutes);
    }
    this.remainingSeconds = 0;
    this.updateTimerDisplay();
    renderAll();
  }

  private updateTimerDisplay(): void {
    const total = this.modeMinutes() * 60;
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    const display = this.querySelector("#pomo-time-display");
    if (display) display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    const ring = this.querySelector<SVGCircleElement>("#pomo-ring-progress");
    if (ring) {
      const fraction = total > 0 ? this.remainingSeconds / total : 0;
      ring.setAttribute("stroke-dashoffset", String(RING_CIRCUMFERENCE * (1 - fraction)));
    }
  }

  private updateToggleButton(): void {
    const toggleBtn = this.querySelector<HTMLButtonElement>("#pomo-toggle");
    if (!toggleBtn) return;
    toggleBtn.innerHTML = `${icon(this.running ? "pause" : "play")} ${t(this.running ? "pomodoro.pause" : "pomodoro.start")}`;
  }

  refresh(): void {
    if (!this.shellReady) {
      this.renderShell();
      this.shellReady = true;
    } else {
      // Static pomodoro chrome carries data-i18n and is swept by applyStaticTranslations()
      // on language switch; only the dynamic toggle-button label needs a manual refresh.
      this.updateToggleButton();
    }

    const state = getState();

    const metricsEl = this.querySelector("#pomo-metrics");
    if (metricsEl) {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const todaySessions = state.pomodoroSessions.filter((s) => new Date(s.completedAt).getTime() >= startOfToday.getTime());
      const todayMinutes = todaySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
      const todayHoursStr = new Intl.NumberFormat(state.lang === "en" ? "en-US" : "vi-VN", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(todayMinutes / 60);

      metricsEl.innerHTML = `
        <div class="metric-card">
          <div class="metric-icon metric-icon--primary">${icon("pomodoro")}</div>
          <div class="metric-info">
            <span class="metric-value">${todaySessions.length}</span>
            <span class="metric-label">${t("pomodoro.metric.todaySessions")}</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon metric-icon--lime">${icon("clock")}</div>
          <div class="metric-info">
            <span class="metric-value">${todayMinutes} ${t("pomodoro.history.minutes")}</span>
            <span class="metric-label">${t("pomodoro.metric.todayMinutes", { hours: todayHoursStr })}</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon metric-icon--amber">${icon("trophy")}</div>
          <div class="metric-info">
            <span class="metric-value">${state.pomodoroSessions.length}</span>
            <span class="metric-label">${t("pomodoro.metric.totalSessions")}</span>
          </div>
        </div>
      `;
    }

    const historyCountEl = this.querySelector("#pomo-history-count");
    if (historyCountEl) {
      historyCountEl.textContent = t("pomodoro.history.count", { count: state.pomodoroSessions.length });
    }

    const historyEl = this.querySelector("#pomo-history-list");
    if (historyEl) {
      if (state.pomodoroSessions.length === 0) {
        historyEl.innerHTML = `<li class="pomodoro-history-empty">${t("pomodoro.history.empty")}</li>`;
      } else {
        historyEl.innerHTML = state.pomodoroSessions
          .map((s, i) => `
            <li class="pomodoro-history-item">
              <span class="tag">${icon("checkCircle")} +1 Pomodoro</span>
              <span>${new Date(s.completedAt).toLocaleString()}</span>
              <span class="history-duration">(${s.durationMinutes} ${t("pomodoro.history.minutes")})</span>
              <button type="button" class="icon-btn" data-history-index="${i}" aria-label="${t("pomodoro.history.delete")}">${icon("close")}</button>
            </li>
          `)
          .reverse()
          .join("");
        historyEl.querySelectorAll<HTMLElement>("[data-history-index]").forEach((btn) => {
          btn.addEventListener("click", () => {
            removePomodoroSession(Number(btn.dataset.historyIndex));
            renderAll();
          });
        });
      }
    }
  }
}

customElements.define("book-view-pomodoro", BookViewPomodoro);
