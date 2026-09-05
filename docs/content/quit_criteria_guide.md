# QUIT CRITERIA — MA TRẬN DỪNG/SKIP & EXIT CRITERIA THEO CHƯƠNG

Nguồn nội dung cho `QuitCriteriaRow[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Đây là **một ma trận gộp**: mỗi chương có 2 cột — **Stop Signal** ("khi nào nên dừng/skip chương này") và **Exit Criteria** ("khi nào coi là đủ giỏi để đi tiếp, không cần đọc hết từng dòng").

---

## 1. Vì sao cần tiêu chí dừng khi đọc sách kỹ thuật

**Bẫy chi phí chìm (Sunk Cost Fallacy)** không chỉ xảy ra khi làm dự án — nó xảy ra ngay cả khi đọc sách: đọc đi đọc lại một đoạn khó (ví dụ Declarative Shadow DOM ở chương 9) vì "đã đọc 3 lần rồi, bỏ dở tiếc", thay vì chấp nhận ghi chú "chưa hiểu hết, quay lại sau" và đọc tiếp.

**Nguyên lý cầu chì tự ngắt**: đặt sẵn ngưỡng **trước khi đọc**, để khi chạm ngưỡng thì hành động dừng/skip diễn ra tự động, không phụ thuộc cảm xúc lúc đó.

## 2. Các điểm nghẽn dự kiến (Choke Points)

```
[Ch. 1-6: Nền tảng] ──► 🚨 CHOKE POINT 1 ──► 🚨 CHOKE POINT 2 ──► 🚨 CHOKE POINT 3
   (HTML/CSS/JS/DOM)      (Ch. 7-9: Web Components)   (Ch. 10-11: Router)   (Ch. 12-13: Data & Reactivity)
