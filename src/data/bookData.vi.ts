import type { Chapter, Lab, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { LAB_META } from "./shared/labMeta";
import { GLOSSARY_VI } from "./glossary/vi";
import { LAB_CONTENT_VI } from "./labs/vi";
import { QUIT_CRITERIA_VI } from "./quitCriteria/vi";
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
