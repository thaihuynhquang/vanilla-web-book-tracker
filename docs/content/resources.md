# THƯ VIỆN TÀI NGUYÊN — VANILLA WEB

Nguồn nội dung cho `Resource[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Nhóm theo chương, mỗi resource có `type` (`mdn` | `spec` | `article` | `video` | `demo` | `tool`). Đây là tài liệu **đọc thêm/tra cứu sâu** — API glossary ngắn gọn nằm ở `glossary.md`, còn đây là các bài viết dài, spec gốc, demo trực quan.

> Sách gốc: [Vanilla Web (Manning)](https://www.manning.com/books/vanilla-web) — liveBook đọc trực tuyến khi mua sách.

---

### Chương 1–2 — Nền tảng & triết lý
- 📖 **Article**: [The cost of frameworks](https://tonsky.me/blog/js-vm-perf/) — bàn về chi phí hiệu năng khi kéo theo framework không cần thiết.
- 📖 **Docs**: [web.dev — Learn](https://web.dev/learn) — lộ trình chính thức của Google về nền tảng web hiện đại.
- 🛠️ **Tool**: [caniuse.com](https://caniuse.com/) — tra cứu độ hỗ trợ trình duyệt cho mọi API trong sách.
- 📖 **Article**: [web.dev — Progressive Web Apps](https://web.dev/explore/progressive-web-apps) — tổng quan PWA, dùng cho phần 2.4.

---

### Chương 3 — The user interface
- 📖 **MDN**: [Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- 📖 **MDN**: [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
- 📖 **Spec**: [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) — pattern chuẩn cho mọi widget UI (accordion, dialog, tab...).
- 🎮 **Demo**: [open-props.style](https://open-props.style/) — thư viện token CSS tham khảo, không phải để copy nguyên nhưng hữu ích để so sánh cách đặt token.
- 📹 **Video**: [Kevin Powell — Accessibility playlist (YouTube)](https://www.youtube.com/@KevinPowell) — kênh CSS/accessibility uy tín, miễn phí.

---

### Chương 4 — Vanilla CSS
- 📖 **MDN**: [CSS cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- 📖 **MDN**: [CSS containment: Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- 📖 **Article**: [web.dev — Scroll-driven animations](https://web.dev/articles/scroll-driven-animations)
- 🎮 **Demo**: [scroll-driven-animations.style](https://scroll-driven-animations.style/) — bộ demo trực quan chính thức của Chrome DevRel.
- 📖 **Spec**: [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)

---

### Chương 5 — Vanilla JavaScript
- 📖 **MDN**: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- 📖 **Article**: [web.dev — Import maps](https://web.dev/articles/import-maps)
- 📖 **Docs**: [TC39 proposals](https://github.com/tc39/proposals) — theo dõi tính năng ESNext nào đã "Stage 4" (chính thức).
- 📹 **Video**: [Fireship — Modern JS in 100 seconds series (YouTube)](https://www.youtube.com/@Fireship) — tóm tắt nhanh từng tính năng.

---

### Chương 6 — The document object model API
- 📖 **MDN**: [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- 📖 **MDN**: [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- 📖 **Article**: [web.dev — Efficiently rendering large lists](https://web.dev/articles/virtualize-long-lists-react-window) — dù ví dụ dùng React, nguyên lý virtualization áp dụng được cho DOM thuần.

---

### Chương 7–9 — Web Components (nền tảng, template/slots, nâng cao)
- 📖 **MDN**: [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- 📖 **Spec**: [WHATWG DOM — Shadow tree](https://dom.spec.whatwg.org/#shadow-trees)
- 📖 **Article**: [web.dev — Building components](https://web.dev/learn/html/web-components) tại `web.dev/learn`.
- 🎮 **Demo**: [webcomponents.dev](https://webcomponents.dev/) — playground thử component trực tiếp trên trình duyệt.
- 📖 **Article**: [web.dev — More capable form controls (ElementInternals)](https://web.dev/articles/more-capable-form-controls)
- 📹 **Video**: [Google Chrome Developers — Web Components (YouTube playlist)](https://www.youtube.com/@ChromeDevs)
- 🛠️ **Tool**: [Lit](https://lit.dev/) — không dùng trong lab (sách hướng vanilla), nhưng đáng đọc docs để hiểu điều gì một thư viện component "giải quyết hộ" bạn.

---

### Chương 10–11 — Navigation & Building a router
- 📖 **MDN**: [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)
- 📖 **MDN**: [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API)
- 📖 **Article**: [web.dev — Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api)
- 📖 **Article**: [web.dev — View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/)
- 🎮 **Demo**: [View Transitions demos (Chrome DevRel)](https://http203-playlist.netlify.app/) — loạt demo chuyển trang mượt.

---

### Chương 12 — Working with data
- 📖 **MDN**: [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- 📖 **MDN**: [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- 📖 **MDN**: [Using the Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- 📖 **Article**: [web.dev — Storage for the web](https://web.dev/articles/storage-for-the-web)
- 📖 **Article**: [web.dev — Streams](https://web.dev/articles/streams)

---

### Chương 13 — Data binding and reactivity
- 📖 **MDN**: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- 📖 **Docs**: [TC39 Signals proposal](https://github.com/tc39/proposal-signals)
- 📖 **Article**: [web.dev — Build reactive components without a framework](https://web.dev/articles/state-management) *(nếu link đổi, tìm bằng từ khóa "vanilla JS reactivity web.dev")*.

---

### Chương 14–15 — TBD
Chưa có tài nguyên riêng — chưa xuất bản mục lục chi tiết. Khi cập nhật, thêm resource cụ thể theo đúng chủ đề section mới.
