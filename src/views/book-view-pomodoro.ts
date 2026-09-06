import { getState, addPomodoroSession, removePomodoroSession, setPomodoroSettings } from "../state/storage";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { playChime } from "../utils/audio";
import { requestNotificationPermission, showNotification } from "../utils/notification";
import { BookView } from "./base";

type PomodoroMode = "focus" | "shortBreak" | "longBreak";

const RING_RADIUS = 54;
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
              <button type="button" class="pomodoro-mode-btn active" data-pomo-mode="focus" data-i18n="pomodoro.mode.focus">${t("pomodoro.mode.focus")}</button>
              <button type="button" class="pomodoro-mode-btn" data-pomo-mode="shortBreak" data-i18n="pomodoro.mode.shortBreak">${t("pomodoro.mode.shortBreak")}</button>
              <button type="button" class="pomodoro-mode-btn" data-pomo-mode="longBreak" data-i18n="pomodoro.mode.longBreak">${t("pomodoro.mode.longBreak")}</button>
            </div>
            <div class="pomodoro-ring-wrap">
              <svg viewBox="0 0 120 120" class="pomodoro-ring">
                <circle cx="60" cy="60" r="${RING_RADIUS}" class="pomodoro-ring-track"/>
                <circle cx="60" cy="60" r="${RING_RADIUS}" class="pomodoro-ring-progress" id="pomo-ring-progress"
                  stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="0"/>
              </svg>
              <div class="pomodoro-time" id="pomo-time-display">25:00</div>
            </div>
            <div class="pomodoro-controls">
              <button type="button" class="btn btn-primary" id="pomo-toggle"></button>
              <button type="button" class="btn btn-ghost" id="pomo-reset" data-i18n="pomodoro.reset">${t("pomodoro.reset")}</button>
            </div>
            <div class="pomodoro-presets">
              <button type="button" class="chip" data-pomo-preset="25-5" data-i18n="pomodoro.preset.2505">${t("pomodoro.preset.2505")}</button>
              <button type="button" class="chip" data-pomo-preset="50-5" data-i18n="pomodoro.preset.5005">${t("pomodoro.preset.5005")}</button>
              <button type="button" class="chip" id="pomo-preset-custom" data-i18n="pomodoro.preset.custom">${t("pomodoro.preset.custom")}</button>
            </div>
            <div class="pomodoro-custom-form" id="pomo-custom-form" hidden>
              <label>
                <span data-i18n="pomodoro.custom.work">${t("pomodoro.custom.work")}</span>
                <input type="number" min="1" id="pomo-custom-work" value="${getState().pomodoroSettings.workMinutes}"/>
              </label>
              <label>
                <span data-i18n="pomodoro.custom.break">${t("pomodoro.custom.break")}</span>
                <input type="number" min="1" id="pomo-custom-break" value="${getState().pomodoroSettings.breakMinutes}"/>
              </label>
              <button type="button" class="btn btn-primary btn-sm" id="pomo-custom-apply" data-i18n="pomodoro.custom.apply">${t("pomodoro.custom.apply")}</button>
            </div>
          </div>
          <div class="pomodoro-stats" id="dash-pomodoro-stats"></div>
        </div>
        <div class="card pomodoro-history-card">
          <h3 data-i18n="pomodoro.history.title">${t("pomodoro.history.title")}</h3>
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
      });
    });
    this.querySelector("#pomo-preset-custom")?.addEventListener("click", () => {
      const form = this.querySelector<HTMLElement>("#pomo-custom-form");
      if (form) form.hidden = !form.hidden;
    });
    this.querySelector("#pomo-custom-apply")?.addEventListener("click", () => {
      const work = Number(this.querySelector<HTMLInputElement>("#pomo-custom-work")?.value);
      const brk = Number(this.querySelector<HTMLInputElement>("#pomo-custom-break")?.value);
      if (Number.isFinite(work) && work > 0 && Number.isFinite(brk) && brk > 0) {
        setPomodoroSettings(work, brk, getState().pomodoroSettings.longBreakMinutes);
        this.resetTimer();
      }
    });

    this.remainingSeconds = this.modeMinutes() * 60;
    this.updateTimerDisplay();
    this.updateToggleButton();
  }

  private setMode(mode: PomodoroMode): void {
    this.mode = mode;
    this.querySelectorAll<HTMLElement>("[data-pomo-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.pomoMode === mode);
    });
    const ringWrap = this.querySelector<HTMLElement>(".pomodoro-ring-wrap");
    ringWrap?.classList.toggle("break", mode !== "focus");
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

    const pomoStatsEl = this.querySelector("#dash-pomodoro-stats");
    if (pomoStatsEl) {
      const totalMinutes = state.pomodoroSessions.reduce((sum, s) => sum + s.durationMinutes, 0);
      pomoStatsEl.innerHTML = `
        <div class="pomodoro-stat"><span class="pomodoro-stat-value">${state.pomodoroSessions.length}</span><span class="pomodoro-stat-label">${t("pomodoro.stats.sessions")}</span></div>
        <div class="pomodoro-stat"><span class="pomodoro-stat-value">${(totalMinutes / 60).toFixed(1)}</span><span class="pomodoro-stat-label">${t("pomodoro.stats.hours")}</span></div>
      `;
    }

    const historyEl = this.querySelector("#pomo-history-list");
    if (historyEl) {
      if (state.pomodoroSessions.length === 0) {
        historyEl.innerHTML = `<li class="pomodoro-history-empty">${t("pomodoro.history.empty")}</li>`;
      } else {
        historyEl.innerHTML = state.pomodoroSessions
          .map((s, i) => `
            <li class="pomodoro-history-item">
              <span>${new Date(s.completedAt).toLocaleString()}</span>
              <span class="history-duration">${s.durationMinutes} ${t("pomodoro.history.minutes")}</span>
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
