# BẢN ĐỒ 15 CHƯƠNG — VANILLA WEB

Nội dung nguồn cho tab **Chapters** (`#/chapters`). Mỗi chương: tóm tắt tiếng Việt (học được gì / dùng vào đâu), danh sách section `x.y` (đơn vị tick `read`/`hands-on`), sub-section `x.y.z` (chỉ hiển thị), ước lượng thời gian đọc, và gợi ý thứ tự ưu tiên. Id chính xác tham chiếu **[book_data_model_guide.md](../guides/book_data_model_guide.md)** — file này không lặp lại toàn bộ bảng id, chỉ nói về nội dung và cách đọc.

> Sách gốc: *Vanilla Web* (Manning) — https://www.manning.com/books/vanilla-web

---

## Cách dùng bản đồ này

- **Lướt nhanh** (skim): đọc để nắm khái niệm, không cần code theo từng dòng.
- **Đọc kỹ + code theo** (deep): vừa đọc vừa mở editor gõ lại ví dụ; đánh dấu cả `read` và `hands-on`.
- **Chương trọng tâm**: 7, 8, 9, 11, 12, 13 — đây là phần "học được kỹ năng vanilla thật sự", nên đọc kỹ và làm lab đầy đủ (xem `labs.md`).
- **Chương nền tảng**: 1, 2 — lướt nhanh, chủ yếu để có ngữ cảnh, không có nhiều thứ để "hands-on".
- **Chương kỹ năng nền HTML/CSS/JS**: 3, 4, 5, 6 — đọc kỹ nếu còn yếu nền tảng; nếu đã vững JS/CSS hiện đại có thể lướt và chỉ dừng ở phần mới (ví dụ container queries, ESM import maps).
- **Chương tổng hợp**: 14, 15 — chưa có mục lục chi tiết (early access), để đọc sau cùng khi Manning phát hành đầy đủ.

Tổng cộng **95 section** trên 13 chương đã xuất bản mục lục chi tiết; chương 14–15 đang chờ nội dung.

---

## Chương 1 — Hello Vanilla Web
**Tóm tắt**: Giới thiệu triết lý "Vanilla Web" là gì và không phải là gì — không phải quay lại thời kỳ jQuery, mà là dùng thẳng nền tảng web hiện đại (Custom Elements, Fetch, CSS mới...) thay vì kéo theo React/Vue cho mọi dự án. Đọc để hiểu **vì sao** cuốn sách tồn tại trước khi học **cách làm**.
**Ưu tiên đọc**: Lướt nhanh (skim), ~30–40 phút.
**Sections**:
- 1.1 What Vanilla Web is not
- 1.2 What Vanilla Web is
- 1.3 How it works
- 1.4 Remembering our goals
- 1.5 Using Vanilla Web
  - 1.5.1 Mixing Vanilla with libraries
- 1.6 Enhancing your skills
- 1.7 Characteristics
- 1.8 Challenges
- 1.9 Summary

## Chương 2 — Understanding the web platform
**Tóm tắt**: Bức tranh toàn cảnh nền tảng web — rendering engine, giao thức mạng, bảo mật, kiến trúc ứng dụng, và vì sao Vanilla Web tận dụng được hiệu năng/khả năng truy cập/khả năng phân phối tốt hơn stack nặng framework. Có phần về PWA (installability, offline, storage, i18n, Capabilities API, AI phía client) — nền tảng khái niệm cho các chương sau.
**Ưu tiên đọc**: Lướt nhanh, ~45–60 phút. Phần 2.4 (Modern web apps) đáng đọc kỹ nếu bạn quan tâm PWA.
**Sections**:
- 2.1 Building blocks
  - 2.1.1 Rendering engines
  - 2.1.2 Network protocols
  - 2.1.3 Web security
  - 2.1.4 Application architecture
  - 2.1.5 HTML, CSS, and JavaScript
- 2.2 Design Patterns
  - 2.2.1 Web APIs
- 2.3 The power of Vanilla Web
  - 2.3.1 Web performance
  - 2.3.2 Accessibility
  - 2.3.3 Distribution
  - 2.3.4 Discardability
