import type { LabContent } from "../../types/appState";

export const LAB_CONTENT_EN: Record<string, LabContent> = {
  "lab-ch-1": {
    title: "A \"no-framework\" micro landing page",
    goal: "Prove that a static page needs no bundler or framework to run smoothly.",
    requirements: ["1 index.html + 1 CSS file + 1 JS module, opened directly via file:// or python -m http.server, no build step."],
    acceptanceCriteria: [
      "The page renders correctly with no build step at all.",
      "JS uses <script type=\"module\">, no globals leaked onto window.",
      "Write 3 lines noting when a project genuinely needs a framework, and when it doesn't.",
    ],
  },
  "lab-ch-2": {
    title: "Minimal PWA checklist",
    goal: "Apply the \"modern web app\" concepts (2.4) to an existing page.",
    requirements: ["Add manifest.json, theme-color, and a minimal cache-first service worker to a static page."],
    acceptanceCriteria: [
      "Lighthouse PWA check passes \"Installable\".",
      "The page loads offline (DevTools → Offline) after the first load.",
    ],
  },
  "lab-ch-3": {
    title: "A semantic page scoring 100 on a11y",
    goal: "Rewrite a \"div soup\" page into proper semantic HTML + ARIA.",
    requirements: ["Use landmarks (header/nav/main/footer), one form with full labels, one modal using <dialog>, and verify keyboard navigation across the whole page."],
    acceptanceCriteria: [
      "Lighthouse Accessibility = 100.",
      "Tabbing through every interactive element follows a logical order with no unintended focus trap.",
      "<dialog> closes with Esc and traps focus while open.",
    ],
  },
  "lab-ch-4": {
    title: "Responsive layout with @layer + container queries",
    goal: "Build a card-grid layout that resizes based on its container, not the viewport.",
    requirements: ["@layer reset, base, components, utilities;, a container query that changes the grid column count, and one scroll-driven animation (e.g. a scroll progress bar)."],
    acceptanceCriteria: [
      "The grid changes column count when its parent container resizes, no media query needed.",
      "No CSS rule sits outside any layer — every rule belongs to one of the 4 layers.",
      "The scroll-driven animation runs on animation-timeline: scroll(), with no JS scroll listener.",
    ],
  },
  "lab-ch-5": {
    title: "A pure-function utility library with error handling",
    goal: "Write a small utility module (e.g. currency formatting, debounce, group-by) in a functional style, with no transpiling.",
    requirements: ["Named exports via ESM, using optional chaining/nullish coalescing, at least one function using Object.groupBy or an equivalent ESNext feature, errors using Error with cause."],
    acceptanceCriteria: [
      "Runs directly in a modern browser, no Babel/tsc build needed.",
      "Every exported function is pure (no side effects, same input → same output).",
      "At least one test case throws an error and catches it with try/catch, logging error.cause.",
    ],
  },
  "lab-ch-6": {
    title: "A DOM builder with no innerHTML",
    goal: "Build a dynamic list using 100% plain DOM API (createElement, dataset, classList) to feel the cost/benefit versus template strings.",
    requirements: ["Render 20 items from a data array, each with data-id, click to toggle an active class, using addEventListener with event delegation on the parent container."],
    acceptanceCriteria: [
      "No innerHTML or insertAdjacentHTML used anywhere.",
      "Only 1 event listener attached on the container (event delegation), no per-item listeners.",
      "dataset is used to store the id, no other custom DOM attribute is used.",
    ],
  },
  "lab-ch-7": {
    title: "<star-rating> Web Component",
    goal: "Build a complete star-rating component — the chapter's central example.",
    requirements: ["Shadow DOM, observed attributes value + max, a value property synced two-way with the attribute, a custom rating-change event on star click, and a --star-color CSS custom property for external theming."],
    acceptanceCriteria: [
      "Changing value via JS (el.value = 3) updates the UI immediately, no full-page re-render.",
      "Changing the attribute via HTML (value=\"4\") is reflected correctly too.",
      "rating-change bubbles outside the Shadow DOM, event.detail.value carries the correct new value.",
      "The component picks up --star-color from the parent page's CSS without needing ::part().",
    ],
  },
  "lab-ch-8": {
    title: "A Tab Component using <template> + Slots",
    goal: "Build <tab-group>/<tab-panel> using an internal template and named slots.",
    requirements: ["A default slot for each tab's content, slotchange to detect dynamically-added tabs, and dedicated styling for slotted content via ::slotted()."],
    acceptanceCriteria: [
      "Adding a new <tab-panel> via JS after mount is still detected via slotchange.",
      "::slotted(p) styles only the slotted <p> elements, without affecting anything else.",
      "There is fallback content when a slot is empty.",
    ],
  },
  "lab-ch-9": {
    title: "A form-associated Toggle Switch",
    goal: "Build a <toggle-switch> that participates in a <form> like a real input.",
    requirements: ["static formAssociated = true, using ElementInternals to set the form value, a custom state via states + :state(checked) in CSS, and keyboard support (Space to toggle)."],
    acceptanceCriteria: [
      "form.elements recognizes <toggle-switch> as a control with a name/value.",
      "formResetCallback() correctly resets state on form reset.",
      "CSS :state(checked) changes styling without any manual class toggling.",
      "Fully operable by keyboard, with correct role/ARIA via ElementInternals.ariaChecked.",
    ],
  },
  "lab-ch-10": {
    title: "A route matcher with URLPattern",
    goal: "Write a pure matchRoute(pattern, url) function, no UI yet, to understand route matching before building a real router in lab 11.",
    requirements: ["Support path params (/books/:id), wildcards, and test against at least 6 different URLs (matching/non-matching)."],
    acceptanceCriteria: [
      "Uses URLPattern (no hand-written regex).",
      "Returns the correct params object on a match, null on no match.",
      "Has a test case confirming the query string is correctly ignored when matching the path.",
    ],
  },
  "lab-ch-11": {
    title: "A mini vanilla router with View Transitions",
    goal: "The biggest lab — turn the route matcher (lab 10) into a real router with smooth SPA navigation animation.",
    requirements: ["At least 3 routes, an outlet rendered via a web component, history.pushState/Navigation API to intercept navigation, wrapping renders in document.startViewTransition(), and handling not-found routes."],
    acceptanceCriteria: [
      "Clicking an internal link doesn't reload the page, the URL still changes correctly, and Back/Forward work.",
      "Route changes animate smoothly, respecting prefers-reduced-motion (animation off when the user enables it).",
      "A non-matching route shows a dedicated 404 page, without crashing the app.",
      "The <title> updates correctly to match the active route.",
    ],
  },
  "lab-ch-12": {
    title: "An offline-first storage layer (IndexedDB + Cache Storage)",
    goal: "Build a small data-access layer that stores a list of items in IndexedDB, fetches over HTTP with AbortController, and caches static responses via Cache Storage.",
    requirements: ["Basic CRUD on one IndexedDB object store, cancel an in-flight request when the user navigates away, check quota before large writes."],
    acceptanceCriteria: [
      "Closing/reopening the tab, data is still present in IndexedDB.",
      "Calling AbortController.abort() on unmount correctly cancels the pending request, with no stray console errors.",
      "Cache Storage serves assets while offline (tested via DevTools Offline).",
    ],
  },
  "lab-ch-13": {
    title: "A reactive store using Proxy + queueMicrotask",
    goal: "Write your own tiny reactive \"state store\" with no library — the exact model this tracker app itself uses.",
    requirements: ["A Proxy wrapping the state object, every set triggers exactly one render even across several consecutive field changes (batched via queueMicrotask), with an automatically-recomputed derived value."],
    acceptanceCriteria: [
      "Changing 5 fields consecutively within the same tick calls the render function only once (not 5 times).",
      "The derived value always matches the underlying state after render.",
      "A short written comparison: similarities/differences between this store and src/state/storage.ts + renderer.ts from architecture_guide.md.",
    ],
  },
  "lab-ch-14": {
    title: "TBD (not yet published)",
    goal: "Chapter 14 has no detailed outline from Manning yet, so no concrete lab can be designed.",
    requirements: [],
    acceptanceCriteria: [],
  },
  "lab-ch-15": {
    title: "TBD (not yet published)",
    goal: "Expected to be a capstone lab (\"Building an app\") — possibly combining Labs 7–13 into one complete app, but not finalized until a detailed outline exists.",
    requirements: [],
    acceptanceCriteria: [],
  },
};
