import type { Section, SubSection } from "../../types/appState";

function sub(num: string, title: string): SubSection {
  return { num, title };
}

function section(
  chapterNum: number,
  index: number,
  num: string,
  title: string,
  subsections: SubSection[],
  estMinutes: number,
): Section {
  return { id: `ch-${chapterNum}-s${index}`, num, title, subsections, estMinutes };
}

const ch1: Section[] = [
  section(1, 1, "1.1", "What Vanilla Web is not", [], 5),
  section(1, 2, "1.2", "What Vanilla Web is", [], 5),
  section(1, 3, "1.3", "How it works", [], 5),
  section(1, 4, "1.4", "Remembering our goals", [], 5),
  section(1, 5, "1.5", "Using Vanilla Web", [sub("1.5.1", "Mixing Vanilla with libraries")], 5),
  section(1, 6, "1.6", "Enhancing your skills", [], 5),
  section(1, 7, "1.7", "Characteristics", [], 5),
  section(1, 8, "1.8", "Challenges", [], 5),
  section(1, 9, "1.9", "Summary", [], 5),
];

const ch2: Section[] = [
  section(2, 1, "2.1", "Building blocks", [
    sub("2.1.1", "Rendering engines"),
    sub("2.1.2", "Network protocols"),
    sub("2.1.3", "Web security"),
    sub("2.1.4", "Application architecture"),
    sub("2.1.5", "HTML, CSS, and JavaScript"),
  ], 15),
  section(2, 2, "2.2", "Design Patterns", [sub("2.2.1", "Web APIs")], 8),
  section(2, 3, "2.3", "The power of Vanilla Web", [
    sub("2.3.1", "Web performance"),
    sub("2.3.2", "Accessibility"),
    sub("2.3.3", "Distribution"),
    sub("2.3.4", "Discardability"),
  ], 12),
  section(2, 4, "2.4", "Modern web apps", [
    sub("2.4.1", "Installability"),
    sub("2.4.2", "Offline support"),
    sub("2.4.3", "Data Storage"),
    sub("2.4.4", "Internationalization"),
    sub("2.4.5", "Capabilities API"),
    sub("2.4.6", "Client-side AI"),
  ], 15),
  section(2, 5, "2.5", "Developer experience", [
    sub("2.5.1", "Simple and more secure organization"),
    sub("2.5.2", "Interoperability with libraries and frameworks"),
    sub("2.5.3", "Cost reduction"),
    sub("2.5.4", "Reduced Complexity Tax"),
    sub("2.5.5", "Deploying the apps"),
  ], 12),
  section(2, 6, "2.6", "Summary", [], 5),
];

const ch3: Section[] = [
  section(3, 1, "3.1", "Defining our user interface", [], 8),
  section(3, 2, "3.2", "The ultimate responsive design", [], 8),
  section(3, 3, "3.3", "Web metadata", [
    sub("3.3.1", "Title"),
    sub("3.3.2", "Web app manifest"),
    sub("3.3.3", "Icons"),
    sub("3.3.4", "Theme color"),
    sub("3.3.5", "Viewport definition"),
    sub("3.3.6", "Semantic metadata"),
    sub("3.3.7", "Putting the metadata together"),
  ], 18),
  section(3, 4, "3.4", "Semantic HTML", [
    sub("3.4.1", "Using the Right Element"),
    sub("3.4.2", "Avoiding divitis and other problems"),
    sub("3.4.3", "Semantic attributes"),
  ], 15),
  section(3, 5, "3.5", "Accessibility", [
    sub("3.5.1", "Landmarks"),
    sub("3.5.2", "Forms"),
    sub("3.5.3", "Keyboard Navigation"),
    sub("3.5.4", "ARIA Roles"),
    sub("3.5.5", "ARIA states and properties"),
    sub("3.5.6", "Color and contrast"),
    sub("3.5.7", "Interactive elements"),
    sub("3.5.8", "Screen readers"),
  ], 25),
  section(3, 6, "3.6", "Media resources", [
    sub("3.6.1", "Image formats"),
    sub("3.6.2", "Video formats"),
    sub("3.6.3", "AR formats"),
  ], 12),
  section(3, 7, "3.7", "Rich web UI controls", [
    sub("3.7.1", "Summaries"),
    sub("3.7.2", "Accordions"),
    sub("3.7.3", "Modal dialogs"),
    sub("3.7.4", "Carousels"),
    sub("3.7.5", "Popovers"),
    sub("3.7.6", "Rich selectors"),
    sub("3.7.7", "Other UI controls"),
  ], 18),
  section(3, 8, "3.8", "Beyond basic UI", [
    sub("3.8.1", "Using canvas"),
    sub("3.8.2", "Using UI-related APIs"),
  ], 12),
  section(3, 9, "3.9", "Summary", [], 5),
];

