export interface LabMeta {
  id: string;
  chapterId: string;
  apisUsed: string[];
  tbd: boolean;
}

export const LAB_META: LabMeta[] = [
  { id: "lab-ch-1", chapterId: "ch-1", apisUsed: [], tbd: false },
  { id: "lab-ch-2", chapterId: "ch-2", apisUsed: ["api-web-app-manifest", "api-service-worker", "api-cache-storage"], tbd: false },
  { id: "lab-ch-3", chapterId: "ch-3", apisUsed: ["api-dialog-element", "api-aria", "api-details-summary"], tbd: false },
  { id: "lab-ch-4", chapterId: "ch-4", apisUsed: ["api-cascade-layers", "api-container-queries", "api-scroll-driven-animations"], tbd: false },
  { id: "lab-ch-5", chapterId: "ch-5", apisUsed: ["api-optional-chaining", "api-error-cause"], tbd: false },
  { id: "lab-ch-6", chapterId: "ch-6", apisUsed: ["api-dataset"], tbd: false },
  { id: "lab-ch-7", chapterId: "ch-7", apisUsed: ["api-custom-elements", "api-shadow-dom", "api-observed-attributes", "api-custom-events"], tbd: false },
  { id: "lab-ch-8", chapterId: "ch-8", apisUsed: ["api-template-element", "api-slots", "api-slotchange", "api-slotted-pseudo"], tbd: false },
  { id: "lab-ch-9", chapterId: "ch-9", apisUsed: ["api-element-internals", "api-form-associated", "api-custom-state-set"], tbd: false },
  { id: "lab-ch-10", chapterId: "ch-10", apisUsed: ["api-urlpattern", "api-navigation-api"], tbd: false },
  { id: "lab-ch-11", chapterId: "ch-11", apisUsed: ["api-navigation-api", "api-urlpattern", "api-view-transitions-api", "api-history-api"], tbd: false },
  { id: "lab-ch-12", chapterId: "ch-12", apisUsed: ["api-indexeddb", "api-cache-storage", "api-fetch", "api-abort-controller"], tbd: false },
  { id: "lab-ch-13", chapterId: "ch-13", apisUsed: ["api-proxy", "api-queuemicrotask", "api-eventtarget"], tbd: false },
  { id: "lab-ch-14", chapterId: "ch-14", apisUsed: [], tbd: true },
  { id: "lab-ch-15", chapterId: "ch-15", apisUsed: [], tbd: true },
];
