import { ROUTE_IDS, LEGACY_ROUTE_ALIASES } from "./constants";
import type { RouteId } from "./types/appState";
import { setActiveTabState, getState } from "./state/storage";
import { renderAll } from "./renderer";

function parseRoute(): RouteId {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const hash = (LEGACY_ROUTE_ALIASES[raw] ?? raw) as RouteId;
  return ROUTE_IDS.includes(hash) ? hash : "dashboard";
}

function applyRoute(route: RouteId): void {
  setActiveTabState(route);

  document.querySelectorAll<HTMLElement>("[data-view]").forEach((view) => {
    view.hidden = view.dataset.view !== route;
  });

  document.querySelectorAll<HTMLElement>("[data-nav-tab]").forEach((tab) => {
    const isActive = tab.dataset.navTab === route;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-current", isActive ? "page" : "false");
  });

  renderAll();
}

function navigateTo(route: RouteId): void {
  if (window.location.hash !== `#/${route}`) {
    window.location.hash = `#/${route}`;
  } else {
    applyRoute(route);
  }
}

export function initRouter(): void {
  window.addEventListener("hashchange", () => applyRoute(parseRoute()));

  document.querySelectorAll<HTMLElement>("[data-nav-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const route = tab.dataset.navTab as RouteId;
      navigateTo(route);
    });
  });

  const initial = window.location.hash ? parseRoute() : getState().activeTab;
  window.location.hash = `#/${initial}`;
  applyRoute(initial);
}