const ch4: Section[] = [
  section(4, 1, "4.1", "Maintainable and modular CSS", [
    sub("4.1.1", "Cascade Layers"),
    sub("4.1.2", "Custom properties (variables)"),
    sub("4.1.3", "Container queries and units"),
    sub("4.1.4", "Nested selectors"),
    sub("4.1.5", "New pseudo-selectors"),
    sub("4.1.6", "Modern CSS units"),
  ], 25),
  section(4, 2, "4.2", "Modern Layout", [
    sub("4.2.1", "1D layout with Flexbox"),
    sub("4.2.2", "2D layout with grids"),
  ], 20),
  section(4, 3, "4.3", "Animations", [
    sub("4.3.1", "Transitions"),
    sub("4.3.2", "Keyframe animations"),
    sub("4.3.3", "Page transitions"),
    sub("4.3.4", "Scroll-driven animations"),
  ], 25),
  section(4, 4, "4.4", "Summary", [], 5),
];

const ch5: Section[] = [
  section(5, 1, "5.1", "Versioning", [], 8),
  section(5, 2, "5.2", "Latest additions to the language", [sub("5.2.1", "ESNext")], 8),
  section(5, 3, "5.3", "Using a transpiler", [], 8),
  section(5, 4, "5.4", "Using polyfills", [], 8),
  section(5, 5, "5.5", "ECMAScript Modules", [
    sub("5.5.1", "Named exports"),
    sub("5.5.2", "Importing modules"),
    sub("5.5.3", "Import Maps"),
    sub("5.5.4", "Top-level await"),
    sub("5.5.5", "Preloading and execution order"),
    sub("5.5.6", "Lazy loading"),
    sub("5.5.7", "Error handling and timeouts for dynamic imports"),
    sub("5.5.8", "Import attributes and JSON modules"),
    sub("5.5.9", "Re-exports and module organization"),
    sub("5.5.10", "Caching, single evaluation, and side effects"),
    sub("5.5.11", "Practical rules of thumb"),
  ], 25),
  section(5, 6, "5.6", "Modern JavaScript Essentials", [
    sub("5.6.1", "Optional chaining and nullish coalescing"),
    sub("5.6.2", "Logical assignment operators"),
    sub("5.6.3", "Destructuring + rest/spread in practice"),
    sub("5.6.4", "Classes with public & private fields"),
    sub("5.6.5", "Cleaner errors: optional catch binding and error cause"),
    sub("5.6.6", "Small quality-of-life wins"),
  ], 20),
  section(5, 7, "5.7", "Collection Management", [
    sub("5.7.1", "Arrays"),
    sub("5.7.2", "Sets"),
    sub("5.7.3", "Maps"),
    sub("5.7.4", "Weak collections: memory-friendly"),
  ], 15),
  section(5, 8, "5.8", "Functional Programming", [
    sub("5.8.1", "Array transformations"),
    sub("5.8.2", "Pure functions and immutability"),
    sub("5.8.3", "Function composition"),
    sub("5.8.4", "Everyday benefits"),
  ], 15),
  section(5, 9, "5.9", "Error Management", [
    sub("5.9.1", "Exceptions and try/catch"),
    sub("5.9.2", "Error objects"),
    sub("5.9.3", "Asynchronous errors"),
    sub("5.9.4", "Global handlers"),
    sub("5.9.5", "Practical guidance for error management"),
  ], 18),
  section(5, 10, "5.10", "Summary", [], 5),
];

