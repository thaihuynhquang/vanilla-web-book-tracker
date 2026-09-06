import type { LabContent } from "../../types/appState";

export const LAB_CONTENT_VI: Record<string, LabContent> = {
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
