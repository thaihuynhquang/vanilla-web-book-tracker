import type { Resource } from "../../types/appState";

export const RESOURCES: Resource[] = [
  // Chapter 1
  { id: "res-ch-1-1", chapterId: "ch-1", type: "article", title: "JavaScript Bloat in 2024", url: "https://tonsky.me/blog/js-bloat/" },
  { id: "res-ch-1-2", chapterId: "ch-1", type: "article", title: "web.dev — Learn", url: "https://web.dev/learn" },
  // Chapter 2
  { id: "res-ch-2-1", chapterId: "ch-2", type: "tool", title: "caniuse.com", url: "https://caniuse.com/" },
  { id: "res-ch-2-2", chapterId: "ch-2", type: "article", title: "web.dev — Progressive Web Apps", url: "https://web.dev/explore/progressive-web-apps" },
  // Chapter 3
  { id: "res-ch-3-2", chapterId: "ch-3", type: "mdn", title: "HTML: A good basis for accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML" },
  { id: "res-ch-3-3", chapterId: "ch-3", type: "spec", title: "WAI-ARIA Authoring Practices Guide (APG)", url: "https://www.w3.org/WAI/ARIA/apg/" },
  { id: "res-ch-3-4", chapterId: "ch-3", type: "demo", title: "open-props.style", url: "https://open-props.style/" },
  { id: "res-ch-3-5", chapterId: "ch-3", type: "video", title: "Kevin Powell — Accessibility playlist (YouTube)", url: "https://www.youtube.com/@KevinPowell" },
  // Chapter 4
  { id: "res-ch-4-3", chapterId: "ch-4", type: "article", title: "web.dev — Scroll-driven animations", url: "https://developer.chrome.com/docs/css-ui/scroll-driven-animations" },
  { id: "res-ch-4-4", chapterId: "ch-4", type: "demo", title: "scroll-driven-animations.style", url: "https://scroll-driven-animations.style/" },
  { id: "res-ch-4-5", chapterId: "ch-4", type: "spec", title: "CSS Nesting Module", url: "https://www.w3.org/TR/css-nesting-1/" },
  // Chapter 5
  { id: "res-ch-5-1", chapterId: "ch-5", type: "mdn", title: "JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
  { id: "res-ch-5-2", chapterId: "ch-5", type: "article", title: "web.dev — Import maps", url: "https://web.dev/blog/import-maps-in-all-modern-browsers" },
  { id: "res-ch-5-3", chapterId: "ch-5", type: "article", title: "TC39 proposals", url: "https://github.com/tc39/proposals" },
  { id: "res-ch-5-4", chapterId: "ch-5", type: "video", title: "Fireship — Modern JS in 100 seconds series (YouTube)", url: "https://www.youtube.com/@Fireship" },
  // Chapter 6
  { id: "res-ch-6-1", chapterId: "ch-6", type: "mdn", title: "Document Object Model (DOM)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
  { id: "res-ch-6-3", chapterId: "ch-6", type: "article", title: "web.dev — Efficiently rendering large lists", url: "https://web.dev/articles/virtualize-long-lists-react-window" },
  // Chapter 7
  { id: "res-ch-7-1", chapterId: "ch-7", type: "mdn", title: "Web Components", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components" },
  { id: "res-ch-7-2", chapterId: "ch-7", type: "spec", title: "WHATWG DOM — Shadow tree", url: "https://dom.spec.whatwg.org/#shadow-trees" },
  { id: "res-ch-7-3", chapterId: "ch-7", type: "article", title: "web.dev — Template, slot, and shadow", url: "https://web.dev/learn/html/template" },
  { id: "res-ch-7-4", chapterId: "ch-7", type: "demo", title: "webcomponents.dev", url: "https://webcomponents.dev/" },
  { id: "res-ch-7-5", chapterId: "ch-7", type: "video", title: "Google Chrome Developers — Web Components (YouTube playlist)", url: "https://www.youtube.com/@ChromeDevs" },
  { id: "res-ch-7-6", chapterId: "ch-7", type: "tool", title: "Lit", url: "https://lit.dev/" },
  // Chapter 9
  { id: "res-ch-9-1", chapterId: "ch-9", type: "article", title: "web.dev — More capable form controls (ElementInternals)", url: "https://web.dev/articles/more-capable-form-controls" },
  // Chapter 10
  { id: "res-ch-10-2", chapterId: "ch-10", type: "mdn", title: "URL Pattern API", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API" },
  { id: "res-ch-10-3", chapterId: "ch-10", type: "article", title: "web.dev — Navigation API", url: "https://developer.chrome.com/docs/web-platform/navigation-api" },
  // Chapter 11
  { id: "res-ch-11-1", chapterId: "ch-11", type: "article", title: "web.dev — View Transitions", url: "https://developer.chrome.com/docs/web-platform/view-transitions/" },
  { id: "res-ch-11-2", chapterId: "ch-11", type: "demo", title: "View Transitions demos (Chrome DevRel)", url: "https://http203-playlist.netlify.app/" },
  // Chapter 12
  { id: "res-ch-12-1", chapterId: "ch-12", type: "mdn", title: "Using Fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
  { id: "res-ch-12-2", chapterId: "ch-12", type: "mdn", title: "Using IndexedDB", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB" },
  { id: "res-ch-12-4", chapterId: "ch-12", type: "article", title: "web.dev — Storage for the web", url: "https://web.dev/articles/storage-for-the-web" },
  { id: "res-ch-12-5", chapterId: "ch-12", type: "article", title: "web.dev — Streams", url: "https://web.dev/articles/streams" },
  // Chapter 13
  { id: "res-ch-13-2", chapterId: "ch-13", type: "spec", title: "TC39 Signals proposal", url: "https://github.com/tc39/proposal-signals" },
  { id: "res-ch-13-3", chapterId: "ch-13", type: "mdn", title: "Meta programming (Proxy & Reflect)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming" },
];