const ch6: Section[] = [
  section(6, 1, "6.1", "The DOM tree", [], 10),
  section(6, 2, "6.2", "The API", [
    sub("6.2.1", "HTMLElement interface"),
    sub("6.2.2", "Global DOM objects"),
    sub("6.2.3", "Working with different documents"),
    sub("6.2.4", "Querying the document"),
    sub("6.2.5", "Browsing the tree"),
    sub("6.2.6", "Elements available"),
    sub("6.2.7", "Modifying elements"),
    sub("6.2.8", "Properties vs. attributes"),
    sub("6.2.9", "Creating elements"),
    sub("6.2.10", "Element arrangement"),
    sub("6.2.11", "Custom properties with dataset"),
    sub("6.2.12", "Working with styles"),
    sub("6.2.13", "Working with events"),
  ], 30),
  section(6, 3, "6.3", "Browser Web APIs", [], 10),
  section(6, 4, "6.4", "Summary", [], 5),
];

const ch7: Section[] = [
  section(7, 1, "7.1", "The component design pattern", [], 10),
  section(7, 2, "7.2", "Use cases", [], 8),
  section(7, 3, "7.3", "Advantages", [], 8),
  section(7, 4, "7.4", "Challenges", [], 8),
  section(7, 5, "7.5", "Vanilla web components", [
    sub("7.5.1", "Architecture"),
    sub("7.5.2", "The puzzle"),
    sub("7.5.3", "Abilities"),
  ], 15),
  section(7, 6, "7.6", "Custom Elements API", [
    sub("7.6.1", "Creation"),
    sub("7.6.2", "Rendering content"),
    sub("7.6.3", "Registration"),
    sub("7.6.4", "Simplifying the syntax"),
    sub("7.6.5", "The Custom Element Registry"),
  ], 25),
  section(7, 7, "7.7", "Our first component", [], 15),
  section(7, 8, "7.8", "Shadow DOM", [
    sub("7.8.1", "Creation"),
    sub("7.8.2", "Styles with the page DOM"),
    sub("7.8.3", "Styles with Shadow DOM"),
    sub("7.8.4", "Styling web components"),
  ], 25),
  section(7, 9, "7.9", "Element parameterization", [
    sub("7.9.1", "data-* vs standard attributes"),
    sub("7.9.2", "Boolean attributes"),
    sub("7.9.3", "Update the component while observing attributes"),
    sub("7.9.4", "Update the component observing properties"),
  ], 25),
  section(7, 10, "7.10", "Creating a rating component", [], 25),
  section(7, 11, "7.11", "Working with events", [], 15),
  section(7, 12, "7.12", "Connecting the page DOM and shadow DOM with CSS", [
    sub("7.12.1", "Read custom properties for theming"),
    sub("7.12.2", "Expose custom properties for parametrization"),
    sub("7.12.3", "Expose elements to the page DOM"),
    sub("7.12.4", "Read state from the page DOM"),
  ], 20),
  section(7, 13, "7.13", "Summary", [], 5),
];

const ch8: Section[] = [
  section(8, 1, "8.1", "The Template Content HTML Element", [
    sub("8.1.1", "Usage"),
    sub("8.1.2", "The Need for Cloning Templates"),
    sub("8.1.3", "Advantages"),
  ], 15),
  section(8, 2, "8.2", "Using Templates in Web Components", [
    sub("8.2.1", "Defining a Template in the HTML document"),
    sub("8.2.2", "Using external HTML files"),
    sub("8.2.3", "Loading external CSS stylesheets"),
  ], 18),
  section(8, 3, "8.3", "Rendering Dynamic Data in Templates", [
    sub("8.3.1", "Creating a Custom Template Engine"),
    sub("8.3.2", "Using Community Template Engines"),
  ], 20),
  section(8, 4, "8.4", "Using Slots", [
    sub("8.4.1", "Fallback Content"),
    sub("8.4.2", "Full example"),
    sub("8.4.3", "The Flattened Tree"),
    sub("8.4.4", "Multiple Elements in One Slot"),
  ], 20),
  section(8, 5, "8.5", "Styling Slotted Content", [
    sub("8.5.1", "The ::slotted() pseudo-Element"),
    sub("8.5.2", "Styling Strategies"),
  ], 15),
  section(8, 6, "8.6", "Slots API", [
    sub("8.6.1", "The slotchange Event"),
    sub("8.6.2", "assignedNodes and assignedElements"),
    sub("8.6.3", "Practical Example: Tab Component"),
    sub("8.6.4", "Finding a Slot's Assigned Slot"),
  ], 25),
  section(8, 7, "8.7", "Nested Slots", [], 12),
  section(8, 8, "8.8", "Slot Best Practices", [], 10),
  section(8, 9, "8.9", "Summary", [], 5),
];

