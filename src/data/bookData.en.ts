import type { Chapter, Lab, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { LAB_META } from "./shared/labMeta";
import { GLOSSARY_EN } from "./glossary/en";
import { LAB_CONTENT_EN } from "./labs/en";
import { QUIT_CRITERIA_EN } from "./quitCriteria/en";
import { RESOURCES } from "./shared/resources";
import { FLASHCARD_TASKS } from "./shared/flashcards";

const CHAPTER_SUMMARIES_EN: Record<number, string> = {
  1: "Introduces what \"Vanilla Web\" is and isn't — not a return to the jQuery era, but using the modern web platform directly instead of reaching for React/Vue on every project. Read this to understand why the book exists before learning how.",
  2: "The big picture of the web platform — rendering engines, network protocols, security, application architecture, and why Vanilla Web gets better performance/accessibility/distribution than a heavy framework stack. Includes PWA basics (installability, offline, storage, i18n, Capabilities API, client-side AI).",
  3: "Building UI the platform-correct way — metadata (manifest, theme-color, viewport), semantic HTML (avoiding \"divitis\"), full accessibility (landmarks, forms, keyboard, ARIA, contrast, screen readers), then the browser's built-in UI controls (details, dialog, popover, CSS-only carousels).",
  4: "Modern CSS that replaces Sass/PostCSS/CSS-in-JS: @layer to avoid specificity wars, custom properties, container queries, nested selectors, new pseudo-selectors (:has()...), Flexbox/Grid layout, and animation (transitions, keyframes, page transitions, scroll-driven animation).",
  5: "Modern JS needs no Babel/TypeScript transpile for most use cases: full ESM (import maps, top-level await, lazy loading, JSON modules), new syntax (optional chaining, logical assignment, private fields, error cause), collections (Set/Map/WeakMap), pure functional programming, and disciplined error handling.",
  6: "A \"clean\" DOM API — querying, tree traversal, creating/modifying elements, property vs. attribute, dataset, styles, events — the direct foundation for Web Components in chapter 7.",
  7: "The heart of the book. Custom Elements API, Shadow DOM, component parameterization (attribute vs. property, boolean attributes, observed attributes), events, and connecting CSS between the page DOM and shadow DOM via custom properties. Ends with a full <star-rating> component build.",
  8: "<template> for efficient content cloning, templates inside web components (inline, external HTML, external CSS), rendering dynamic data, and the whole Slots API (fallback content, flattened tree, ::slotted(), slotchange, nested slots) — ending with a hands-on Tab Component example.",
  9: "Advanced topics — ElementInternals (form participation, validation, custom form controls), the full lifecycle (adoptedCallback, form-associated lifecycle, cleanup), advanced accessibility, Custom State Set (:state()), Declarative Shadow DOM (SSR-friendly), testing web components, and integration/deployment.",
  10: "Routing theory on the web before writing a router — friendly URLs, route shape, the Navigation API (event.signal, form submission interception, observing completion), and route matching with URLPattern.",
  11: "Writing a real vanilla router — outlet/master page, title/metadata, focus/scroll restoration, route guards, View Transitions API for smooth route changes (including cross-document), then building the router twice (function-based, then class-based) plus a web-component-based router.",
  12: "Modern HTTP (fetch, AbortController, streaming responses, upload/download progress), WebSocket, remote data caching strategies, and the full browser storage stack (Web Storage, IndexedDB, Cache Storage, File System Access/OPFS) with quotas and debugging.",
  13: "Rebuilding a framework's \"reactivity\" without a framework — direct DOM binding, derived bindings, rendering via queueMicrotask(), binding through data-*/template strings/<template>, EventTarget as a store, Proxy, and extending with a tiny signals library.",
  14: "Manning hasn't published a section outline for this chapter yet (early access). No section is tracked here until book_data_model_guide.md is updated.",
  15: "Expected to be the capstone chapter — assembling the techniques from chapters 1–14 into one complete vanilla app. No detailed outline yet.",
};

export function getChaptersEn(): Chapter[] {
  return CHAPTER_META.map((meta) => ({
    id: meta.id,
    num: meta.num,
    title: meta.title,
    summary: CHAPTER_SUMMARIES_EN[meta.num],
    tbd: meta.tbd,
    sections: SECTIONS_BY_CHAPTER[meta.num],
    labId: meta.labId,
    flashcardId: meta.flashcardId,
    glossaryRefs: meta.glossaryRefs,
  }));
}

export function getLabsEn(): Lab[] {
  return LAB_META.map((meta) => {
    const content = LAB_CONTENT_EN[meta.id];
    return {
      id: meta.id,
      chapterId: meta.chapterId,
      title: content.title,
      goal: content.goal,
      requirements: content.requirements,
      acceptanceCriteria: content.acceptanceCriteria,
      apisUsed: meta.apisUsed,
      tbd: meta.tbd,
    };
  });
}

export function getQuitCriteriaEn(): QuitCriteriaRow[] {
  return CHAPTER_META.map((meta) => ({
    id: `qc-${meta.id}`,
    chapterId: meta.id,
    stopSignal: QUIT_CRITERIA_EN[meta.id].stopSignal,
    exitCriteria: QUIT_CRITERIA_EN[meta.id].exitCriteria,
  }));
}

export function getGlossaryEn(): GlossaryTerm[] {
  return GLOSSARY_EN;
}

export function getResourcesEn(): Resource[] {
  return RESOURCES;
}

export function getFlashcardTasksEn(): FlashcardTask[] {
  return FLASHCARD_TASKS;
}
