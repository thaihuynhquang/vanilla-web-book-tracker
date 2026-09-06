import type { Chapter, Lab, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { LAB_META } from "./shared/labMeta";
import { GLOSSARY_VI } from "./glossary/vi";
import { RESOURCES } from "./shared/resources";
import { FLASHCARD_TASKS } from "./shared/flashcards";

const CHAPTER_SUMMARIES_VI: Record<number, string> = {
  1: "Giới thiệu triết lý \"Vanilla Web\" là gì và không phải là gì — không phải quay lại thời kỳ jQuery, mà là dùng thẳng nền tảng web hiện đại thay vì kéo theo React/Vue cho mọi dự án. Đọc để hiểu vì sao cuốn sách tồn tại trước khi học cách làm.",
  2: "Bức tranh toàn cảnh nền tảng web — rendering engine, giao thức mạng, bảo mật, kiến trúc ứng dụng, và vì sao Vanilla Web tận dụng được hiệu năng/khả năng truy cập/khả năng phân phối tốt hơn stack nặng framework. Có phần về PWA (installability, offline, storage, i18n, Capabilities API, AI phía client).",
  3: "Xây UI đúng chuẩn nền tảng — metadata (manifest, theme-color, viewport), HTML semantic (tránh \"divitis\"), accessibility đầy đủ (landmarks, forms, keyboard, ARIA, contrast, screen reader), rồi tới các control UI có sẵn của trình duyệt (details, dialog, popover, carousel CSS-only).",
  4: "CSS hiện đại thay thế Sass/PostCSS/CSS-in-JS: @layer để tránh chiến tranh specificity, custom properties, container queries, nested selector, pseudo-selector mới (:has()...), layout Flexbox/Grid, và animation (transition, keyframe, page transition, scroll-driven animation).",
  5: "JS hiện đại không cần Babel/TypeScript-transpile cho hầu hết use case: ESM đầy đủ (import maps, top-level await, lazy loading, JSON modules), cú pháp mới (optional chaining, logical assignment, private fields, error cause), collection (Set/Map/WeakMap), functional programming thuần, và quản lý lỗi bài bản.",
  6: "DOM API \"sạch\" — truy vấn, duyệt cây, tạo/sửa phần tử, phân biệt property vs attribute, dataset, style, event — làm nền trực tiếp cho Web Components ở chương 7.",
  7: "Trái tim của cuốn sách. Custom Elements API, Shadow DOM, tham số hóa component (attribute vs property, boolean attribute, observed attributes), sự kiện, và kết nối CSS giữa page DOM và shadow DOM qua custom properties. Kết thúc bằng lab xây <star-rating> component hoàn chỉnh.",
  8: "<template> để clone nội dung hiệu quả, template trong web component (inline, external HTML, external CSS), render dữ liệu động, và toàn bộ hệ Slots API (fallback content, flattened tree, ::slotted(), slotchange, nested slots) — kết thúc bằng ví dụ Tab Component thực chiến.",
  9: "Nâng cao — ElementInternals (form participation, validation, custom form control), lifecycle đầy đủ (adoptedCallback, form-associated lifecycle, cleanup), accessibility nâng cao, Custom State Set (:state()), Declarative Shadow DOM (SSR-friendly), test web component, và tích hợp/deploy.",
  10: "Lý thuyết routing trên web trước khi tự viết router — friendly URL, route shape, Navigation API (event.signal, form submission interception, observing completion), và route matching bằng URLPattern.",
  11: "Tự viết router vanilla thật sự — outlet/master page, title/metadata, focus/scroll restoration, route guard, View Transitions API cho chuyển route mượt (kể cả cross-document), rồi build router 2 lần (function-based, sau đó class-based) và router dựa trên web component.",
  12: "HTTP hiện đại (fetch, AbortController, streaming response, upload/download progress), WebSocket, chiến lược cache dữ liệu remote, và toàn bộ hệ lưu trữ trình duyệt (Web Storage, IndexedDB, Cache Storage, File System Access/OPFS) kèm quota và debugging.",
  13: "Tái tạo phần \"phản ứng\" (reactivity) của framework mà không cần framework — direct DOM binding, derived binding, render qua queueMicrotask(), binding qua data-*/template string/<template>, EventTarget làm store, Proxy, và mở rộng bằng thư viện signal siêu nhẹ.",
  14: "Manning chưa công bố cấu trúc section cho chương này (early access). Không tick section nào ở đây cho tới khi cập nhật book_data_model_guide.md.",
  15: "Dự kiến là chương tổng hợp — ráp toàn bộ kỹ thuật chương 1–14 thành một ứng dụng vanilla hoàn chỉnh. Chưa có mục lục chi tiết.",
};

const LAB_CONTENT_VI: Record<string, { title: string; goal: string; requirements: string[]; acceptanceCriteria: string[] }> = {
  "lab-ch-1": {
    title: "Micro trang landing \"no-framework\"",
    goal: "Chứng minh một trang tĩnh không cần bundler/framework vẫn chạy mượt.",
    requirements: ["1 file index.html + 1 file CSS + 1 file JS module, mở trực tiếp bằng file:// hoặc python -m http.server, không build step."],
    acceptanceCriteria: [
      "Trang render đúng không qua bước build nào.",
      "JS dùng <script type=\"module\">, không global leak ra window.",
      "Ghi 3 dòng nhận xét: tình huống nào project thật sự cần framework, tình huống nào không.",
    ],
  },
  "lab-ch-2": {
    title: "Bảng kiểm PWA tối thiểu",
    goal: "Áp dụng khái niệm \"modern web app\" (2.4) vào một trang có sẵn.",
    requirements: ["Thêm manifest.json, theme-color, service worker cache-first tối thiểu cho 1 trang tĩnh."],
    acceptanceCriteria: [
      "Lighthouse PWA check pass mục \"Installable\".",
      "Trang load được ở chế độ offline (DevTools → Offline) sau lần load đầu.",
    ],
  },
  "lab-ch-3": {
    title: "Trang semantic đạt a11y 100",
    goal: "Viết lại 1 trang từ \"div soup\" thành semantic HTML + ARIA đúng chuẩn.",
    requirements: ["Dùng landmark (header/nav/main/footer), 1 form có label đầy đủ, 1 modal dùng <dialog>, kiểm tra điều hướng bàn phím toàn trang."],
    acceptanceCriteria: [
      "Lighthouse Accessibility = 100.",
      "Tab qua toàn bộ phần tử tương tác theo đúng thứ tự logic, không bẫy focus ngoài ý muốn.",
      "<dialog> đóng được bằng phím Esc và có focus trap khi mở.",
    ],
  },
  "lab-ch-4": {
    title: "Layout responsive bằng @layer + container query",
    goal: "Xây layout card-grid tự co giãn theo kích thước container (không phải viewport).",
    requirements: ["@layer reset, base, components, utilities;, container query đổi số cột grid, 1 scroll-driven animation (ví dụ progress bar theo scroll)."],
    acceptanceCriteria: [
      "Grid đổi số cột khi container cha đổi kích thước, không cần media query.",
      "Không có CSS nào nằm ngoài layer nào (mọi rule đều thuộc 1 trong 4 layer).",
      "Scroll-driven animation chạy bằng animation-timeline: scroll(), không dùng JS scroll listener.",
    ],
  },
  "lab-ch-5": {
    title: "Thư viện hàm thuần + xử lý lỗi",
    goal: "Viết một module tiện ích nhỏ (ví dụ: format tiền tệ, debounce, group-by) theo phong cách functional, không transpile.",
    requirements: ["Named exports qua ESM, dùng optional chaining/nullish coalescing, ít nhất 1 hàm dùng Object.groupBy hoặc tương đương ESNext, error dùng Error với cause."],
    acceptanceCriteria: [
      "Chạy thẳng trên trình duyệt hiện đại không cần Babel/tsc build.",
      "Mọi hàm export đều pure (không side effect, cùng input → cùng output).",
      "Có ít nhất 1 test case throw lỗi và bắt bằng try/catch, in ra error.cause.",
    ],
  },
  "lab-ch-6": {
    title: "DOM builder không dùng innerHTML",
    goal: "Dựng một danh sách động 100% bằng DOM API thuần (createElement, dataset, classList) để hiểu chi phí/lợi ích so với template string.",
    requirements: ["Render 20 item từ mảng dữ liệu, mỗi item có data-id, click để toggle class active, dùng addEventListener với event delegation ở container cha."],
    acceptanceCriteria: [
      "Không dùng innerHTML hay insertAdjacentHTML ở bất kỳ đâu.",
      "Chỉ 1 event listener gắn ở container (event delegation), không gắn listener riêng cho từng item.",
      "dataset dùng để lưu id, không dùng thuộc tính DOM tuỳ biến khác.",
    ],
  },
  "lab-ch-7": {
    title: "<star-rating> Web Component",
    goal: "Xây component đánh giá sao hoàn chỉnh — đúng như ví dụ trọng tâm của chương.",
    requirements: ["Shadow DOM, observed attribute value + max, property value đồng bộ 2 chiều với attribute, custom event rating-change khi người dùng click sao, CSS custom property --star-color để theme từ ngoài vào."],
    acceptanceCriteria: [
      "Đổi value bằng JS (el.value = 3) cập nhật UI ngay, không cần re-render toàn trang.",
      "Đổi attribute bằng HTML (value=\"4\") cũng phản ánh đúng.",
      "rating-change bubble ra ngoài Shadow DOM, event.detail.value đúng giá trị mới.",
      "Component nhận --star-color từ CSS trang cha mà không cần ::part().",
    ],
  },
  "lab-ch-8": {
    title: "Tab Component dùng <template> + Slots",
    goal: "Xây <tab-group>/<tab-panel> dùng template nội bộ và named slots.",
    requirements: ["Slot mặc định cho nội dung mỗi tab, slotchange để phát hiện tab mới thêm động, style riêng phần slotted content bằng ::slotted()."],
    acceptanceCriteria: [
      "Thêm một <tab-panel> mới bằng JS sau khi component đã mount vẫn được component nhận diện qua slotchange.",
      "::slotted(p) áp dụng đúng style chỉ cho thẻ <p> được slot vào, không ảnh hưởng phần tử khác.",
      "Có fallback content khi slot rỗng.",
    ],
  },
  "lab-ch-9": {
    title: "Toggle Switch form-associated",
    goal: "Xây <toggle-switch> tham gia được vào <form> như một input thật.",
    requirements: ["static formAssociated = true, dùng ElementInternals để set giá trị form, custom state qua states + :state(checked) trong CSS, hỗ trợ điều hướng bàn phím (Space để toggle)."],
    acceptanceCriteria: [
      "form.elements nhận diện được <toggle-switch> như một control có name/value.",
      "formResetCallback() reset đúng trạng thái khi form reset.",
      "CSS :state(checked) đổi style mà không cần thêm class thủ công.",
      "Điều hướng và kích hoạt được hoàn toàn bằng bàn phím, có role/ARIA đúng qua ElementInternals.ariaChecked.",
    ],
  },
  "lab-ch-10": {
    title: "Route matcher với URLPattern",
    goal: "Viết hàm matchRoute(pattern, url) thuần, chưa cần render UI, để hiểu route matching trước khi build router thật ở lab 11.",
    requirements: ["Hỗ trợ path params (/books/:id), wildcard, và test với ít nhất 6 URL khác nhau (khớp/không khớp)."],
    acceptanceCriteria: [
      "Dùng URLPattern (không tự viết regex thủ công).",
      "Trả về đúng object params khi khớp, null khi không khớp.",
      "Có test case cho query string bị bỏ qua đúng cách khi so khớp path.",
    ],
  },
  "lab-ch-11": {
    title: "Router vanilla mini có View Transitions",
    goal: "Lab lớn nhất — ghép route matcher (lab 10) thành router thật, điều hướng SPA có animation chuyển trang mượt.",
    requirements: ["Tối thiểu 3 route, outlet render qua web component, history.pushState/Navigation API để intercept điều hướng, bọc việc render trong document.startViewTransition(), xử lý route not-found."],
    acceptanceCriteria: [
      "Click link nội bộ không reload trang, URL vẫn đổi đúng và Back/Forward hoạt động.",
      "Chuyển route có hiệu ứng transition mượt, tôn trọng prefers-reduced-motion (tắt animation khi user bật).",
      "Route không khớp hiển thị trang 404 riêng, không crash app.",
      "Title <title> cập nhật đúng theo route đang active.",
    ],
  },
  "lab-ch-12": {
    title: "Lớp lưu trữ offline-first (IndexedDB + Cache Storage)",
    goal: "Xây một lớp data-access nhỏ lưu danh sách item vào IndexedDB, fetch qua HTTP có AbortController, và cache response tĩnh qua Cache Storage.",
    requirements: ["CRUD cơ bản trên 1 object store IndexedDB, huỷ được request đang chạy khi user điều hướng đi nơi khác, kiểm tra quota trước khi ghi lớn."],
    acceptanceCriteria: [
      "Đóng/mở lại tab, dữ liệu vẫn còn trong IndexedDB.",
      "Gọi AbortController.abort() khi component unmount hủy đúng request đang pending, không log lỗi console thừa.",
      "Cache Storage phục vụ được asset khi offline (test qua DevTools Offline).",
    ],
  },
  "lab-ch-13": {
    title: "Store reactive bằng Proxy + queueMicrotask",
    goal: "Tự viết một \"mini state store\" phản ứng, không dùng thư viện — mô hình chính app tracker này đang dùng.",
    requirements: ["Proxy bọc object state, mọi set trigger 1 lần render duy nhất dù nhiều field đổi liên tiếp (gộp qua queueMicrotask), có derived value tính lại tự động."],
    acceptanceCriteria: [
      "Đổi 5 field liên tiếp trong cùng 1 tick chỉ gọi hàm render 1 lần (không phải 5 lần).",
      "Derived value luôn khớp với state gốc sau khi render.",
      "So sánh bằng văn bản ngắn: điểm giống/khác giữa store này và src/state/storage.ts + renderer.ts trong architecture_guide.md.",
    ],
  },
  "lab-ch-14": {
    title: "TBD (chưa xuất bản)",
    goal: "Chương 14 chưa có mục lục chi tiết từ Manning nên chưa thể thiết kế lab cụ thể.",
    requirements: [],
    acceptanceCriteria: [],
  },
  "lab-ch-15": {
    title: "TBD (chưa xuất bản)",
    goal: "Dự kiến đây là lab tổng hợp (\"Building an app\") — có thể ghép Lab 7–13 thành 1 ứng dụng hoàn chỉnh, nhưng chưa chốt cho tới khi có mục lục chi tiết.",
    requirements: [],
    acceptanceCriteria: [],
  },
};

const QUIT_CRITERIA_VI: Record<string, { stopSignal: string; exitCriteria: string }> = {
  "ch-1": {
    stopSignal: "Nếu đã hiểu triết lý \"vanilla vs framework\" sau 15 phút, dừng đọc chi tiết — chương này không có gì để \"code theo\".",
    exitCriteria: "Giải thích được bằng lời của mình: khi nào chọn vanilla, khi nào chọn framework.",
  },
  "ch-2": {
    stopSignal: "Nếu đã biết rendering engine/HTTP/PWA cơ bản, lướt nhanh phần 2.1–2.3, chỉ đọc kỹ 2.4 (Modern web apps).",
    exitCriteria: "Kể tên được 5 khả năng PWA (installability, offline, storage, i18n, capabilities) không cần mở sách.",
  },
  "ch-3": {
    stopSignal: "Nếu Lighthouse a11y đã 100 mà vẫn cố đọc thêm 3.7–3.8 vì \"sợ thiếu\", dừng — đã đạt mục tiêu chương.",
    exitCriteria: "Lab 3 đạt Lighthouse Accessibility = 100.",
  },
  "ch-4": {
    stopSignal: "Nếu đã dùng @layer/container query thành thạo trong công việc, lướt 4.1, tập trung 4.3 (phần mới nhất với hầu hết người đọc).",
    exitCriteria: "Lab 4 chạy container query đổi cột không cần media query.",
  },
  "ch-5": {
    stopSignal: "Nếu mắc kẹt ở 5.5 (ESM) quá 2 giờ, tạm skip phần Import Maps nâng cao (5.5.8–5.5.10), quay lại sau khi có ví dụ thực tế từ chương 7+.",
    exitCriteria: "Lab 5 chạy được thẳng trên trình duyệt, không cần Babel/tsc.",
  },
  "ch-6": {
    stopSignal: "Nếu đã thao tác DOM thuần quen tay, lướt 6.2, dừng lại đọc kỹ đúng phần chưa biết (dataset, ResizeObserver).",
    exitCriteria: "Lab 6 không dùng innerHTML ở bất kỳ đâu.",
  },
  "ch-7": {
    stopSignal: "Nếu Lab 7 (<star-rating>) quá 4 giờ vẫn chưa xong 2 tiêu chí đầu, bỏ tiêu chí CSS theming (--star-color), tick lab ở mức tối thiểu, tiếp tục chương 8.",
    exitCriteria: "Component tự đổi UI khi set value bằng JS hoặc bằng attribute (không bắt buộc cả hai hoàn hảo để coi là \"đủ\").",
  },
  "ch-8": {
    stopSignal: "Nếu slotchange gây confusion quá lâu, bỏ qua yêu cầu \"thêm tab động bằng JS\" trong Lab 8, chỉ làm slot tĩnh.",
    exitCriteria: "Tab component hiển thị đúng nội dung slot cho ít nhất 2 tab tĩnh.",
  },
  "ch-9": {
    stopSignal: "Nếu ElementInternals/Declarative Shadow DOM (9.1, 9.6) quá khó, đọc lướt lý thuyết, tập trung code Lab 9 (form-associated) — đây là phần thực dụng nhất chương.",
    exitCriteria: "<toggle-switch> tham gia được vào form.elements, kể cả nếu :state() chưa hoàn hảo.",
  },
  "ch-10": {
    stopSignal: "Nếu lý thuyết route shape (10.1) quá trừu tượng, chuyển thẳng sang Lab 10 (code trước, lý thuyết ngấm dần).",
    exitCriteria: "Lab 10: matchRoute() trả đúng params cho ít nhất 4/6 URL test.",
  },
  "ch-11": {
    stopSignal: "Nếu Lab 11 vượt quá 2x thời gian dự kiến, bỏ View Transitions, chỉ giữ router điều hướng + outlet cơ bản.",
    exitCriteria: "Router điều hướng đúng 3 route, Back/Forward hoạt động — animation là \"nice to have\".",
  },
  "ch-12": {
    stopSignal: "Nếu IndexedDB (12.4.5) quá cồng kềnh, tạm dùng localStorage cho Lab 12, ghi chú \"cần quay lại IndexedDB\".",
    exitCriteria: "Lớp lưu trữ CRUD hoạt động bằng bất kỳ storage API nào (không bắt buộc đúng IndexedDB để coi là đủ).",
  },
  "ch-13": {
    stopSignal: "Nếu Proxy gây khó hiểu, đọc kỹ 13.2.8 riêng lẻ trước khi ghép vào Lab 13, không cố hiểu toàn bộ chương cùng lúc.",
    exitCriteria: "Lab 13: đổi 5 field liên tiếp chỉ trigger 1 lần render.",
  },
  "ch-14": {
    stopSignal: "Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể, chỉ theo dõi khi Manning phát hành.",
    exitCriteria: "Chưa xác định — cập nhật khi có mục lục chi tiết.",
  },
  "ch-15": {
    stopSignal: "Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể.",
    exitCriteria: "Chưa xác định — cập nhật khi có mục lục chi tiết.",
  },
};

export function getChaptersVi(): Chapter[] {
  return CHAPTER_META.map((meta) => ({
    id: meta.id,
    num: meta.num,
    title: meta.title,
    summary: CHAPTER_SUMMARIES_VI[meta.num],
    tbd: meta.tbd,
    sections: SECTIONS_BY_CHAPTER[meta.num],
    labId: meta.labId,
    flashcardId: meta.flashcardId,
    glossaryRefs: meta.glossaryRefs,
  }));
}

export function getLabsVi(): Lab[] {
  return LAB_META.map((meta) => {
    const content = LAB_CONTENT_VI[meta.id];
    return {
      id: meta.id,
      chapterId: meta.chapterId,
      title: content.title,
      goal: content.goal,
      requirements: content.requirements,
      acceptanceCriteria: content.acceptanceCriteria,
      apisUsed: meta.apisUsed,
      tbd: meta.tbd,
    };
  });
}

export function getQuitCriteriaVi(): QuitCriteriaRow[] {
  return CHAPTER_META.map((meta) => ({
    id: `qc-${meta.id}`,
    chapterId: meta.id,
    stopSignal: QUIT_CRITERIA_VI[meta.id].stopSignal,
    exitCriteria: QUIT_CRITERIA_VI[meta.id].exitCriteria,
  }));
}

export function getGlossaryVi(): GlossaryTerm[] {
  return GLOSSARY_VI;
}

export function getResourcesVi(): Resource[] {
  return RESOURCES;
}

export function getFlashcardTasksVi(): FlashcardTask[] {
  return FLASHCARD_TASKS;
}