const ch9: Section[] = [
  section(9, 1, "9.1", "Element internals", [
    sub("9.1.1", "Form participation"),
    sub("9.1.2", "Validation methods"),
    sub("9.1.3", "Accessing form and labels"),
  ], 20),
  section(9, 2, "9.2", "Web components lifecycle", [
    sub("9.2.1", "Basic lifecycle flow"),
    sub("9.2.2", "The adoptedCallback() in practice"),
    sub("9.2.3", "Form-associated lifecycle"),
    sub("9.2.4", "Restoring form state after navigation"),
    sub("9.2.5", "Cleanup in disconnectedCallback()"),
    sub("9.2.6", "Waiting for element registration"),
    sub("9.2.7", "Styling undefined elements with :defined"),
  ], 25),
  section(9, 3, "9.3", "Advanced accessibility for web components", [
    sub("9.3.1", "ARIA via ElementInternals"),
    sub("9.3.2", "Common ARIA properties"),
    sub("9.3.3", "Building an accessible toggle"),
  ], 20),
  section(9, 4, "9.4", "Focus and keyboard management", [
    sub("9.4.1", "Delegating focus into shadow DOM"),
    sub("9.4.2", "Managing focus programmatically"),
    sub("9.4.3", "Keyboard interaction patterns"),
  ], 18),
  section(9, 5, "9.5", "Custom state set", [
    sub("9.5.1", "The states property"),
    sub("9.5.2", "The :state() pseudo-class"),
    sub("9.5.3", "Building a stateful component"),
  ], 18),
  section(9, 6, "9.6", "Declarative Shadow DOM", [
    sub("9.6.1", "Basic syntax"),
    sub("9.6.2", "When to use Declarative Shadow DOM"),
    sub("9.6.3", "Hydrating a declarative shadow root"),
    sub("9.6.4", "Using CSS with DSD before hydration"),
    sub("9.6.5", "DSD configuration attributes"),
    sub("9.6.6", "Resource loading in declarative shadow roots"),
  ], 20),
  section(9, 7, "9.7", "Testing web components", [
    sub("9.7.1", "A simple browser-based test page"),
    sub("9.7.2", "Testing shadow DOM and slots"),
    sub("9.7.3", "Testing form-associated components"),
    sub("9.7.4", "Visual regression testing"),
  ], 18),
  section(9, 8, "9.8", "Library integration", [
    sub("9.8.1", "Using web components in frameworks"),
    sub("9.8.2", "Wrapping React components as web components"),
    sub("9.8.3", "Wrapping Angular components as web components"),
    sub("9.8.4", "Wrapping Vue components as web components"),
  ], 18),
  section(9, 9, "9.9", "Deploying web components", [
    sub("9.9.1", "Shipping a standalone ES module"),
    sub("9.9.2", "Publishing as an npm package"),
    sub("9.9.3", "Offering a CDN-friendly build"),
    sub("9.9.4", "Bundling and transpiling"),
    sub("9.9.5", "Distribution checklist"),
  ], 18),
  section(9, 10, "9.10", "Summary", [], 5),
];

const ch10: Section[] = [
  section(10, 1, "10.1", "Navigation and routing on the Web", [
    sub("10.1.1", "Discoverability, accessibility, and graceful degradation"),
    sub("10.1.2", "Native navigation"),
    sub("10.1.3", "Client-side router"),
    sub("10.1.4", "Navigation and routing definitions"),
    sub("10.1.5", "Friendly URLs"),
    sub("10.1.6", "Real URLs"),
    sub("10.1.7", "Real links"),
    sub("10.1.8", "URL parts"),
    sub("10.1.9", "Route"),
    sub("10.1.10", "Canonical route shapes"),
    sub("10.1.11", "Route state"),
  ], 25),
  section(10, 2, "10.2", "The server", [], 8),
  section(10, 3, "10.3", "Navigation interception", [
    sub("10.3.1", "Navigation entry list"),
    sub("10.3.2", "The Navigation API"),
    sub("10.3.3", "Cancellation with event.signal"),
    sub("10.3.4", "Form submissions"),
    sub("10.3.5", "Observing completion"),
    sub("10.3.6", "History API fallback"),
  ], 20),
  section(10, 4, "10.4", "Route matching", [
    sub("10.4.1", "Simple matching"),
    sub("10.4.2", "Matching routes with URLPattern"),
    sub("10.4.3", "Testing the matcher"),
  ], 18),
  section(10, 5, "10.5", "Summary", [], 5),
];

