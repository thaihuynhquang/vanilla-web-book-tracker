export interface ChapterMeta {
  id: string;
  num: number;
  title: string;
  tbd: boolean;
  labId: string;
  flashcardId: string;
  glossaryRefs: string[];
}

export const CHAPTER_META: ChapterMeta[] = [
  { id: "ch-1", num: 1, title: "Hello Vanilla Web", tbd: false, labId: "lab-ch-1", flashcardId: "fc-ch-1", glossaryRefs: [] },
  { id: "ch-2", num: 2, title: "Understanding the web platform", tbd: false, labId: "lab-ch-2", flashcardId: "fc-ch-2", glossaryRefs: ["api-service-worker", "api-web-app-install", "api-storage-manager", "api-intl", "api-web-share", "api-built-in-ai"] },
  { id: "ch-3", num: 3, title: "The user interface", tbd: false, labId: "lab-ch-3", flashcardId: "fc-ch-3", glossaryRefs: ["api-web-app-manifest", "api-dialog-element", "api-details-summary", "api-popover", "api-aria", "api-canvas"] },
  { id: "ch-4", num: 4, title: "Vanilla CSS", tbd: false, labId: "lab-ch-4", flashcardId: "fc-ch-4", glossaryRefs: ["api-cascade-layers", "api-css-custom-properties", "api-container-queries", "api-has-selector", "api-css-nesting", "api-view-transitions-css", "api-scroll-driven-animations"] },
  { id: "ch-5", num: 5, title: "Vanilla JavaScript", tbd: false, labId: "lab-ch-5", flashcardId: "fc-ch-5", glossaryRefs: ["api-import-maps", "api-top-level-await", "api-optional-chaining", "api-logical-assignment", "api-set", "api-map", "api-weakmap", "api-error-cause"] },
  { id: "ch-6", num: 6, title: "The document object model API", tbd: false, labId: "lab-ch-6", flashcardId: "fc-ch-6", glossaryRefs: ["api-dataset", "api-resize-observer", "api-intersection-observer", "api-mutation-observer"] },
  { id: "ch-7", num: 7, title: "Web components", tbd: false, labId: "lab-ch-7", flashcardId: "fc-ch-7", glossaryRefs: ["api-custom-elements", "api-shadow-dom", "api-observed-attributes", "api-custom-events"] },
  { id: "ch-8", num: 8, title: "Working with templates and slots", tbd: false, labId: "lab-ch-8", flashcardId: "fc-ch-8", glossaryRefs: ["api-template-element", "api-slots", "api-slotchange", "api-slotted-pseudo"] },
  { id: "ch-9", num: 9, title: "Advanced web components", tbd: false, labId: "lab-ch-9", flashcardId: "fc-ch-9", glossaryRefs: ["api-element-internals", "api-form-associated", "api-custom-state-set", "api-declarative-shadow-dom", "api-defined-pseudo"] },
  { id: "ch-10", num: 10, title: "Navigation", tbd: false, labId: "lab-ch-10", flashcardId: "fc-ch-10", glossaryRefs: ["api-navigation-api", "api-urlpattern", "api-view-transitions-api", "api-history-api"] },
  { id: "ch-11", num: 11, title: "Building a router", tbd: false, labId: "lab-ch-11", flashcardId: "fc-ch-11", glossaryRefs: ["api-navigation-api", "api-urlpattern", "api-view-transitions-api", "api-history-api", "api-view-transitions-css"] },
  { id: "ch-12", num: 12, title: "Working with data", tbd: false, labId: "lab-ch-12", flashcardId: "fc-ch-12", glossaryRefs: ["api-fetch", "api-abort-controller", "api-websocket", "api-web-storage", "api-indexeddb", "api-cache-storage", "api-file-system-access", "api-streams"] },
  { id: "ch-13", num: 13, title: "Data binding and reactivity", tbd: false, labId: "lab-ch-13", flashcardId: "fc-ch-13", glossaryRefs: ["api-proxy", "api-queuemicrotask", "api-eventtarget", "api-signals-proposal"] },
  { id: "ch-14", num: 14, title: "Beyond basics", tbd: true, labId: "lab-ch-14", flashcardId: "fc-ch-14", glossaryRefs: [] },
  { id: "ch-15", num: 15, title: "Building an app", tbd: true, labId: "lab-ch-15", flashcardId: "fc-ch-15", glossaryRefs: [] },
];