- 2.4 Modern web apps
  - 2.4.1 Installability
  - 2.4.2 Offline support
  - 2.4.3 Data Storage
  - 2.4.4 Internationalization
  - 2.4.5 Capabilities API
  - 2.4.6 Client-side AI
- 2.5 Developer experience
  - 2.5.1 Simple and more secure organization
  - 2.5.2 Interoperability with libraries and frameworks
  - 2.5.3 Cost reduction
  - 2.5.4 Reduced Complexity Tax
  - 2.5.5 Deploying the apps
- 2.6 Summary

## Chương 3 — The user interface
**Tóm tắt**: Xây UI đúng chuẩn nền tảng — metadata (manifest, theme-color, viewport), HTML semantic (tránh "divitis"), accessibility đầy đủ (landmarks, forms, keyboard, ARIA, contrast, screen reader), rồi tới các control UI có sẵn của trình duyệt (`<details>`, `<dialog>`, popover, carousel CSS-only) trước khi tự viết component riêng ở chương 7.
**Ưu tiên đọc**: Đọc kỹ, ~90–120 phút — đây là nền accessibility dùng xuyên suốt các lab sau.
**Sections**:
- 3.1 Defining our user interface
- 3.2 The ultimate responsive design
- 3.3 Web metadata
  - 3.3.1 Title
  - 3.3.2 Web app manifest
  - 3.3.3 Icons
  - 3.3.4 Theme color
  - 3.3.5 Viewport definition
  - 3.3.6 Semantic metadata
  - 3.3.7 Putting the metadata together
- 3.4 Semantic HTML
  - 3.4.1 Using the Right Element
  - 3.4.2 Avoiding divitis and other problems
  - 3.4.3 Semantic attributes
- 3.5 Accessibility
  - 3.5.1 Landmarks
  - 3.5.2 Forms
  - 3.5.3 Keyboard Navigation
  - 3.5.4 ARIA Roles
  - 3.5.5 ARIA states and properties
  - 3.5.6 Color and contrast
  - 3.5.7 Interactive elements
  - 3.5.8 Screen readers
- 3.6 Media resources
  - 3.6.1 Image formats
  - 3.6.2 Video formats
  - 3.6.3 AR formats
- 3.7 Rich web UI controls
  - 3.7.1 Summaries
  - 3.7.2 Accordions
  - 3.7.3 Modal dialogs
  - 3.7.4 Carousels
  - 3.7.5 Popovers
  - 3.7.6 Rich selectors
  - 3.7.7 Other UI controls
- 3.8 Beyond basic UI
  - 3.8.1 Using canvas
  - 3.8.2 Using UI-related APIs
- 3.9 Summary

## Chương 4 — Vanilla CSS
**Tóm tắt**: CSS hiện đại thay thế Sass/PostCSS/CSS-in-JS: `@layer` để tránh chiến tranh specificity, custom properties, container queries, nested selector, pseudo-selector mới (`:has()`...), layout Flexbox/Grid, và animation (transition, keyframe, page transition, scroll-driven animation).
**Ưu tiên đọc**: Đọc kỹ nếu CSS chưa vững gần đây, ~60–90 phút. Nếu đã quen `@layer`/container queries có thể lướt 4.1 và tập trung 4.3 (scroll-driven animations còn mới với nhiều người).
**Sections**:
- 4.1 Maintainable and modular CSS
  - 4.1.1 Cascade Layers
  - 4.1.2 Custom properties (variables)
  - 4.1.3 Container queries and units
  - 4.1.4 Nested selectors
  - 4.1.5 New pseudo-selectors
  - 4.1.6 Modern CSS units
- 4.2 Modern Layout
  - 4.2.1 1D layout with Flexbox
  - 4.2.2 2D layout with grids
- 4.3 Animations
  - 4.3.1 Transitions
  - 4.3.2 Keyframe animations
  - 4.3.3 Page transitions
  - 4.3.4 Scroll-driven animations
- 4.4 Summary