const ch11: Section[] = [
  section(11, 1, "11.1", "Rendering routes", [
    sub("11.1.1", "Outlet and master pages"),
    sub("11.1.2", "Using DOM APIs"),
    sub("11.1.3", "Title and metadata"),
    sub("11.1.4", "Active navigation and focus"),
    sub("11.1.5", "Scroll restoration"),
    sub("11.1.6", "Using web components"),
    sub("11.1.7", "Route guards"),
    sub("11.1.8", "Not found and route errors"),
  ], 25),
  section(11, 2, "11.2", "Navigating to new routes", [], 10),
  section(11, 3, "11.3", "View transitions for route change", [
    sub("11.3.1", "View Transitions API"),
    sub("11.3.2", "Cross-document view transitions"),
    sub("11.3.3", "Motion and accessibility"),
  ], 20),
  section(11, 4, "11.4", "Building a tiny Vanilla router", [
    sub("11.4.1", "First pass: a function-based router"),
    sub("11.4.2", "Second pass: a class-based router"),
    sub("11.4.3", "Using the router for a tab view"),
  ], 40),
  section(11, 5, "11.5", "Building a web component-based router", [], 30),
  section(11, 6, "11.6", "Summary", [], 5),
];

const ch12: Section[] = [
  section(12, 1, "12.1", "Working with HTTP", [
    sub("12.1.1", "Basic usage"),
    sub("12.1.2", "Sending data"),
    sub("12.1.3", "Credentials and cookies"),
    sub("12.1.4", "Headers and response parsing"),
    sub("12.1.5", "AbortController and stale requests"),
    sub("12.1.6", "Request lifecycle"),
    sub("12.1.7", "Streaming responses"),
    sub("12.1.8", "Uploads, downloads, and progress"),
  ], 30),
  section(12, 2, "12.2", "Working with WebSockets", [], 15),
  section(12, 3, "12.3", "Remote data and local caches", [], 15),
  section(12, 4, "12.4", "Data persistence", [
    sub("12.4.1", "Where browser storage lives"),
    sub("12.4.2", "Choosing a storage API"),
    sub("12.4.3", "Quotas and persistence"),
    sub("12.4.4", "Web Storage"),
    sub("12.4.5", "IndexedDB"),
    sub("12.4.6", "Cache Storage"),
    sub("12.4.7", "File systems"),
    sub("12.4.8", "Debugging and maintenance"),
  ], 35),
  section(12, 5, "12.5", "Summary", [], 5),
];

const ch13: Section[] = [
  section(13, 1, "13.1", "Reactive thinking", [], 10),
  section(13, 2, "13.2", "Data binding techniques", [
    sub("13.2.1", "Direct DOM binding"),
    sub("13.2.2", "Derived bindings"),
    sub("13.2.3", "A render function with queueMicrotask()"),
    sub("13.2.4", "Binding through data-* attributes"),
    sub("13.2.5", "Binding with template strings"),
    sub("13.2.6", "Binding with <template>"),
    sub("13.2.7", "EventTarget stores"),
    sub("13.2.8", "Proxy"),
    sub("13.2.9", "Signals through a micro-library"),
    sub("13.2.10", "Choosing a binding pattern"),
  ], 35),
  section(13, 3, "13.3", "State management", [sub("13.3.1", "Design patterns")], 15),
  section(13, 4, "13.4", "Data validation", [], 12),
  section(13, 5, "13.5", "Summary", [], 5),
];

export const SECTIONS_BY_CHAPTER: Record<number, Section[]> = {
  1: ch1,
  2: ch2,
  3: ch3,
  4: ch4,
  5: ch5,
  6: ch6,
  7: ch7,
  8: ch8,
  9: ch9,
  10: ch10,
  11: ch11,
  12: ch12,
  13: ch13,
  14: [],
  15: [],
};
