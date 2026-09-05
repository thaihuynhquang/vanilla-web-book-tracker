# LABS — 15 BÀI THỰC HÀNH THEO CHƯƠNG

Nguồn nội dung cho `Lab[]` trong `bookData.*.ts` (xem schema `Lab` ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Mỗi lab có `id = lab-ch-{n}`, độc lập với nhau — không bắt buộc phải làm theo router/store chung, dù lab chương 11 và 13 gợi ý ghép lại nếu muốn có một app demo liền mạch.

Mỗi lab đóng vai trò của trục **"chapter deliverables"** (20% trọng số) trong công thức tiến độ — chỉ có 1 checkbox "đã hoàn thành", không chia nhỏ acceptance criteria thành state riêng.

---

## Lab 1 — `lab-ch-1` — Micro trang landing "no-framework"
- **Mục tiêu**: Chứng minh một trang tĩnh không cần bundler/framework vẫn chạy mượt.
- **Yêu cầu**: 1 file `index.html` + 1 file CSS + 1 file JS module, mở trực tiếp bằng `file://` hoặc `python -m http.server`, không build step.
- **Acceptance criteria**:
  - [ ] Trang render đúng không qua bước build nào.
  - [ ] JS dùng `<script type="module">`, không global leak ra `window`.
  - [ ] Ghi 3 dòng nhận xét: tình huống nào project thật sự cần framework, tình huống nào không.
- **APIs dùng**: ES Modules.

## Lab 2 — `lab-ch-2` — Bảng kiểm PWA tối thiểu
- **Mục tiêu**: Áp dụng khái niệm "modern web app" (2.4) vào một trang có sẵn.
- **Yêu cầu**: Thêm `manifest.json`, theme-color, service worker cache-first tối thiểu cho 1 trang tĩnh.
- **Acceptance criteria**:
  - [ ] Lighthouse PWA check pass mục "Installable".
  - [ ] Trang load được ở chế độ offline (DevTools → Offline) sau lần load đầu.
- **APIs dùng**: Web App Manifest, Service Worker, Cache Storage.

## Lab 3 — `lab-ch-3` — Trang semantic đạt a11y 100
- **Mục tiêu**: Viết lại 1 trang từ "div soup" thành semantic HTML + ARIA đúng chuẩn.
- **Yêu cầu**: Dùng landmark (`header`/`nav`/`main`/`footer`), 1 form có label đầy đủ, 1 modal dùng `<dialog>`, kiểm tra điều hướng bàn phím toàn trang.
- **Acceptance criteria**:
  - [ ] Lighthouse Accessibility = 100.
  - [ ] Tab qua toàn bộ phần tử tương tác theo đúng thứ tự logic, không bẫy focus ngoài ý muốn.
  - [ ] `<dialog>` đóng được bằng phím Esc và có focus trap khi mở.
- **APIs dùng**: `<dialog>`, ARIA roles/states, `<details>`/`<summary>`.

## Lab 4 — `lab-ch-4` — Layout responsive bằng `@layer` + container query
- **Mục tiêu**: Xây layout card-grid tự co giãn theo kích thước container (không phải viewport).
- **Yêu cầu**: `@layer reset, base, components, utilities;`, container query đổi số cột grid, 1 scroll-driven animation (ví dụ progress bar theo scroll).
- **Acceptance criteria**:
  - [ ] Grid đổi số cột khi container cha đổi kích thước, không cần media query.
  - [ ] Không có CSS nào nằm ngoài layer nào (mọi rule đều thuộc 1 trong 4 layer).
  - [ ] Scroll-driven animation chạy bằng `animation-timeline: scroll()`, không dùng JS `scroll` listener.
- **APIs dùng**: Cascade Layers, Container Queries, Scroll-driven Animations.

## Lab 5 — `lab-ch-5` — Thư viện hàm thuần + xử lý lỗi
- **Mục tiêu**: Viết một module tiện ích nhỏ (ví dụ: format tiền tệ, debounce, group-by) theo phong cách functional, không transpile.
- **Yêu cầu**: Named exports qua ESM, dùng optional chaining/nullish coalescing, ít nhất 1 hàm dùng `Object.groupBy` hoặc tương đương ESNext, error dùng `Error` với `cause`.
- **Acceptance criteria**:
  - [ ] Chạy thẳng trên trình duyệt hiện đại không cần Babel/tsc build.
  - [ ] Mọi hàm export đều pure (không side effect, cùng input → cùng output).
  - [ ] Có ít nhất 1 test case throw lỗi và bắt bằng `try/catch`, in ra `error.cause`.
- **APIs dùng**: ESM, optional chaining, error cause.

## Lab 6 — `lab-ch-6` — DOM builder không dùng `innerHTML`
- **Mục tiêu**: Dựng một danh sách động 100% bằng DOM API thuần (`createElement`, `dataset`, `classList`) để hiểu chi phí/lợi ích so với template string.
- **Yêu cầu**: Render 20 item từ mảng dữ liệu, mỗi item có `data-id`, click để toggle class active, dùng `addEventListener` với event delegation ở container cha.
- **Acceptance criteria**:
  - [ ] Không dùng `innerHTML` hay `insertAdjacentHTML` ở bất kỳ đâu.
  - [ ] Chỉ 1 event listener gắn ở container (event delegation), không gắn listener riêng cho từng item.
  - [ ] `dataset` dùng để lưu id, không dùng thuộc tính DOM tuỳ biến khác.
- **APIs dùng**: DOM querying/creation, `dataset`, event delegation.

## Lab 7 — `lab-ch-7` — `<star-rating>` Web Component
- **Mục tiêu**: Xây component đánh giá sao hoàn chỉnh — đúng như ví dụ trọng tâm của chương.
- **Yêu cầu**: Shadow DOM, observed attribute `value` + `max`, property `value` đồng bộ 2 chiều với attribute, custom event `rating-change` khi người dùng click sao, CSS custom property `--star-color` để theme từ ngoài vào.
- **Acceptance criteria**:
  - [ ] Đổi `value` bằng JS (`el.value = 3`) cập nhật UI ngay, không cần re-render toàn trang.
  - [ ] Đổi attribute bằng HTML (`value="4"`) cũng phản ánh đúng.
  - [ ] `rating-change` bubble ra ngoài Shadow DOM, `event.detail.value` đúng giá trị mới.
  - [ ] Component nhận `--star-color` từ CSS trang cha mà không cần `::part()`.
- **APIs dùng**: Custom Elements, Shadow DOM, observedAttributes, CustomEvent, CSS custom properties xuyên shadow boundary.

## Lab 8 — `lab-ch-8` — Tab Component dùng `<template>` + Slots
- **Mục tiêu**: Xây `<tab-group>`/`<tab-panel>` dùng template nội bộ và named slots.
- **Yêu cầu**: Slot mặc định cho nội dung mỗi tab, `slotchange` để phát hiện tab mới thêm động, style riêng phần slotted content bằng `::slotted()`.
- **Acceptance criteria**:
  - [ ] Thêm một `<tab-panel>` mới bằng JS sau khi component đã mount vẫn được component nhận diện qua `slotchange`.
  - [ ] `::slotted(p)` áp dụng đúng style chỉ cho thẻ `<p>` được slot vào, không ảnh hưởng phần tử khác.
  - [ ] Có fallback content khi slot rỗng.
- **APIs dùng**: `<template>`, Slots API, `slotchange`, `::slotted()`.

## Lab 9 — `lab-ch-9` — Toggle Switch form-associated
- **Mục tiêu**: Xây `<toggle-switch>` tham gia được vào `<form>` như một input thật.
- **Yêu cầu**: `static formAssociated = true`, dùng `ElementInternals` để set giá trị form, custom state qua `states` + `:state(checked)` trong CSS, hỗ trợ điều hướng bàn phím (Space để toggle).
- **Acceptance criteria**:
  - [ ] `form.elements` nhận diện được `<toggle-switch>` như một control có `name`/`value`.
  - [ ] `formResetCallback()` reset đúng trạng thái khi form reset.
  - [ ] CSS `:state(checked)` đổi style mà không cần thêm class thủ công.
  - [ ] Điều hướng và kích hoạt được hoàn toàn bằng bàn phím, có `role`/ARIA đúng qua `ElementInternals.ariaChecked`.
- **APIs dùng**: `ElementInternals`, `formAssociated`, `CustomStateSet`, `:state()`.

## Lab 10 — `lab-ch-10` — Route matcher với `URLPattern`
- **Mục tiêu**: Viết hàm `matchRoute(pattern, url)` thuần, chưa cần render UI, để hiểu route matching trước khi build router thật ở lab 11.
- **Yêu cầu**: Hỗ trợ path params (`/books/:id`), wildcard, và test với ít nhất 6 URL khác nhau (khớp/không khớp).
- **Acceptance criteria**:
  - [ ] Dùng `URLPattern` (không tự viết regex thủ công).
  - [ ] Trả về đúng object params khi khớp, `null` khi không khớp.
  - [ ] Có test case cho query string bị bỏ qua đúng cách khi so khớp path.
- **APIs dùng**: `URLPattern`, Navigation API (đọc, chưa cần intercept).

## Lab 11 — `lab-ch-11` — Router vanilla mini có View Transitions
- **Mục tiêu**: Lab lớn nhất — ghép route matcher (lab 10) thành router thật, điều hướng SPA có animation chuyển trang mượt.
- **Yêu cầu**: Tối thiểu 3 route, outlet render qua web component, `history.pushState`/Navigation API để intercept điều hướng, bọc việc render trong `document.startViewTransition()`, xử lý route not-found.
- **Acceptance criteria**:
  - [ ] Click link nội bộ không reload trang, URL vẫn đổi đúng và Back/Forward hoạt động.
  - [ ] Chuyển route có hiệu ứng transition mượt, tôn trọng `prefers-reduced-motion` (tắt animation khi user bật).
  - [ ] Route không khớp hiển thị trang 404 riêng, không crash app.
  - [ ] Title `<title>` cập nhật đúng theo route đang active.
- **APIs dùng**: Navigation API, `URLPattern`, View Transitions API, History API fallback.

## Lab 12 — `lab-ch-12` — Lớp lưu trữ offline-first (IndexedDB + Cache Storage)
- **Mục tiêu**: Xây một lớp data-access nhỏ lưu danh sách item vào IndexedDB, fetch qua HTTP có `AbortController`, và cache response tĩnh qua Cache Storage.
- **Yêu cầu**: CRUD cơ bản trên 1 object store IndexedDB, huỷ được request đang chạy khi user điều hướng đi nơi khác, kiểm tra quota trước khi ghi lớn.
- **Acceptance criteria**:
  - [ ] Đóng/mở lại tab, dữ liệu vẫn còn trong IndexedDB.
  - [ ] Gọi `AbortController.abort()` khi component unmount hủy đúng request đang pending, không log lỗi console thừa.
  - [ ] Cache Storage phục vụ được asset khi offline (test qua DevTools Offline).
- **APIs dùng**: IndexedDB, Cache Storage, `fetch` + `AbortController`, Storage quota API.

## Lab 13 — `lab-ch-13` — Store reactive bằng `Proxy` + `queueMicrotask`
- **Mục tiêu**: Tự viết một "mini state store" phản ứng, không dùng thư viện — mô hình chính app tracker này đang dùng.
- **Yêu cầu**: `Proxy` bọc object state, mọi `set` trigger 1 lần render duy nhất dù nhiều field đổi liên tiếp (gộp qua `queueMicrotask`), có derived value tính lại tự động.
- **Acceptance criteria**:
  - [ ] Đổi 5 field liên tiếp trong cùng 1 tick chỉ gọi hàm render 1 lần (không phải 5 lần).
  - [ ] Derived value luôn khớp với state gốc sau khi render.
  - [ ] So sánh bằng văn bản ngắn: điểm giống/khác giữa store này và `src/state/storage.ts` + `renderer.ts` trong `architecture_guide.md`.
- **APIs dùng**: `Proxy`, `queueMicrotask`, `EventTarget` (tuỳ chọn cho pub/sub).

## Lab 14 — `lab-ch-14` — TBD *(chưa xuất bản)*
- **Trạng thái**: `tbd: true`. Chương 14 chưa có mục lục chi tiết từ Manning nên chưa thể thiết kế lab cụ thể.
- **Việc cần làm khi cập nhật**: sau khi `book_data_model_guide.md` có bảng section cho chương 14, quay lại đây viết lab thật theo đúng chủ đề chương công bố.

## Lab 15 — `lab-ch-15` — TBD *(chưa xuất bản)*
- **Trạng thái**: `tbd: true`. Dự kiến đây là lab tổng hợp ("Building an app") — có thể ghép Lab 7–13 thành 1 ứng dụng hoàn chỉnh, nhưng chưa chốt cho tới khi có mục lục chi tiết.
- **Việc cần làm khi cập nhật**: viết lab tổng hợp cụ thể, có thể tái dùng chính app tracker này làm case study "một app vanilla thật đã build ra sao".
