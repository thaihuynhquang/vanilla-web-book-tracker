# THƯ VIỆN TÀI NGUYÊN — VANILLA WEB

Nguồn nội dung cho `Resource[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Mỗi resource có `id` dạng `res-ch-{num}-{index}` (index đếm lại từ 1 trong mỗi chương) và `type` (`mdn` | `spec` | `article` | `video` | `demo` | `tool`). Đây là tài liệu **đọc thêm/tra cứu sâu** — API glossary ngắn gọn nằm ở `glossary.md`, còn đây là các bài viết dài, spec gốc, demo trực quan.

> Sách gốc: [Vanilla Web (Manning)](https://www.manning.com/books/vanilla-web) — liveBook đọc trực tuyến khi mua sách.

---

### Chương 1 — Hello Vanilla Web

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-1-1 | article | The cost of frameworks | https://tonsky.me/blog/js-vm-perf/ | Chi phí hiệu năng khi kéo theo framework không cần thiết. |
| res-ch-1-2 | article | web.dev — Learn | https://web.dev/learn | Lộ trình chính thức của Google về nền tảng web hiện đại. |

---

### Chương 2 — Understanding the web platform

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-2-1 | tool | caniuse.com | https://caniuse.com/ | Tra cứu độ hỗ trợ trình duyệt cho mọi API trong sách. |
| res-ch-2-2 | article | web.dev — Progressive Web Apps | https://web.dev/explore/progressive-web-apps | Tổng quan PWA, dùng cho phần 2.4. |

---

### Chương 3 — The user interface

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-3-1 | mdn | Web app manifests | https://developer.mozilla.org/en-US/docs/Web/Manifest | |
| res-ch-3-2 | mdn | HTML: A good basis for accessibility | https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML | |
| res-ch-3-3 | spec | WAI-ARIA Authoring Practices Guide (APG) | https://www.w3.org/WAI/ARIA/apg/ | Pattern chuẩn cho mọi widget UI (accordion, dialog, tab...). |
| res-ch-3-4 | demo | open-props.style | https://open-props.style/ | Thư viện token CSS tham khảo, hữu ích để so sánh cách đặt token. |
| res-ch-3-5 | video | Kevin Powell — Accessibility playlist (YouTube) | https://www.youtube.com/@KevinPowell | Kênh CSS/accessibility uy tín, miễn phí. |

---

### Chương 4 — Vanilla CSS

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-4-1 | mdn | CSS cascade layers | https://developer.mozilla.org/en-US/docs/Web/CSS/@layer | |
| res-ch-4-2 | mdn | CSS containment: Container queries | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries | |
| res-ch-4-3 | article | web.dev — Scroll-driven animations | https://web.dev/articles/scroll-driven-animations | |
| res-ch-4-4 | demo | scroll-driven-animations.style | https://scroll-driven-animations.style/ | Bộ demo trực quan chính thức của Chrome DevRel. |
| res-ch-4-5 | spec | CSS Nesting Module | https://www.w3.org/TR/css-nesting-1/ | |

---

### Chương 5 — Vanilla JavaScript

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-5-1 | mdn | JavaScript modules | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules | |
| res-ch-5-2 | article | web.dev — Import maps | https://web.dev/articles/import-maps | |
| res-ch-5-3 | article | TC39 proposals | https://github.com/tc39/proposals | Theo dõi tính năng ESNext nào đã "Stage 4" (chính thức). |
| res-ch-5-4 | video | Fireship — Modern JS in 100 seconds series (YouTube) | https://www.youtube.com/@Fireship | Tóm tắt nhanh từng tính năng. |

---

### Chương 6 — The document object model API

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-6-1 | mdn | Document Object Model (DOM) | https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model | |
| res-ch-6-2 | mdn | Intersection Observer API | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API | |
| res-ch-6-3 | article | web.dev — Efficiently rendering large lists | https://web.dev/articles/virtualize-long-lists-react-window | Ví dụ dùng React, nhưng nguyên lý virtualization áp dụng được cho DOM thuần. |

---

### Chương 7 — Web components

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-7-1 | mdn | Web Components | https://developer.mozilla.org/en-US/docs/Web/API/Web_components | |
| res-ch-7-2 | spec | WHATWG DOM — Shadow tree | https://dom.spec.whatwg.org/#shadow-trees | |
| res-ch-7-3 | article | web.dev — Building components | https://web.dev/learn/html/web-components | Tại `web.dev/learn`. |
| res-ch-7-4 | demo | webcomponents.dev | https://webcomponents.dev/ | Playground thử component trực tiếp trên trình duyệt. |
| res-ch-7-5 | video | Google Chrome Developers — Web Components (YouTube playlist) | https://www.youtube.com/@ChromeDevs | |
| res-ch-7-6 | tool | Lit | https://lit.dev/ | Không dùng trong lab (sách hướng vanilla), nhưng đáng đọc docs để hiểu điều gì một thư viện component "giải quyết hộ" bạn. |

---

### Chương 9 — Advanced web components

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-9-1 | article | web.dev — More capable form controls (ElementInternals) | https://web.dev/articles/more-capable-form-controls | |

---

### Chương 10 — Navigation

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-10-1 | mdn | Navigation API | https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API | |
| res-ch-10-2 | mdn | URL Pattern API | https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API | |
| res-ch-10-3 | article | web.dev — Navigation API | https://developer.chrome.com/docs/web-platform/navigation-api | |

---

### Chương 11 — Building a router

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-11-1 | article | web.dev — View Transitions | https://developer.chrome.com/docs/web-platform/view-transitions/ | |
| res-ch-11-2 | demo | View Transitions demos (Chrome DevRel) | https://http203-playlist.netlify.app/ | Loạt demo chuyển trang mượt. |

---

### Chương 12 — Working with data

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-12-1 | mdn | Using Fetch | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch | |
| res-ch-12-2 | mdn | Using IndexedDB | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB | |
| res-ch-12-3 | mdn | Using the Cache API | https://developer.mozilla.org/en-US/docs/Web/API/Cache | |
| res-ch-12-4 | article | web.dev — Storage for the web | https://web.dev/articles/storage-for-the-web | |
| res-ch-12-5 | article | web.dev — Streams | https://web.dev/articles/streams | |

---

### Chương 13 — Data binding and reactivity

| id | type | Tiêu đề | URL | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| res-ch-13-1 | mdn | Proxy | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy | |
| res-ch-13-2 | spec | TC39 Signals proposal | https://github.com/tc39/proposal-signals | |
| res-ch-13-3 | article | web.dev — Build reactive components without a framework | https://web.dev/articles/state-management | Nếu link đổi, tìm bằng từ khóa "vanilla JS reactivity web.dev". |

---

### Chương 14–15 — TBD

Chưa có tài nguyên riêng — chưa xuất bản mục lục chi tiết. Khi cập nhật, thêm resource cụ thể theo đúng chủ đề section mới, tiếp tục đánh số `res-ch-14-1`, `res-ch-15-1`, ...

---

## Tổng số resource

41 resource: ch1=2, ch2=2, ch3=5, ch4=5, ch5=4, ch6=3, ch7=6, ch9=1, ch10=3, ch11=2, ch12=5, ch13=3.
