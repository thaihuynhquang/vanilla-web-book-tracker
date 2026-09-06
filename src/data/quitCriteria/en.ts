import type { QuitCriteriaText } from "../../types/appState";

export const QUIT_CRITERIA_EN: Record<string, QuitCriteriaText> = {
  "ch-1": {
    stopSignal: "If you already grasp \"vanilla vs. framework\" after 15 minutes, stop reading in detail — there's nothing to code along with in this chapter.",
    exitCriteria: "You can explain in your own words when to pick vanilla and when to pick a framework.",
  },
  "ch-2": {
    stopSignal: "If you already know rendering engines/HTTP/PWA basics, skim 2.1–2.3 and read only 2.4 (Modern web apps) carefully.",
    exitCriteria: "You can name 5 PWA capabilities (installability, offline, storage, i18n, capabilities) from memory.",
  },
  "ch-3": {
    stopSignal: "If Lighthouse a11y is already 100 and you're still reading 3.7–3.8 out of fear of missing something, stop — the chapter goal is met.",
    exitCriteria: "Lab 3 reaches Lighthouse Accessibility = 100.",
  },
  "ch-4": {
    stopSignal: "If you already use @layer/container queries fluently at work, skim 4.1 and focus on 4.3 (the newest material for most readers).",
    exitCriteria: "Lab 4's container query changes columns with no media query.",
  },
  "ch-5": {
    stopSignal: "If you're stuck on 5.5 (ESM) for over 2 hours, skip the advanced Import Maps material (5.5.8–5.5.10) and return once chapter 7+ gives you real examples.",
    exitCriteria: "Lab 5 runs directly in the browser, no Babel/tsc needed.",
  },
  "ch-6": {
    stopSignal: "If plain DOM manipulation is already second nature, skim 6.2 and read closely only the parts you don't know (dataset, ResizeObserver).",
    exitCriteria: "Lab 6 uses no innerHTML anywhere.",
  },
  "ch-7": {
    stopSignal: "If Lab 7 (<star-rating>) takes over 4 hours and the first 2 acceptance criteria aren't done, drop the CSS theming criterion (--star-color), mark the lab done at the minimum, and move to chapter 8.",
    exitCriteria: "The component updates its UI when value is set via JS or via attribute (both don't need to be perfect to count as \"enough\").",
  },
  "ch-8": {
    stopSignal: "If slotchange causes too much confusion, drop the \"add a dynamic tab via JS\" requirement in Lab 8 and build static slots only.",
    exitCriteria: "The tab component correctly displays slotted content for at least 2 static tabs.",
  },
  "ch-9": {
    stopSignal: "If ElementInternals/Declarative Shadow DOM (9.1, 9.6) are too hard, skim the theory and focus on coding Lab 9 (form-associated) — the most practical part of the chapter.",
    exitCriteria: "<toggle-switch> is recognized in form.elements, even if :state() isn't perfect yet.",
  },
  "ch-10": {
    stopSignal: "If the route-shape theory (10.1) feels too abstract, jump straight to Lab 10 (code first, theory sinks in gradually).",
    exitCriteria: "Lab 10: matchRoute() returns correct params for at least 4 of 6 test URLs.",
  },
  "ch-11": {
    stopSignal: "If Lab 11 takes over 2x the estimated time, drop View Transitions and keep only basic navigation + outlet.",
    exitCriteria: "The router correctly navigates 3 routes and Back/Forward work — animation is a \"nice to have\".",
  },
  "ch-12": {
    stopSignal: "If IndexedDB (12.4.5) feels too cumbersome, temporarily use localStorage for Lab 12 and note \"revisit IndexedDB later\".",
    exitCriteria: "The CRUD storage layer works with any storage API (it doesn't have to be IndexedDB to count as done).",
  },
  "ch-13": {
    stopSignal: "If Proxy is confusing, study 13.2.8 in isolation before wiring it into Lab 13, rather than trying to grasp the whole chapter at once.",
    exitCriteria: "Lab 13: changing 5 fields consecutively triggers only 1 render.",
  },
  "ch-14": {
    stopSignal: "Not yet published — no specific stop criterion applies, just watch for the Manning release.",
    exitCriteria: "Not yet defined — update once a detailed outline exists.",
  },
  "ch-15": {
    stopSignal: "Not yet published — no specific stop criterion applies.",
    exitCriteria: "Not yet defined — update once a detailed outline exists.",
  },
};