## Chương 5 — Vanilla JavaScript
**Tóm tắt**: JS hiện đại không cần Babel/TypeScript-transpile cho hầu hết use case: ESM đầy đủ (import maps, top-level await, lazy loading, JSON modules), cú pháp mới (optional chaining, logical assignment, private fields, error cause), collection (Set/Map/WeakMap), functional programming thuần, và quản lý lỗi bài bản (try/catch, error objects, async errors, global handlers).
**Ưu tiên đọc**: Đọc kỹ, ~90–120 phút — chương dài nhất về ngôn ngữ, nền tảng cho mọi lab từ chương 6 trở đi. Phần 5.5 (ESM) và 5.9 (Error Management) là hai phần dễ bị bỏ qua nhưng quan trọng nhất.
**Sections**:
- 5.1 Versioning
- 5.2 Latest additions to the language
  - 5.2.1 ESNext
- 5.3 Using a transpiler
- 5.4 Using polyfills
- 5.5 ECMAScript Modules
  - 5.5.1 Named exports
  - 5.5.2 Importing modules
  - 5.5.3 Import Maps
  - 5.5.4 Top-level await
  - 5.5.5 Preloading and execution order
  - 5.5.6 Lazy loading
  - 5.5.7 Error handling and timeouts for dynamic imports
  - 5.5.8 Import attributes and JSON modules
  - 5.5.9 Re-exports and module organization
  - 5.5.10 Caching, single evaluation, and side effects
  - 5.5.11 Practical rules of thumb
- 5.6 Modern JavaScript Essentials
  - 5.6.1 Optional chaining and nullish coalescing
  - 5.6.2 Logical assignment operators
  - 5.6.3 Destructuring + rest/spread in practice
  - 5.6.4 Classes with public & private fields
  - 5.6.5 Cleaner errors: optional catch binding and error cause
  - 5.6.6 Small quality-of-life wins
- 5.7 Collection Management
  - 5.7.1 Arrays
  - 5.7.2 Sets
  - 5.7.3 Maps
  - 5.7.4 Weak collections: memory-friendly
- 5.8 Functional Programming
  - 5.8.1 Array transformations
  - 5.8.2 Pure functions and immutability
  - 5.8.3 Function composition
  - 5.8.4 Everyday benefits
- 5.9 Error Management
  - 5.9.1 Exceptions and try/catch
  - 5.9.2 Error objects
  - 5.9.3 Asynchronous errors
  - 5.9.4 Global handlers
  - 5.9.5 Practical guidance for error management
- 5.10 Summary

## Chương 6 — The document object model API
**Tóm tắt**: DOM API "sạch" — truy vấn, duyệt cây, tạo/sửa phần tử, phân biệt property vs attribute, `dataset`, style, event — làm nền trực tiếp cho Web Components ở chương 7.
**Ưu tiên đọc**: Đọc kỹ nếu chưa thao tác DOM thuần nhiều, ~45–60 phút.
**Sections**:
- 6.1 The DOM tree
- 6.2 The API
  - 6.2.1 HTMLElement interface
  - 6.2.2 Global DOM objects
  - 6.2.3 Working with different documents
  - 6.2.4 Querying the document
  - 6.2.5 Browsing the tree
  - 6.2.6 Elements available
  - 6.2.7 Modifying elements
  - 6.2.8 Properties vs. attributes
  - 6.2.9 Creating elements
  - 6.2.10 Element arrangement
  - 6.2.11 Custom properties with dataset
  - 6.2.12 Working with styles
  - 6.2.13 Working with events
- 6.3 Browser Web APIs
- 6.4 Summary

## Chương 7 — Web components
**Tóm tắt**: Trái tim của cuốn sách. Custom Elements API, Shadow DOM, tham số hóa component (attribute vs property, boolean attribute, observed attributes), sự kiện, và kết nối CSS giữa page DOM và shadow DOM qua custom properties. Kết thúc bằng lab xây `<star-rating>` component hoàn chỉnh.
**Ưu tiên đọc**: Đọc kỹ nhất, code theo từng ví dụ, ~3–4 giờ (chương dài nhất, 13 section).
**Sections**:
- 7.1 The component design pattern
- 7.2 Use cases
- 7.3 Advantages
- 7.4 Challenges
- 7.5 Vanilla web components
  - 7.5.1 Architecture
  - 7.5.2 The puzzle
  - 7.5.3 Abilities