```

### 🚨 Choke Point 1 — Chương 7–9 (Web Components, 33 section)
- **Rủi ro sa lầy**: Shadow DOM + `ElementInternals` + Custom State Set là 3 khái niệm hoàn toàn mới với người quen framework — dễ bị kẹt hàng giờ ở lab `<toggle-switch>` form-associated (Lab 9).
- **Bẫy chi phí chìm**: Đọc lại chương 9 nhiều lần để "hiểu hết" `ElementInternals` trước khi cho phép bản thân sang chương 10, dù mục tiêu thực học chỉ là router.

### 🚨 Choke Point 2 — Chương 10–11 (Navigation & Router, 11 section)
- **Rủi ro sa lầy**: Lab 11 (router vanilla có View Transitions) là lab lớn nhất sách — dễ overbuild (thêm route guard phức tạp, nested route) vượt xa acceptance criteria đã định.
- **Bẫy chi phí chìm**: Cố hoàn thiện router "cho đẹp" thay vì chuyển sang chương 12 khi acceptance criteria tối thiểu đã đạt.

### 🚨 Choke Point 3 — Chương 12–13 (Data & Reactivity, 10 section)
- **Rủi ro sa lầy**: IndexedDB có API cồng kềnh (transaction, object store, index) — dễ nản và bỏ dở Lab 12.
- **Bẫy chi phí chìm**: Debug lỗi IndexedDB hàng giờ thay vì tạm dùng `localStorage` cho lab và ghi chú "IndexedDB cần quay lại".

## 3. Khung tiêu chí dừng chung (áp dụng mọi chương)

| Ngưỡng | Trigger | Hành động |
| :--- | :--- | :--- |
| **Thời gian đọc** | Đọc 1 section quá 150% thời gian ước lượng (`estMinutes`) mà vẫn chưa nắm được ý chính | Đánh dấu section "đã đọc" với ghi chú riêng (giấy/note app), đọc tiếp — quay lại sau khi có nhiều ngữ cảnh hơn từ chương sau |
| **Lab quá hạn** | Đã dùng gấp đôi thời gian dự kiến cho 1 lab mà chưa đạt MVP (chưa qua acceptance criteria đầu tiên) | Cắt giảm phạm vi lab xuống chỉ còn acceptance criteria đầu tiên, bỏ phần còn lại, tick lab hoàn thành ở mức tối thiểu |
| **Burnout** | 2 tuần liên tiếp không mở sách/app | Giảm mục tiêu xuống 1 section/ngày thay vì 1 chương/ngày, không tự trách |

## 4. Ma trận quyết định theo chương (15/15)

| id | Chương | Stop Signal (khi nào nên dừng/skip) | Exit Criteria (khi nào đủ giỏi để đi tiếp) |
| :--- | :--- | :--- | :--- |
| qc-ch-1 | 1. Hello Vanilla Web | Nếu đã hiểu triết lý "vanilla vs framework" sau 15 phút, dừng đọc chi tiết — chương này không có gì để "code theo". | Giải thích được bằng lời của mình: khi nào chọn vanilla, khi nào chọn framework. |
| qc-ch-2 | 2. Understanding the web platform | Nếu đã biết rendering engine/HTTP/PWA cơ bản, lướt nhanh phần 2.1–2.3, chỉ đọc kỹ 2.4 (Modern web apps). | Kể tên được 5 khả năng PWA (installability, offline, storage, i18n, capabilities) không cần mở sách. |
| qc-ch-3 | 3. The user interface | Nếu Lighthouse a11y đã 100 mà vẫn cố đọc thêm 3.7–3.8 vì "sợ thiếu", dừng — đã đạt mục tiêu chương. | Lab 3 đạt Lighthouse Accessibility = 100. |
| qc-ch-4 | 4. Vanilla CSS | Nếu đã dùng `@layer`/container query thành thạo trong công việc, lướt 4.1, tập trung 4.3 (phần mới nhất với hầu hết người đọc). | Lab 4 chạy container query đổi cột không cần media query. |
| qc-ch-5 | 5. Vanilla JavaScript | Nếu mắc kẹt ở 5.5 (ESM) quá 2 giờ, tạm skip phần Import Maps nâng cao (5.5.8–5.5.10), quay lại sau khi có ví dụ thực tế từ chương 7+. | Lab 5 chạy được thẳng trên trình duyệt, không cần Babel/tsc. |
| qc-ch-6 | 6. The document object model API | Nếu đã thao tác DOM thuần quen tay, lướt 6.2, dừng lại đọc kỹ đúng phần chưa biết (`dataset`, ResizeObserver). | Lab 6 không dùng `innerHTML` ở bất kỳ đâu. |
| qc-ch-7 | 7. Web components | Nếu Lab 7 (`<star-rating>`) quá 4 giờ vẫn chưa xong 2 tiêu chí đầu, bỏ tiêu chí CSS theming (`--star-color`), tick lab ở mức tối thiểu, tiếp tục chương 8. | Component tự đổi UI khi set `value` bằng JS **hoặc** bằng attribute (không bắt buộc cả hai hoàn hảo để coi là "đủ"). |
| qc-ch-8 | 8. Working with templates and slots | Nếu `slotchange` gây confusion quá lâu, bỏ qua yêu cầu "thêm tab động bằng JS" trong Lab 8, chỉ làm slot tĩnh. | Tab component hiển thị đúng nội dung slot cho ít nhất 2 tab tĩnh. |
| qc-ch-9 | 9. Advanced web components | Nếu `ElementInternals`/Declarative Shadow DOM (9.1, 9.6) quá khó, đọc lướt lý thuyết, tập trung code Lab 9 (form-associated) — đây là phần thực dụng nhất chương. | `<toggle-switch>` tham gia được vào `form.elements`, kể cả nếu `:state()` chưa hoàn hảo. |
| qc-ch-10 | 10. Navigation | Nếu lý thuyết route shape (10.1) quá trừu tượng, chuyển thẳng sang Lab 10 (code trước, lý thuyết ngấm dần). | Lab 10: `matchRoute()` trả đúng params cho ít nhất 4/6 URL test. |
| qc-ch-11 | 11. Building a router | Nếu Lab 11 vượt quá 2x thời gian dự kiến, bỏ View Transitions, chỉ giữ router điều hướng + outlet cơ bản. | Router điều hướng đúng 3 route, Back/Forward hoạt động — animation là "nice to have". |
| qc-ch-12 | 12. Working with data | Nếu IndexedDB (12.4.5) quá cồng kềnh, tạm dùng `localStorage` cho Lab 12, ghi chú "cần quay lại IndexedDB". | Lớp lưu trữ CRUD hoạt động bằng bất kỳ storage API nào (không bắt buộc đúng IndexedDB để coi là đủ). |
| qc-ch-13 | 13. Data binding and reactivity | Nếu `Proxy` gây khó hiểu, đọc kỹ 13.2.8 riêng lẻ trước khi ghép vào Lab 13, không cố hiểu toàn bộ chương cùng lúc. | Lab 13: đổi 5 field liên tiếp chỉ trigger 1 lần render. |
| qc-ch-14 | 14. Beyond basics *(TBD)* | Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể, chỉ theo dõi khi Manning phát hành. | Chưa xác định — cập nhật khi có mục lục chi tiết. |
| qc-ch-15 | 15. Building an app *(TBD)* | Chưa xuất bản — không áp dụng tiêu chí dừng cụ thể. | Chưa xác định — cập nhật khi có mục lục chi tiết. |

## 5. Quy trình tự đánh giá định kỳ

1. **Mỗi cuối tuần**: mở tab Quit Criteria, đọc lại 2–3 dòng của chương đang đọc dở.
2. Tự hỏi: đã chạm **Stop Signal** nào chưa? Nếu có → áp dụng hành động pivot ngay, không trì hoãn thêm 1 tuần.
3. Tự hỏi: đã đạt **Exit Criteria** chưa dù chưa đọc/code 100% nội dung? Nếu có → cho phép bản thân chuyển chương, quay lại phần còn thiếu sau khi đọc xong toàn sách (không cần tuyến tính tuyệt đối).
4. Ghi 1 dòng nhận xét ngắn (giấy hoặc note app, không cần lưu trong tracker) — mục đích là phản tư, không phải để "chấm điểm" bản thân.
