import "./views/index";
import { getState, setThemeState, setLangState } from "./state/storage";
import { initRouter } from "./router";
import { renderAll, registerRenderListener } from "./renderer";
import { applyStaticTranslations } from "./i18n/dom";
import { t } from "./i18n";
import { icon } from "./utils/icons";
import { exportStateJSON, importState } from "./actions/backup";
import { resetProgress } from "./state/storage";
import { showToast } from "./toast";
import { calculateProgress } from "./progress";

function updateNavBadge(): void {
  const badge = document.getElementById("badge-overall-pct");
  if (badge) badge.textContent = `${Math.round(calculateProgress().overallPct)}%`;
}

function renderHeaderIcons(): void {
  const state = getState();
  const themeIcon = document.getElementById("btn-theme-icon");
  if (themeIcon) themeIcon.innerHTML = icon(state.theme === "dark" ? "sun" : "moon");

  const langLabel = document.getElementById("btn-lang-label");
  if (langLabel) langLabel.textContent = t("header.lang");
}

function renderNavTabIcons(): void {
  const iconByTab: Partial<Record<string, string>> = {
    chapters: icon("book"),
    labs: icon("cards"),
    glossary: icon("glossary"),
  };
  document.querySelectorAll<HTMLElement>("[data-nav-tab]").forEach((tab) => {
    const tabIcon = iconByTab[tab.dataset.navTab ?? ""];
    if (!tabIcon) return;
    const iconSpan = document.createElement("span");
    iconSpan.className = "nav-tab-icon";
    iconSpan.innerHTML = tabIcon;
    tab.prepend(iconSpan);
  });
}

function bootstrap(): void {
  const state = getState();
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.lang = state.lang;

  applyStaticTranslations();
  renderHeaderIcons();
  renderNavTabIcons();

  const exportBtn = document.getElementById("btn-export");
  if (exportBtn) exportBtn.innerHTML = icon("export");
  const importBtn = document.getElementById("btn-import");
  if (importBtn) importBtn.innerHTML = icon("import");
  const resetBtn = document.getElementById("btn-reset");
  if (resetBtn) resetBtn.innerHTML = icon("reset");

  document.getElementById("btn-theme")?.addEventListener("click", () => {
    const next = getState().theme === "dark" ? "light" : "dark";
    setThemeState(next);
    renderHeaderIcons();
    renderAll();
  });

  document.getElementById("btn-lang")?.addEventListener("click", () => {
    const next = getState().lang === "vi" ? "en" : "vi";
    setLangState(next);
    applyStaticTranslations();
    renderHeaderIcons();
    renderAll();
  });

  document.getElementById("btn-export")?.addEventListener("click", () => {
    exportStateJSON();
  });

  const importInput = document.getElementById("input-import") as HTMLInputElement | null;
  document.getElementById("btn-import")?.addEventListener("click", () => importInput?.click());
  importInput?.addEventListener("change", () => {
    const file = importInput.files?.[0];
    if (file) importState(file);
    importInput.value = "";
  });

  document.getElementById("btn-reset")?.addEventListener("click", () => {
    if (window.confirm(t("confirm.reset"))) {
      resetProgress();
      document.documentElement.setAttribute("data-theme", getState().theme);
      renderHeaderIcons();
      renderAll();
      showToast(t("toast.reset.success"), "success");
    }
  });

  registerRenderListener(updateNavBadge);
  updateNavBadge();

  initRouter();
}

bootstrap();
