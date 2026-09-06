import type { QuitCriteriaText } from "../../types/appState";

export const QUIT_CRITERIA_VI: Record<string, QuitCriteriaText> = {
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