- 7.6 Custom Elements API
  - 7.6.1 Creation
  - 7.6.2 Rendering content
  - 7.6.3 Registration
  - 7.6.4 Simplifying the syntax
  - 7.6.5 The Custom Element Registry
- 7.7 Our first component
- 7.8 Shadow DOM
  - 7.8.1 Creation
  - 7.8.2 Styles with the page DOM
  - 7.8.3 Styles with Shadow DOM
  - 7.8.4 Styling web components
- 7.9 Element parameterization
  - 7.9.1 data-* vs standard attributes
  - 7.9.2 Boolean attributes
  - 7.9.3 Update the component while observing attributes
  - 7.9.4 Update the component observing properties
- 7.10 Creating a rating component
- 7.11 Working with events
- 7.12 Connecting the page DOM and shadow DOM with CSS
  - 7.12.1 Read custom properties for theming
  - 7.12.2 Expose custom properties for parametrization
  - 7.12.3 Expose elements to the page DOM
  - 7.12.4 Read state from the page DOM
- 7.13 Summary

## Chương 8 — Working with templates and slots
**Tóm tắt**: `<template>` để clone nội dung hiệu quả, template trong web component (inline, external HTML, external CSS), render dữ liệu động (tự viết template engine hoặc dùng thư viện cộng đồng), và toàn bộ hệ Slots API (fallback content, flattened tree, `::slotted()`, `slotchange`, nested slots) — kết thúc bằng ví dụ Tab Component thực chiến.
**Ưu tiên đọc**: Đọc kỹ, code theo, ~2–3 giờ.
**Sections**:
- 8.1 The Template Content HTML Element
  - 8.1.1 Usage
  - 8.1.2 The Need for Cloning Templates
  - 8.1.3 Advantages
- 8.2 Using Templates in Web Components
  - 8.2.1 Defining a Template in the HTML document
  - 8.2.2 Using external HTML files
  - 8.2.3 Loading external CSS stylesheets
- 8.3 Rendering Dynamic Data in Templates
  - 8.3.1 Creating a Custom Template Engine
  - 8.3.2 Using Community Template Engines
- 8.4 Using Slots
  - 8.4.1 Fallback Content
  - 8.4.2 Full example
  - 8.4.3 The Flattened Tree
  - 8.4.4 Multiple Elements in One Slot
- 8.5 Styling Slotted Content
  - 8.5.1 The ::slotted() pseudo-Element
  - 8.5.2 Styling Strategies
- 8.6 Slots API
  - 8.6.1 The slotchange Event
  - 8.6.2 assignedNodes and assignedElements
  - 8.6.3 Practical Example: Tab Component
  - 8.6.4 Finding a Slot's Assigned Slot
- 8.7 Nested Slots
- 8.8 Slot Best Practices
- 8.9 Summary

## Chương 9 — Advanced web components
**Tóm tắt**: Nâng cao — `ElementInternals` (form participation, validation, custom form control), lifecycle đầy đủ (`adoptedCallback`, form-associated lifecycle, cleanup), accessibility nâng cao (ARIA qua ElementInternals, focus/keyboard trong shadow DOM), Custom State Set (`:state()`), Declarative Shadow DOM (SSR-friendly), test web component, và tích hợp/deploy (wrap cho React/Angular/Vue, publish npm, CDN build).
**Ưu tiên đọc**: Đọc kỹ, ~2.5–3 giờ — chương thực chiến nhất về "sản xuất" component thật.
**Sections**:
- 9.1 Element internals
  - 9.1.1 Form participation
  - 9.1.2 Validation methods
  - 9.1.3 Accessing form and labels
- 9.2 Web components lifecycle
  - 9.2.1 Basic lifecycle flow
  - 9.2.2 The adoptedCallback() in practice
  - 9.2.3 Form-associated lifecycle
  - 9.2.4 Restoring form state after navigation
  - 9.2.5 Cleanup in disconnectedCallback()
  - 9.2.6 Waiting for element registration
  - 9.2.7 Styling undefined elements with :defined
