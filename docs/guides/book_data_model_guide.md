# BOOK DATA MODEL GUIDE

This document is the **data contract** for the Vanilla Web Book Tracker. Every other guide and content file in this repo (`chapters.md`, `labs.md`, `glossary.md`, `resources.md`, `quit_criteria_guide.md`, and the app itself once built) reads ids from this document. Read this file first.

> [!IMPORTANT]
> This document is generated from `vanillia_web_TOC.html` (Manning, *Vanilla Web*, https://www.manning.com/books/vanilla-web). Chapters 1–13 have published section (`x.y`) and sub-section (`x.y.z`) tables of contents. **Chapters 14 ("Beyond basics") and 15 ("Building an app") have no sub-tables published yet** — they are early-access/in-progress chapters. Do not invent structure for them; track them as `tbd: true` with zero sections until Manning publishes the detail and this file is updated.

---

## 1. Source of truth files

Following the pattern of `planData.vi.ts` / `planData.en.ts` / `planData.ts` in the original roadmap tracker:

- `src/data/bookData.vi.ts` — Vietnamese content bundle.
- `src/data/bookData.en.ts` — English content bundle, **identical id set and shape** as the Vietnamese file.
- `src/data/bookData.ts` — thin facade, picks a bundle by `state.lang` and exposes `getChapters()`, `getMetaData()`, `getLabs()`, `getGlossary()`, `getResources()`, `getQuitCriteriaData()`.

**Never rename or reassign an existing id.** Ids are the primary key for completion state persisted in `localStorage`. A dev-only check in `bookData.ts` (mirroring the original repo's check) must log a `console.error` if the id sets of the two language files ever diverge.

## 2. TypeScript interfaces

```typescript
export interface SubSection {
  num: string;   // "7.6.1" — display-only, never a checkbox
  title: string;
}

export interface Section {
  id: string;          // "ch-7-s6" — stable primary key
  num: string;          // "7.6" — display label, matches the book's TOC
  title: string;
  subsections: SubSection[]; // display-only list, no state, no checkbox
  estMinutes: number;   // reading time estimate, used for schedule-free time stats only
}

export interface Chapter {
  id: string;           // "ch-7"
  num: number;          // 7
  title: string;
  summary: string;      // 1-3 sentences: what you learn / when it matters
  tbd: boolean;         // true only for chapters with no published section TOC (14, 15)
  sections: Section[];  // empty array when tbd === true
  labId: string;        // "lab-ch-7", always present even when tbd (lab content may say "TBD")
  flashcardId: string;  // "fc-ch-7"
  glossaryRefs: string[]; // glossary term ids introduced or central to this chapter
}

export interface Lab {
  id: string;           // "lab-ch-7"
  chapterId: string;    // "ch-7"
  title: string;
  goal: string;
  requirements: string[];
  acceptanceCriteria: string[];
  apisUsed: string[];   // glossary term ids
  tbd: boolean;
}

export interface FlashcardTask {
  id: string;           // "fc-ch-7"
  chapterId: string;
}

export interface GlossaryTerm {
  id: string;           // "api-custom-elements"
  name: string;
  chapterIds: string[]; // chapters where this API is central
  descriptionVi: string;
  mdnUrl: string;
  specUrl?: string;
}

export interface Resource {
  id: string;           // "res-ch-7-1"
  chapterId: string;
  title: string;
  url: string;
  type: "mdn" | "spec" | "article" | "video" | "demo" | "tool";
}

export interface QuitCriteriaRow {
  id: string;           // "qc-ch-7"
  chapterId: string;
  stopSignal: string;   // when to stop/skip this chapter
  exitCriteria: string; // when you're "good enough" to move on without finishing every page
}
```

## 3. State keys written to `localStorage` (`AppState`)

Mirrors `src/state/storage.ts` shape in the original repo, adapted for 2 tracked actions per section and 2 per chapter:

```typescript
interface AppState {
  read: Record<string, boolean>;      // key = section.id  -> "ch-7-s6"
  handsOn: Record<string, boolean>;   // key = section.id  -> "ch-7-s6"
  labDone: Record<string, boolean>;   // key = chapter.labId       -> "lab-ch-7"
  flashcardDone: Record<string, boolean>; // key = chapter.flashcardId -> "fc-ch-7"
  resourceFlags: Record<string, boolean>; // bookmarks, key = resource.id
  activeTab: RouteId;
  theme: "dark" | "light";
  lang: "vi" | "en";
  pomodoroSettings: { workMinutes: number; breakMinutes: number };
  pomodoroSessions: Array<{ completedAt: string; durationMinutes: number }>;
}
```

`read[sectionId]` and `handsOn[sectionId]` are two independent booleans — a section can be read but not hands-on'd, or (rarely) hands-on'd via a code sample copy-paste without a careful read; the UI does not forbid either combination.

## 4. Id conventions (do not deviate)

| Entity | Pattern | Example |
| :--- | :--- | :--- |
| Chapter | `ch-{num}` | `ch-7` |
| Section | `ch-{num}-s{sectionNum}` | `ch-7-s6` (= book section 7.6) |
| Section read state key | same as section id, namespaced by the `read` map | `read["ch-7-s6"]` |
| Section hands-on state key | same as section id, namespaced by the `handsOn` map | `handsOn["ch-7-s6"]` |
| Sub-section | **no id** — plain `{num, title}` display data | `7.6.1 Creation` |
| Chapter lab | `lab-ch-{num}` | `lab-ch-7` |
| Chapter flashcard task | `fc-ch-{num}` | `fc-ch-7` |
| Glossary term | `api-{kebab-case-name}` | `api-custom-elements` |
| Resource | `res-ch-{num}-{index}` | `res-ch-7-1` |
| Quit-criteria row | `qc-ch-{num}` | `qc-ch-7` |

Section numbering in the id uses the section's position within its chapter (`s1`, `s2`, …), not the literal decimal — e.g. section 7.13 is `ch-7-s13`. This keeps ids stable even if a future Manning revision renumbers minor sections, as long as the position and title stay recognizable; if a section is inserted or removed, treat it as **adding/removing an id**, never renumbering existing ones out from under recorded progress.

## 5. Full chapter → section id map

Progress is tracked at the section (`x.y`) level. Sub-sections (`x.y.z`) are listed for reading guidance only. Chapters 1–13 total **95 tracked sections**; chapters 14–15 are `tbd`.

### Chapter 1 — `ch-1` — "Hello Vanilla Web"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-1-s1 | 1.1 | What Vanilla Web is not | — |
| ch-1-s2 | 1.2 | What Vanilla Web is | — |
| ch-1-s3 | 1.3 | How it works | — |
| ch-1-s4 | 1.4 | Remembering our goals | — |
| ch-1-s5 | 1.5 | Using Vanilla Web | 1.5.1 Mixing Vanilla with libraries |
| ch-1-s6 | 1.6 | Enhancing your skills | — |
| ch-1-s7 | 1.7 | Characteristics | — |
| ch-1-s8 | 1.8 | Challenges | — |
| ch-1-s9 | 1.9 | Summary | — |

### Chapter 2 — `ch-2` — "Understanding the web platform"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-2-s1 | 2.1 | Building blocks | 2.1.1 Rendering engines; 2.1.2 Network protocols; 2.1.3 Web security; 2.1.4 Application architecture; 2.1.5 HTML, CSS, and JavaScript |
| ch-2-s2 | 2.2 | Design Patterns | 2.2.1 Web APIs |
| ch-2-s3 | 2.3 | The power of Vanilla Web | 2.3.1 Web performance; 2.3.2 Accessibility; 2.3.3 Distribution; 2.3.4 Discardability |
| ch-2-s4 | 2.4 | Modern web apps | 2.4.1 Installability; 2.4.2 Offline support; 2.4.3 Data Storage; 2.4.4 Internationalization; 2.4.5 Capabilities API; 2.4.6 Client-side AI |
| ch-2-s5 | 2.5 | Developer experience | 2.5.1 Simple and more secure organization; 2.5.2 Interoperability with libraries and frameworks; 2.5.3 Cost reduction; 2.5.4 Reduced Complexity Tax; 2.5.5 Deploying the apps |
| ch-2-s6 | 2.6 | Summary | — |

### Chapter 3 — `ch-3` — "The user interface"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-3-s1 | 3.1 | Defining our user interface | — |
| ch-3-s2 | 3.2 | The ultimate responsive design | — |
| ch-3-s3 | 3.3 | Web metadata | 3.3.1 Title; 3.3.2 Web app manifest; 3.3.3 Icons; 3.3.4 Theme color; 3.3.5 Viewport definition; 3.3.6 Semantic metadata; 3.3.7 Putting the metadata together |
| ch-3-s4 | 3.4 | Semantic HTML | 3.4.1 Using the Right Element; 3.4.2 Avoiding divitis and other problems; 3.4.3 Semantic attributes |
| ch-3-s5 | 3.5 | Accessibility | 3.5.1 Landmarks; 3.5.2 Forms; 3.5.3 Keyboard Navigation; 3.5.4 ARIA Roles; 3.5.5 ARIA states and properties; 3.5.6 Color and contrast; 3.5.7 Interactive elements; 3.5.8 Screen readers |
| ch-3-s6 | 3.6 | Media resources | 3.6.1 Image formats; 3.6.2 Video formats; 3.6.3 AR formats |
| ch-3-s7 | 3.7 | Rich web UI controls | 3.7.1 Summaries; 3.7.2 Accordions; 3.7.3 Modal dialogs; 3.7.4 Carousels; 3.7.5 Popovers; 3.7.6 Rich selectors; 3.7.7 Other UI controls |
| ch-3-s8 | 3.8 | Beyond basic UI | 3.8.1 Using canvas; 3.8.2 Using UI-related APIs |
| ch-3-s9 | 3.9 | Summary | — |

### Chapter 4 — `ch-4` — "Vanilla CSS"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-4-s1 | 4.1 | Maintainable and modular CSS | 4.1.1 Cascade Layers; 4.1.2 Custom properties (variables); 4.1.3 Container queries and units; 4.1.4 Nested selectors; 4.1.5 New pseudo-selectors; 4.1.6 Modern CSS units |
| ch-4-s2 | 4.2 | Modern Layout | 4.2.1 1D layout with Flexbox; 4.2.2 2D layout with grids |
| ch-4-s3 | 4.3 | Animations | 4.3.1 Transitions; 4.3.2 Keyframe animations; 4.3.3 Page transitions; 4.3.4 Scroll-driven animations |
| ch-4-s4 | 4.4 | Summary | — |

### Chapter 5 — `ch-5` — "Vanilla JavaScript"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-5-s1 | 5.1 | Versioning | — |
| ch-5-s2 | 5.2 | Latest additions to the language | 5.2.1 ESNext |
| ch-5-s3 | 5.3 | Using a transpiler | — |
| ch-5-s4 | 5.4 | Using polyfills | — |
| ch-5-s5 | 5.5 | ECMAScript Modules | 5.5.1 Named exports; 5.5.2 Importing modules; 5.5.3 Import Maps; 5.5.4 Top-level await; 5.5.5 Preloading and execution order; 5.5.6 Lazy loading; 5.5.7 Error handling and timeouts for dynamic imports; 5.5.8 Import attributes and JSON modules; 5.5.9 Re-exports and module organization; 5.5.10 Caching, single evaluation, and side effects; 5.5.11 Practical rules of thumb |
| ch-5-s6 | 5.6 | Modern JavaScript Essentials | 5.6.1 Optional chaining and nullish coalescing; 5.6.2 Logical assignment operators; 5.6.3 Destructuring + rest/spread in practice; 5.6.4 Classes with public & private fields; 5.6.5 Cleaner errors: optional catch binding and error cause; 5.6.6 Small quality-of-life wins |
| ch-5-s7 | 5.7 | Collection Management | 5.7.1 Arrays; 5.7.2 Sets; 5.7.3 Maps; 5.7.4 Weak collections: memory-friendly |
| ch-5-s8 | 5.8 | Functional Programming | 5.8.1 Array transformations; 5.8.2 Pure functions and immutability; 5.8.3 Function composition; 5.8.4 Everyday benefits |
| ch-5-s9 | 5.9 | Error Management | 5.9.1 Exceptions and try/catch; 5.9.2 Error objects; 5.9.3 Asynchronous errors; 5.9.4 Global handlers; 5.9.5 Practical guidance for error management |
| ch-5-s10 | 5.10 | Summary | — |

### Chapter 6 — `ch-6` — "The document object model API"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-6-s1 | 6.1 | The DOM tree | — |
| ch-6-s2 | 6.2 | The API | 6.2.1 HTMLElement interface; 6.2.2 Global DOM objects; 6.2.3 Working with different documents; 6.2.4 Querying the document; 6.2.5 Browsing the tree; 6.2.6 Elements available; 6.2.7 Modifying elements; 6.2.8 Properties vs. attributes; 6.2.9 Creating elements; 6.2.10 Element arrangement; 6.2.11 Custom properties with dataset; 6.2.12 Working with styles; 6.2.13 Working with events |
| ch-6-s3 | 6.3 | Browser Web APIs | — |
| ch-6-s4 | 6.4 | Summary | — |

### Chapter 7 — `ch-7` — "Web components"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-7-s1 | 7.1 | The component design pattern | — |
| ch-7-s2 | 7.2 | Use cases | — |
| ch-7-s3 | 7.3 | Advantages | — |
| ch-7-s4 | 7.4 | Challenges | — |
| ch-7-s5 | 7.5 | Vanilla web components | 7.5.1 Architecture; 7.5.2 The puzzle; 7.5.3 Abilities |
| ch-7-s6 | 7.6 | Custom Elements API | 7.6.1 Creation; 7.6.2 Rendering content; 7.6.3 Registration; 7.6.4 Simplifying the syntax; 7.6.5 The Custom Element Registry |
| ch-7-s7 | 7.7 | Our first component | — |
| ch-7-s8 | 7.8 | Shadow DOM | 7.8.1 Creation; 7.8.2 Styles with the page DOM; 7.8.3 Styles with Shadow DOM; 7.8.4 Styling web components |
| ch-7-s9 | 7.9 | Element parameterization | 7.9.1 data-* vs standard attributes; 7.9.2 Boolean attributes; 7.9.3 Update the component while observing attributes; 7.9.4 Update the component observing properties |
| ch-7-s10 | 7.10 | Creating a rating component | — |
| ch-7-s11 | 7.11 | Working with events | — |
| ch-7-s12 | 7.12 | Connecting the page DOM and shadow DOM with CSS | 7.12.1 Read custom properties for theming; 7.12.2 Expose custom properties for parametrization; 7.12.3 Expose elements to the page DOM; 7.12.4 Read state from the page DOM |
| ch-7-s13 | 7.13 | Summary | — |

### Chapter 8 — `ch-8` — "Working with templates and slots"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-8-s1 | 8.1 | The Template Content HTML Element | 8.1.1 Usage; 8.1.2 The Need for Cloning Templates; 8.1.3 Advantages |
| ch-8-s2 | 8.2 | Using Templates in Web Components | 8.2.1 Defining a Template in the HTML document; 8.2.2 Using external HTML files; 8.2.3 Loading external CSS stylesheets |
| ch-8-s3 | 8.3 | Rendering Dynamic Data in Templates | 8.3.1 Creating a Custom Template Engine; 8.3.2 Using Community Template Engines |
| ch-8-s4 | 8.4 | Using Slots | 8.4.1 Fallback Content; 8.4.2 Full example; 8.4.3 The Flattened Tree; 8.4.4 Multiple Elements in One Slot |
| ch-8-s5 | 8.5 | Styling Slotted Content | 8.5.1 The ::slotted() pseudo-Element; 8.5.2 Styling Strategies |
| ch-8-s6 | 8.6 | Slots API | 8.6.1 The slotchange Event; 8.6.2 assignedNodes and assignedElements; 8.6.3 Practical Example: Tab Component; 8.6.4 Finding a Slot's Assigned Slot |
| ch-8-s7 | 8.7 | Nested Slots | — |
| ch-8-s8 | 8.8 | Slot Best Practices | — |
| ch-8-s9 | 8.9 | Summary | — |

### Chapter 9 — `ch-9` — "Advanced web components"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-9-s1 | 9.1 | Element internals | 9.1.1 Form participation; 9.1.2 Validation methods; 9.1.3 Accessing form and labels |
| ch-9-s2 | 9.2 | Web components lifecycle | 9.2.1 Basic lifecycle flow; 9.2.2 The adoptedCallback() in practice; 9.2.3 Form-associated lifecycle; 9.2.4 Restoring form state after navigation; 9.2.5 Cleanup in disconnectedCallback(); 9.2.6 Waiting for element registration; 9.2.7 Styling undefined elements with :defined |
| ch-9-s3 | 9.3 | Advanced accessibility for web components | 9.3.1 ARIA via ElementInternals; 9.3.2 Common ARIA properties; 9.3.3 Building an accessible toggle |
| ch-9-s4 | 9.4 | Focus and keyboard management | 9.4.1 Delegating focus into shadow DOM; 9.4.2 Managing focus programmatically; 9.4.3 Keyboard interaction patterns |
| ch-9-s5 | 9.5 | Custom state set | 9.5.1 The states property; 9.5.2 The :state() pseudo-class; 9.5.3 Building a stateful component |
| ch-9-s6 | 9.6 | Declarative Shadow DOM | 9.6.1 Basic syntax; 9.6.2 When to use Declarative Shadow DOM; 9.6.3 Hydrating a declarative shadow root; 9.6.4 Using CSS with DSD before hydration; 9.6.5 DSD configuration attributes; 9.6.6 Resource loading in declarative shadow roots |
| ch-9-s7 | 9.7 | Testing web components | 9.7.1 A simple browser-based test page; 9.7.2 Testing shadow DOM and slots; 9.7.3 Testing form-associated components; 9.7.4 Visual regression testing |
| ch-9-s8 | 9.8 | Library integration | 9.8.1 Using web components in frameworks; 9.8.2 Wrapping React components as web components; 9.8.3 Wrapping Angular components as web components; 9.8.4 Wrapping Vue components as web components |
| ch-9-s9 | 9.9 | Deploying web components | 9.9.1 Shipping a standalone ES module; 9.9.2 Publishing as an npm package; 9.9.3 Offering a CDN-friendly build; 9.9.4 Bundling and transpiling; 9.9.5 Distribution checklist |
| ch-9-s10 | 9.10 | Summary | — |

### Chapter 10 — `ch-10` — "Navigation"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-10-s1 | 10.1 | Navigation and routing on the Web | 10.1.1 Discoverability, accessibility, and graceful degradation; 10.1.2 Native navigation; 10.1.3 Client-side router; 10.1.4 Navigation and routing definitions; 10.1.5 Friendly URLs; 10.1.6 Real URLs; 10.1.7 Real links; 10.1.8 URL parts; 10.1.9 Route; 10.1.10 Canonical route shapes; 10.1.11 Route state |
| ch-10-s2 | 10.2 | The server | — |
| ch-10-s3 | 10.3 | Navigation interception | 10.3.1 Navigation entry list; 10.3.2 The Navigation API; 10.3.3 Cancellation with event.signal; 10.3.4 Form submissions; 10.3.5 Observing completion; 10.3.6 History API fallback |
| ch-10-s4 | 10.4 | Route matching | 10.4.1 Simple matching; 10.4.2 Matching routes with URLPattern; 10.4.3 Testing the matcher |
| ch-10-s5 | 10.5 | Summary | — |

### Chapter 11 — `ch-11` — "Building a router"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-11-s1 | 11.1 | Rendering routes | 11.1.1 Outlet and master pages; 11.1.2 Using DOM APIs; 11.1.3 Title and metadata; 11.1.4 Active navigation and focus; 11.1.5 Scroll restoration; 11.1.6 Using web components; 11.1.7 Route guards; 11.1.8 Not found and route errors |
| ch-11-s2 | 11.2 | Navigating to new routes | — |
| ch-11-s3 | 11.3 | View transitions for route change | 11.3.1 View Transitions API; 11.3.2 Cross-document view transitions; 11.3.3 Motion and accessibility |
| ch-11-s4 | 11.4 | Building a tiny Vanilla router | 11.4.1 First pass: a function-based router; 11.4.2 Second pass: a class-based router; 11.4.3 Using the router for a tab view |
| ch-11-s5 | 11.5 | Building a web component-based router | — |
| ch-11-s6 | 11.6 | Summary | — |

### Chapter 12 — `ch-12` — "Working with data"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-12-s1 | 12.1 | Working with HTTP | 12.1.1 Basic usage; 12.1.2 Sending data; 12.1.3 Credentials and cookies; 12.1.4 Headers and response parsing; 12.1.5 AbortController and stale requests; 12.1.6 Request lifecycle; 12.1.7 Streaming responses; 12.1.8 Uploads, downloads, and progress |
| ch-12-s2 | 12.2 | Working with WebSockets | — |
| ch-12-s3 | 12.3 | Remote data and local caches | — |
| ch-12-s4 | 12.4 | Data persistence | 12.4.1 Where browser storage lives; 12.4.2 Choosing a storage API; 12.4.3 Quotas and persistence; 12.4.4 Web Storage; 12.4.5 IndexedDB; 12.4.6 Cache Storage; 12.4.7 File systems; 12.4.8 Debugging and maintenance |
| ch-12-s5 | 12.5 | Summary | — |

### Chapter 13 — `ch-13` — "Data binding and reactivity"
| id | num | Title | Sub-sections (display only) |
| :--- | :--- | :--- | :--- |
| ch-13-s1 | 13.1 | Reactive thinking | — |
| ch-13-s2 | 13.2 | Data binding techniques | 13.2.1 Direct DOM binding; 13.2.2 Derived bindings; 13.2.3 A render function with queueMicrotask(); 13.2.4 Binding through data-* attributes; 13.2.5 Binding with template strings; 13.2.6 Binding with `<template>`; 13.2.7 EventTarget stores; 13.2.8 Proxy; 13.2.9 Signals through a micro-library; 13.2.10 Choosing a binding pattern |
| ch-13-s3 | 13.3 | State management | 13.3.1 Design patterns |
| ch-13-s4 | 13.4 | Data validation | — |
| ch-13-s5 | 13.5 | Summary | — |

### Chapter 14 — `ch-14` — "Beyond basics" — `tbd: true`
No section TOC published yet. `sections: []`. `lab-ch-14` and `fc-ch-14` exist as placeholder ids with `tbd: true` — see `docs/content/labs.md`.

### Chapter 15 — `ch-15` — "Building an app" — `tbd: true`
No section TOC published yet. `sections: []`. `lab-ch-15` and `fc-ch-15` exist as placeholder ids with `tbd: true` — see `docs/content/labs.md`.

---

## 6. Counts (for verification)

| Chapter range | Tracked sections (`x.y`) |
| :--- | ---: |
| ch-1 | 9 |
| ch-2 | 6 |
| ch-3 | 9 |
| ch-4 | 4 |
| ch-5 | 10 |
| ch-6 | 4 |
| ch-7 | 13 |
| ch-8 | 9 |
| ch-9 | 10 |
| ch-10 | 5 |
| ch-11 | 6 |
| ch-12 | 5 |
| ch-13 | 5 |
| ch-14 | 0 (tbd) |
| ch-15 | 0 (tbd) |
| **Total** | **95** |

Any implementation must have exactly 95 `Section` objects across `bookData.*.ts`, plus 15 `Chapter` objects, 15 `Lab` objects, 15 `FlashcardTask` objects. Run a quick count (`sections.length === 95`, `chapters.length === 15`) as a build-time sanity check, mirroring the id-drift console check described in section 4.

## 7. Updating this file when Manning publishes chapters 14–15

1. Fetch the updated TOC (liveBook or the Manning book page).
2. Add the new `x.y` / `x.y.z` rows to the Chapter 14/15 tables above, following the exact id pattern in section 4 (`ch-14-s1`, `ch-14-s2`, …).
3. Flip `tbd` to `false` only once real sections exist.
4. Update the counts table in section 6.
5. Write real lab/flashcard/glossary content for those chapters in the corresponding `docs/content/` files (currently placeholders — see `labs.md`).
6. Never reuse an id that was previously a placeholder for something else; placeholders (`lab-ch-14`, `fc-ch-14`) keep their id once real content lands.
