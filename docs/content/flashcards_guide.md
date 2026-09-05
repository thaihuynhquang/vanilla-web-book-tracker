# FLASHCARDS — QUY TRÌNH ÔN TẬP BẰNG GEMINI / NOTEBOOKLM

Đây là **quy trình**, không phải kho dữ liệu flashcard. App chỉ lưu một checkbox mỗi chương (`fc-ch-{n}` — xem `book_data_model_guide.md`), xác nhận "đã tạo và đã ôn bộ flashcard của chương này". Nội dung thẻ (câu hỏi/đáp án) sống ở Gemini/NotebookLM, không đưa vào `localStorage`.

---

## 1. Vì sao không lưu nội dung thẻ trong app

- Tránh trùng lặp: NotebookLM/Gemini đã là nơi lưu, xuất, và ôn tập tốt hơn một custom flashcard UI tự viết.
- Tracker chỉ cần trả lời 1 câu: "chương này đã có bộ thẻ ôn chưa, đã ôn ít nhất 1 lần chưa" — đúng tinh thần nhẹ-nhàng-không-over-engineer của app.

## 2. Quy trình tạo bộ thẻ sau mỗi chương

1. **Đọc xong** toàn bộ section của 1 chương (tất cả checkbox `read` trong chương đã tick ở tab Chapters).
2. Copy nội dung chương (ảnh chụp trang sách, ghi chú tay, hoặc bản tóm tắt bạn tự viết) vào **NotebookLM** như 1 nguồn, hoặc dán trực tiếp vào **Gemini** (gemini.google.com) nếu chỉ cần nhanh.
3. Dùng prompt mẫu bên dưới để sinh bộ thẻ.
4. Ôn thử ngay tại chỗ (NotebookLM có chế độ Flashcards có sẵn; Gemini thì đọc qua và tự hỏi-đáp).
5. Tick `fc-ch-{n}` trong tab **Labs & Flashcards** của tracker.

## 3. Prompt mẫu (song ngữ)

### Prompt cho NotebookLM (dùng tính năng Studio → Flashcards có sẵn)
Chỉ cần add nguồn (PDF/ảnh/ghi chú chương) rồi bấm "Flashcards" trong Studio — NotebookLM tự sinh thẻ từ nguồn, không cần prompt tay.

### Prompt cho Gemini (khi không dùng NotebookLM)
```
Bạn là trợ lý ôn tập. Dựa trên nội dung chương sau đây của sách "Vanilla Web" (chương {số chương}: {tên chương}），
hãy tạo 10-15 flashcard ôn tập theo định dạng:

Q: <câu hỏi ngắn, tập trung vào khái niệm/API cụ thể>
A: <câu trả lời 1-3 câu, có ví dụ code ngắn nếu là API>

Yêu cầu:
- Ưu tiên câu hỏi kiểu "khi nào dùng X thay vì Y" hơn là định nghĩa suông.
- Ít nhất 3 câu hỏi có đoạn code ngắn để đọc/đoán kết quả.
- Câu hỏi bằng tiếng Việt, thuật ngữ kỹ thuật giữ nguyên tiếng Anh (Shadow DOM, ElementInternals...).

Nội dung chương:
<dán nội dung/ghi chú ở đây>
```

## 4. Tiêu chí "đạt" để tick `fc-ch-{n}`

- [ ] Bộ thẻ có ít nhất 10 câu cho chương thường, ít nhất 15 câu cho chương trọng tâm (7, 8, 9, 11, 12, 13).
- [ ] Đã ôn qua ít nhất 1 lượt toàn bộ thẻ (không cần đúng 100%, chỉ cần đã tự kiểm tra).
- [ ] Với chương có lab (`labs.md`), ít nhất 1 thẻ hỏi trực tiếp về API dùng trong lab đó — nối ôn tập với thực hành.

## 5. Gợi ý lịch ôn (spaced, không bắt buộc)

| Lần ôn | Khi nào |
| :--- | :--- |
| Lần 1 | Ngay sau khi tạo thẻ (cùng ngày đọc xong chương) |
| Lần 2 | +2 ngày |
| Lần 3 | +7 ngày |
| Lần 4 | Trước khi đọc chương có phụ thuộc trực tiếp (ví dụ: ôn lại thẻ chương 7 trước khi vào chương 9) |

App không track các lần ôn lại này — đây là gợi ý kỷ luật cá nhân, không phải state cần lưu.

## 6. Danh sách 15 task flashcard

| id | Chương |
| :--- | :--- |
| fc-ch-1 | Hello Vanilla Web |
| fc-ch-2 | Understanding the web platform |
| fc-ch-3 | The user interface |
| fc-ch-4 | Vanilla CSS |
| fc-ch-5 | Vanilla JavaScript |
| fc-ch-6 | The document object model API |
| fc-ch-7 | Web components |
| fc-ch-8 | Working with templates and slots |
| fc-ch-9 | Advanced web components |
| fc-ch-10 | Navigation |
| fc-ch-11 | Building a router |
| fc-ch-12 | Working with data |
| fc-ch-13 | Data binding and reactivity |
| fc-ch-14 | Beyond basics *(TBD — chưa xuất bản)* |
| fc-ch-15 | Building an app *(TBD — chưa xuất bản)* |