- 9.3 Advanced accessibility for web components
  - 9.3.1 ARIA via ElementInternals
  - 9.3.2 Common ARIA properties
  - 9.3.3 Building an accessible toggle
- 9.4 Focus and keyboard management
  - 9.4.1 Delegating focus into shadow DOM
  - 9.4.2 Managing focus programmatically
  - 9.4.3 Keyboard interaction patterns
- 9.5 Custom state set
  - 9.5.1 The states property
  - 9.5.2 The :state() pseudo-class
  - 9.5.3 Building a stateful component
- 9.6 Declarative Shadow DOM
  - 9.6.1 Basic syntax
  - 9.6.2 When to use Declarative Shadow DOM
  - 9.6.3 Hydrating a declarative shadow root
  - 9.6.4 Using CSS with DSD before hydration
  - 9.6.5 DSD configuration attributes
  - 9.6.6 Resource loading in declarative shadow roots
- 9.7 Testing web components
  - 9.7.1 A simple browser-based test page
  - 9.7.2 Testing shadow DOM and slots
  - 9.7.3 Testing form-associated components
  - 9.7.4 Visual regression testing
- 9.8 Library integration
  - 9.8.1 Using web components in frameworks
  - 9.8.2 Wrapping React components as web components
  - 9.8.3 Wrapping Angular components as web components
  - 9.8.4 Wrapping Vue components as web components
- 9.9 Deploying web components
  - 9.9.1 Shipping a standalone ES module
  - 9.9.2 Publishing as an npm package
  - 9.9.3 Offering a CDN-friendly build
  - 9.9.4 Bundling and transpiling
  - 9.9.5 Distribution checklist
- 9.10 Summary

## Chương 10 — Navigation
**Tóm tắt**: Lý thuyết routing trên web trước khi tự viết router — friendly URL, route shape, Navigation API (`event.signal`, form submission interception, observing completion), và route matching bằng `URLPattern`.
**Ưu tiên đọc**: Đọc kỹ, ~60–90 phút — chuẩn bị trực tiếp cho chương 11.
**Sections**:
- 10.1 Navigation and routing on the Web
  - 10.1.1 Discoverability, accessibility, and graceful degradation
  - 10.1.2 Native navigation
  - 10.1.3 Client-side router
  - 10.1.4 Navigation and routing definitions
  - 10.1.5 Friendly URLs
  - 10.1.6 Real URLs
  - 10.1.7 Real links
  - 10.1.8 URL parts
  - 10.1.9 Route
  - 10.1.10 Canonical route shapes
  - 10.1.11 Route state
- 10.2 The server
- 10.3 Navigation interception
  - 10.3.1 Navigation entry list
  - 10.3.2 The Navigation API
  - 10.3.3 Cancellation with event.signal
  - 10.3.4 Form submissions
  - 10.3.5 Observing completion
  - 10.3.6 History API fallback
- 10.4 Route matching
  - 10.4.1 Simple matching
  - 10.4.2 Matching routes with URLPattern
  - 10.4.3 Testing the matcher
- 10.5 Summary

## Chương 11 — Building a router
**Tóm tắt**: Tự viết router vanilla thật sự — outlet/master page, title/metadata, focus/scroll restoration, route guard, View Transitions API cho chuyển route mượt (kể cả cross-document), rồi build router 2 lần (function-based, sau đó class-based) và router dựa trên web component.
**Ưu tiên đọc**: Đọc kỹ, code theo toàn bộ 2 phiên bản router, ~2.5–3 giờ — đây là lab lớn nhất của sách.
**Sections**:
- 11.1 Rendering routes
  - 11.1.1 Outlet and master pages
  - 11.1.2 Using DOM APIs
  - 11.1.3 Title and metadata
  - 11.1.4 Active navigation and focus
  - 11.1.5 Scroll restoration
  - 11.1.6 Using web components
  - 11.1.7 Route guards
  - 11.1.8 Not found and route errors
