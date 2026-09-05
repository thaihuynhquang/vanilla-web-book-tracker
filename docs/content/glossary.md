# GLOSSARY — TỪ ĐIỂN WEB API THEO CHƯƠNG

Nguồn nội dung cho `GlossaryTerm[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Mỗi thuật ngữ có id dạng `api-{kebab-case}`, gắn với 1+ chương, mô tả ngắn tiếng Việt, và link MDN (spec link để trống — thêm khi cần đọc sâu WHATWG/W3C). ~60 mục, nhóm theo chương gần nhất giới thiệu API đó.

Mọi URL dưới đây dùng dạng chuẩn `developer.mozilla.org/en-US/docs/Web/...` — kiểm tra lại khi MDN đổi cấu trúc URL.

---

## Chương 1–2 — Hello Vanilla Web / Understanding the web platform

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-service-worker | Service Worker | Script chạy nền, chặn network request để làm offline support (2.4.2). | https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API |
| api-web-app-install | `beforeinstallprompt` / Installability | Sự kiện cho phép trang tự hiện nút "Cài đặt app" (2.4.1). | https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent |
| api-storage-manager | StorageManager (`navigator.storage`) | API kiểm tra quota và xin lưu trữ bền vững (persistent), liên quan Data Storage (2.4.3). | https://developer.mozilla.org/en-US/docs/Web/API/StorageManager |
| api-intl | `Intl` | Namespace chuẩn cho định dạng số/ngày/tiền tệ theo locale — nền tảng Internationalization (2.4.4). | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl |
| api-web-share | Web Share API | Gọi hộp thoại chia sẻ gốc của hệ điều hành — ví dụ tiêu biểu cho Capabilities API (2.4.5). | https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share |
| api-built-in-ai | Built-in AI APIs (Prompt/Translator/Language Detector) | Các API trình duyệt gọi model AI cục bộ, không cần gọi server — nền cho Client-side AI (2.4.6). | https://developer.mozilla.org/en-US/docs/Web/API/Translator_and_Language_Detector_APIs |

## Chương 3 — The user interface

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-web-app-manifest | Web App Manifest | File JSON khai báo tên, icon, theme-color để trang cài được như app. | https://developer.mozilla.org/en-US/docs/Web/Manifest |
| api-dialog-element | `<dialog>` | Phần tử modal/non-modal có sẵn, tự quản lý focus trap và phím Esc. | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog |
| api-details-summary | `<details>`/`<summary>` | Accordion/disclosure widget không cần JS. | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details |
| api-popover | Popover API | Thuộc tính `popover` biến bất kỳ phần tử nào thành lớp phủ top-layer, không cần z-index thủ công. | https://developer.mozilla.org/en-US/docs/Web/API/Popover_API |
| api-aria | ARIA Roles & States | Thuộc tính `role`, `aria-*` mô tả ngữ nghĩa cho assistive technology. | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA |
| api-canvas | Canvas API | Vẽ 2D/bitmap trực tiếp lên `<canvas>` bằng JS. | https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API |

## Chương 4 — Vanilla CSS

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-cascade-layers | Cascade Layers (`@layer`) | Nhóm CSS rule vào layer có thứ tự ưu tiên rõ ràng, tránh chiến tranh specificity. | https://developer.mozilla.org/en-US/docs/Web/CSS/@layer |
| api-css-custom-properties | CSS Custom Properties | Biến CSS (`--token`), đọc bằng `var()`, đổi runtime qua JS hoặc theme attribute. | https://developer.mozilla.org/en-US/docs/Web/CSS/--* |
| api-container-queries | Container Queries | `@container` — style theo kích thước phần tử cha, không phải viewport. | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries |
| api-has-selector | `:has()` | Pseudo-class "cha có con thỏa điều kiện X" — parent selector thật sự đầu tiên trong CSS thuần. | https://developer.mozilla.org/en-US/docs/Web/CSS/:has |
| api-css-nesting | Native CSS Nesting | Lồng selector trực tiếp trong CSS thuần, không cần Sass. | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting |
| api-view-transitions-css | View Transitions (CSS side) | `::view-transition-*` pseudo-elements điều khiển animation chuyển trạng thái/route. | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API |
| api-scroll-driven-animations | Scroll-driven Animations | `animation-timeline: scroll()`/`view()` — animation chạy theo vị trí cuộn, không cần JS scroll listener. | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations |

## Chương 5 — Vanilla JavaScript

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-import-maps | Import Maps | Ánh xạ bare specifier (`"lodash"`) sang URL thật trong trình duyệt, không cần bundler resolve module. | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap |
| api-top-level-await | Top-level await | Dùng `await` trực tiếp ở scope module, không cần bọc trong async function. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await |
| api-optional-chaining | Optional Chaining (`?.`) | Truy cập property/gọi hàm an toàn khi giá trị trung gian có thể `null`/`undefined`. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining |
| api-logical-assignment | Logical Assignment (`??=`, `||=`, `&&=`) | Gán giá trị có điều kiện gọn hơn `if` thủ công. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment |
| api-set | `Set` | Tập hợp giá trị duy nhất, thay thế mảng khi cần lookup/dedupe nhanh. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set |
| api-map | `Map` | Key-value map giữ thứ tự chèn, key có thể là bất kỳ kiểu nào (kể cả object). | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map |
| api-weakmap | `WeakMap`/`WeakSet` | Map/Set không giữ tham chiếu mạnh tới key — key object có thể bị garbage-collect. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap |
| api-error-cause | Error Cause | Thuộc tính `cause` trong `new Error(msg, { cause })` để chain nguyên nhân lỗi gốc. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause |

## Chương 6 — The document object model API

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-dataset | `dataset` | Đọc/ghi thuộc tính `data-*` qua object JS thay vì `getAttribute`. | https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset |
| api-resize-observer | ResizeObserver | Theo dõi thay đổi kích thước phần tử, nền tảng cho container queries phiên bản JS. | https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver |
| api-intersection-observer | IntersectionObserver | Phát hiện phần tử vào/ra viewport — dùng cho lazy-load, infinite scroll. | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API |
| api-mutation-observer | MutationObserver | Theo dõi thay đổi cấu trúc/attribute của DOM subtree. | https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver |

## Chương 7 — Web components

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-custom-elements | Custom Elements | `customElements.define()` đăng ký một thẻ HTML mới với lifecycle callback riêng. | https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements |
| api-shadow-dom | Shadow DOM | Cây DOM đóng gói riêng cho component, style không rò rỉ ra ngoài. | https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM |
| api-observed-attributes | `observedAttributes` / `attributeChangedCallback` | Khai báo attribute nào cần theo dõi và callback khi chúng đổi giá trị. | https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes |
| api-custom-events | CustomEvent | Sự kiện tự định nghĩa, mang dữ liệu qua `event.detail`, bubble ra ngoài Shadow DOM khi cần. | https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent |

## Chương 8 — Working with templates and slots

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-template-element | `<template>` | Nội dung HTML "trơ", không render cho tới khi được clone bằng JS. | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template |
| api-slots | Slots API | `<slot>` cho phép nội dung Light DOM "chiếu" vào vị trí trong Shadow DOM. | https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots |
| api-slotchange | `slotchange` event | Bắn khi nội dung được gán cho một slot thay đổi. | https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event |
| api-slotted-pseudo | `::slotted()` | Pseudo-element cho phép style nội dung slot vào từ bên trong Shadow DOM. | https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted |

## Chương 9 — Advanced web components

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-element-internals | `ElementInternals` | Cho custom element tham gia `<form>`, set giá trị/validity, và ARIA như một control gốc. | https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals |
| api-form-associated | Form-associated Custom Elements | `static formAssociated = true` + các `form*Callback` (reset, disabled, restore). | https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#form-associated_custom_elements |
| api-custom-state-set | CustomStateSet / `:state()` | Trạng thái tuỳ biến của component style được bằng CSS pseudo-class `:state(name)`. | https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet |
| api-declarative-shadow-dom | Declarative Shadow DOM | Khai báo Shadow DOM bằng HTML thuần (`<template shadowrootmode="open">`), phục vụ SSR. | https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#declaratively_with_html |
| api-defined-pseudo | `:defined` | Pseudo-class chọn phần tử đã được `customElements.define()` đăng ký (hoặc phần tử gốc). | https://developer.mozilla.org/en-US/docs/Web/CSS/:defined |

## Chương 10–11 — Navigation & Building a router

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-navigation-api | Navigation API | API điều hướng mới, thay History API, cho phép intercept mọi navigation kể cả back/forward. | https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API |
| api-urlpattern | `URLPattern` | So khớp URL theo pattern có path params, native, không cần thư viện regex route. | https://developer.mozilla.org/en-US/docs/Web/API/URLPattern |
| api-view-transitions-api | View Transitions API (JS side) | `document.startViewTransition()` bọc một thay đổi DOM để trình duyệt tự animate chuyển cảnh. | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API |
| api-history-api | History API | `pushState`/`popstate` — cơ chế điều hướng SPA cũ hơn, dùng làm fallback. | https://developer.mozilla.org/en-US/docs/Web/API/History_API |

## Chương 12 — Working with data

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-fetch | Fetch API | Gọi HTTP hiện đại thay `XMLHttpRequest`, hỗ trợ streaming và `AbortController`. | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |
| api-abort-controller | `AbortController` | Hủy một `fetch` hoặc tác vụ async đang chạy dở, tránh xử lý response đã lỗi thời. | https://developer.mozilla.org/en-US/docs/Web/API/AbortController |
| api-websocket | WebSocket | Kết nối 2 chiều, full-duplex, giữ liên tục — cho real-time data. | https://developer.mozilla.org/en-US/docs/Web/API/WebSocket |
| api-web-storage | Web Storage (`localStorage`/`sessionStorage`) | Lưu key-value string đồng bộ, giới hạn dung lượng nhỏ, chính là nơi app tracker này lưu tiến độ. | https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API |
| api-indexeddb | IndexedDB | Cơ sở dữ liệu NoSQL bất đồng bộ trong trình duyệt, phù hợp dữ liệu lớn/có cấu trúc. | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API |
| api-cache-storage | Cache Storage | Lưu cặp Request/Response, nền tảng cho offline-first qua Service Worker. | https://developer.mozilla.org/en-US/docs/Web/API/Cache |
| api-file-system-access | File System Access API / OPFS | Đọc/ghi file thật trên máy người dùng (có xin quyền) hoặc file ảo riêng-tư-cho-origin (OPFS). | https://developer.mozilla.org/en-US/docs/Web/API/File_System_API |
| api-streams | Streams API | Xử lý dữ liệu theo luồng (`ReadableStream`/`WritableStream`) thay vì đợi toàn bộ response. | https://developer.mozilla.org/en-US/docs/Web/API/Streams_API |

## Chương 13 — Data binding and reactivity

| id | Tên | Mô tả | MDN |
| :--- | :--- | :--- | :--- |
| api-proxy | `Proxy` | Bọc object để can thiệp `get`/`set`, nền tảng để tự viết reactivity không cần thư viện. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy |
| api-queuemicrotask | `queueMicrotask()` | Gộp nhiều lần đổi state trong cùng 1 tick thành 1 lần render duy nhất. | https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask |
| api-eventtarget | `EventTarget` | Base class cho pub/sub tự viết — bất kỳ object nào cũng có thể `dispatchEvent`/`addEventListener`. | https://developer.mozilla.org/en-US/docs/Web/API/EventTarget |
| api-signals-proposal | Signals (TC39 proposal / micro-libraries) | Mô hình reactivity dựa trên "tín hiệu" tự động theo dõi dependency, chưa phải chuẩn ổn định. | https://github.com/tc39/proposal-signals |

---

## Tổng số thuật ngữ

ch1-2=6, ch3=6, ch4=7, ch5=8, ch6=4, ch7=4, ch8=4, ch9=5, ch10-11=4, ch12=8, ch13=4 → **tổng 60 thuật ngữ**. Bổ sung dần khi làm lab thực tế gặp API mới chưa liệt kê ở đây (ví dụ ch.14/15 khi xuất bản).
