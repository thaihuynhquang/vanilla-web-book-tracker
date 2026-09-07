import { calculateProgress } from "../progress";
import { getState, toggleRead, toggleHandsOn } from "../state/storage";
import { renderAll } from "../renderer";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import { TOTAL_SECTIONS } from "../constants";
import { surfaceCardHtml } from "./helpers";
import { BookView } from "./base";

export class BookViewDashboard extends BookView {
  refresh(): void {
    const stats = calculateProgress();
    const state = getState();
    const totalFocusHours = state.pomodoroSessions.reduce((sum, s) => sum + s.durationMinutes, 0) / 60;

    this.innerHTML = `
      <section class="stat-grid">
        <div class="metric-card">
          <div class="metric-icon metric-icon--primary">${icon("bookOpen")}</div>
          <div class="metric-info">
            <span class="metric-value">${stats.readCount}/${TOTAL_SECTIONS}</span>
            <span class="metric-label">${t("dashboard.metric.sections")}</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon metric-icon--amber">${icon("flask")}</div>
          <div class="metric-info">
            <span class="metric-value">${stats.handsOnCount}</span>
            <span class="metric-label">${t("dashboard.metric.handson")}</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon metric-icon--sky">${icon("target")}</div>
          <div class="metric-info">
            <span class="metric-value">${stats.labDoneCount + stats.flashcardDoneCount}</span>
            <span class="metric-label">${t("dashboard.metric.deliverables")}</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon metric-icon--amber">${icon("pomodoro")}</div>
          <div class="metric-info">
            <span class="metric-value">${totalFocusHours.toFixed(1)}h</span>
            <span class="metric-label">${t("dashboard.metric.focusHours")}</span>
          </div>
        </div>
      </section>

      <div class="card" id="dash-progress"></div>

      <div class="card" id="dash-next-focus"></div>

      <section class="section-heading">
        <h2 class="section-heading-title">${icon("layers")} ${t("dashboard.chapterProgress.title", { count: stats.chapterProgresses.filter((c) => !c.chapter.tbd).length })}</h2>
      </section>
      <div class="chapter-progress-list">
        ${stats.chapterProgresses
          .filter((c) => !c.chapter.tbd)
          .map((cp) =>
            surfaceCardHtml({
              className: "chapter-progress-row",
              accent: cp.statusColor,
              iconHtml: `<span class="chapter-number-badge">${escapeHtml(String(cp.chapter.num))}</span>`,
              headerHtml: `
                <span class="chapter-progress-title">${escapeHtml(cp.chapter.title)}</span>
                <span class="status-badge status-badge--dynamic" style="--status-color: ${cp.statusColor};">${t(`status.${cp.status}`)}</span>
                <span class="chapter-progress-pct" style="--status-color: ${cp.statusColor};">${cp.percentage}%</span>
              `,
              bodyHtml: `
                <div class="progress-bar-track progress-bar-track--sm">
                  <div class="progress-bar-fill progress-bar-fill--dynamic" style="--progress: ${cp.percentage}%; --status-color: ${cp.statusColor};"></div>
                </div>
                <p class="chapter-progress-meta">${cp.completedCount}/${cp.total} ${t("chapters.meta.sections")} · ~${cp.estMinutes} ${t("chapters.meta.estMinutes")}</p>
              `,
            }),
          )
          .join("")}
      </div>
    `;

    this.renderProgressCard(stats);
    this.renderNextFocusCard(stats, state);
  }

  private renderProgressCard(stats: ReturnType<typeof calculateProgress>): void {
    const progressEl = this.querySelector("#dash-progress");
    if (!progressEl) return;
    progressEl.innerHTML = `
      <div class="progress-header">
        <div>
          <div class="progress-title">${t("dashboard.progress.title")}</div>
          <div class="metric-subtitle">${t("dashboard.progress.subtitle")}</div>
        </div>
        <div class="progress-percentage">${Math.round(stats.overallPct)}%</div>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill progress-bar-fill--dynamic" style="--progress: ${stats.overallPct}%;"></div>
      </div>
    `;
  }

  private renderNextFocusCard(stats: ReturnType<typeof calculateProgress>, state: ReturnType<typeof getState>): void {
    const nextFocusEl = this.querySelector("#dash-next-focus");
    if (!nextFocusEl) return;

    if (stats.activeChapter && stats.nextSection) {
      nextFocusEl.className = "card card--accent-primary";
      nextFocusEl.innerHTML = `
        <div class="progress-card-tag">${icon("rocket")} ${t("dashboard.nextFocus.tag")}</div>
        <p class="next-chapter-title">${t("common.chapter")} ${escapeHtml(String(stats.activeChapter.num))} — ${escapeHtml(stats.activeChapter.title)}</p>
        <p class="next-section-label">${t("dashboard.nextSection.next")}</p>
        <p class="next-section-title">${escapeHtml(stats.nextSection.num)} ${escapeHtml(stats.nextSection.title)}</p>
        <button type="button" class="btn btn-primary" data-section-id="${escapeHtml(stats.nextSection.id)}">
          ${icon("check")} ${t("dashboard.nextSection.markRead")}
        </button>
      `;
      nextFocusEl.querySelector("[data-section-id]")?.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.sectionId!;
        toggleRead(id);
        renderAll();
      });
      return;
    }

    if (stats.activeChapter) {
      const pendingSection = stats.activeChapter.sections.find((s) => !state.handsOn[s.id]) ?? null;
      nextFocusEl.className = "card card--accent-primary";
      nextFocusEl.innerHTML = `
        <div class="progress-card-tag">${icon("rocket")} ${t("dashboard.nextFocus.tag")}</div>
        <p class="next-chapter-title">${t("common.chapter")} ${escapeHtml(String(stats.activeChapter.num))} — ${escapeHtml(stats.activeChapter.title)}</p>
        <p class="next-section-label">${t("dashboard.nextSection.handsonNext")}</p>
        ${
          pendingSection
            ? `
              <p class="next-section-title">${escapeHtml(pendingSection.num)} ${escapeHtml(pendingSection.title)}</p>
              <button type="button" class="btn btn-primary" data-handson-id="${escapeHtml(pendingSection.id)}">
                ${icon("check")} ${t("dashboard.nextSection.markHandson")}
              </button>
            `
            : ""
        }
      `;
      nextFocusEl.querySelector("[data-handson-id]")?.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.handsonId!;
        toggleHandsOn(id);
        renderAll();
      });
      return;
    }

    nextFocusEl.className = "card card--accent-emerald";
    nextFocusEl.innerHTML = `
      <div class="progress-card-header-title--emerald">${icon("checkCircle")} ${t("dashboard.nextSection.allDone")}</div>
    `;
  }

}

customElements.define("book-view-dashboard", BookViewDashboard);