- 11.2 Navigating to new routes
- 11.3 View transitions for route change
  - 11.3.1 View Transitions API
  - 11.3.2 Cross-document view transitions
  - 11.3.3 Motion and accessibility
- 11.4 Building a tiny Vanilla router
  - 11.4.1 First pass: a function-based router
  - 11.4.2 Second pass: a class-based router
  - 11.4.3 Using the router for a tab view
- 11.5 Building a web component-based router
- 11.6 Summary

## Chương 12 — Working with data
**Tóm tắt**: HTTP hiện đại (`fetch`, `AbortController`, streaming response, upload/download progress), WebSocket, chiến lược cache dữ liệu remote, và toàn bộ hệ lưu trữ trình duyệt (Web Storage, IndexedDB, Cache Storage, File System Access/OPFS) kèm quota và debugging.
**Ưu tiên đọc**: Đọc kỹ, ~90–120 phút — nền cho lab lưu trữ offline.
**Sections**:
- 12.1 Working with HTTP
  - 12.1.1 Basic usage
  - 12.1.2 Sending data
  - 12.1.3 Credentials and cookies
  - 12.1.4 Headers and response parsing
  - 12.1.5 AbortController and stale requests
  - 12.1.6 Request lifecycle
  - 12.1.7 Streaming responses
  - 12.1.8 Uploads, downloads, and progress
- 12.2 Working with WebSockets
- 12.3 Remote data and local caches
- 12.4 Data persistence
  - 12.4.1 Where browser storage lives
  - 12.4.2 Choosing a storage API
  - 12.4.3 Quotas and persistence
  - 12.4.4 Web Storage
  - 12.4.5 IndexedDB
  - 12.4.6 Cache Storage
  - 12.4.7 File systems
  - 12.4.8 Debugging and maintenance
- 12.5 Summary

## Chương 13 — Data binding and reactivity
**Tóm tắt**: Tái tạo phần "phản ứng" (reactivity) của framework mà không cần framework — direct DOM binding, derived binding, render qua `queueMicrotask()`, binding qua `data-*`/template string/`<template>`, `EventTarget` làm store, `Proxy`, và mở rộng bằng thư viện signal siêu nhẹ. Kết bằng state management pattern và validate dữ liệu.
**Ưu tiên đọc**: Đọc kỹ, code theo, ~90–120 phút — đây chính là mô hình mà app tracker này (`src/state/storage.ts` + observer renderer) đang áp dụng, nên đối chiếu trực tiếp với `architecture_guide.md` Pattern 3.
**Sections**:
- 13.1 Reactive thinking
- 13.2 Data binding techniques
  - 13.2.1 Direct DOM binding
  - 13.2.2 Derived bindings
  - 13.2.3 A render function with queueMicrotask()
  - 13.2.4 Binding through data-* attributes
  - 13.2.5 Binding with template strings
  - 13.2.6 Binding with `<template>`
  - 13.2.7 EventTarget stores
  - 13.2.8 Proxy
  - 13.2.9 Signals through a micro-library
  - 13.2.10 Choosing a binding pattern
- 13.3 State management
  - 13.3.1 Design patterns
- 13.4 Data validation
- 13.5 Summary

## Chương 14 — Beyond basics *(TBD — chưa xuất bản mục lục chi tiết)*
**Tóm tắt**: Manning chưa công bố cấu trúc section cho chương này (early access). Dự đoán hợp lý từ tiêu đề: các chủ đề nâng cao còn lại chưa nằm ở chương 1–13 (có thể: WebAssembly, Web Workers, Service Worker nâng cao, testing chiến lược end-to-end, performance profiling). **Không tick section nào ở đây cho tới khi cập nhật `book_data_model_guide.md`.**

## Chương 15 — Building an app *(TBD — chưa xuất bản mục lục chi tiết)*
**Tóm tắt**: Dự kiến là chương tổng hợp — ráp toàn bộ kỹ thuật chương 1–14 (kể cả 14) thành một ứng dụng vanilla hoàn chỉnh. Chưa có mục lục chi tiết. Khi Manning phát hành, cập nhật `book_data_model_guide.md` trước, sau đó file này.
