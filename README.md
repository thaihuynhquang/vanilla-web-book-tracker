# Vanilla Web Book Tracker

> 🇻🇳 Bộ tài liệu blueprint (docs-only) để dựng một Interactive Web Tracker theo dõi tiến độ đọc & thực hành cuốn sách [*Vanilla Web*](https://www.manning.com/books/vanilla-web) (Manning). **Repo này hiện chưa có code app** — chỉ có đặc tả kỹ thuật đầy đủ để một AI agent hoặc developer dựng app từ đầu.
>
> 🇬🇧 A docs-only blueprint for building an Interactive Web Tracker that follows reading and hands-on progress through the book [*Vanilla Web*](https://www.manning.com/books/vanilla-web) (Manning). **No app code exists in this repo yet** — only a complete technical spec so an AI agent or developer can build the app from scratch.

## Trạng thái / Status

📋 **Docs-only** — chưa code. Đọc `docs/guides/book_data_model_guide.md` trước tiên, đây là hợp đồng dữ liệu mà mọi guide/content khác tham chiếu.

📋 **Docs-only** — no code yet. Read `docs/guides/book_data_model_guide.md` first — it's the data contract every other guide/content file references.

## Kiến trúc dự kiến / Planned architecture

Vanilla TypeScript + native Custom Elements (Light DOM) + layered vanilla CSS + `localStorage`, deploy qua GitHub Pages — cùng kiến trúc với dự án chị em [Applied AI Engineer Roadmap 2026 Tracker](https://github.com/thaihuynhquang/applied-ai-engineer-roadmap-2026-vn), chỉ khác nội dung theo dõi (sách 15 chương thay vì lộ trình học AI).

## Bản đồ tài liệu / Documentation map

### `docs/guides/` — kỹ thuật, dựng app
| File | Nội dung |
| :--- | :--- |
| [book_data_model_guide.md](docs/guides/book_data_model_guide.md) | **Đọc trước tiên.** Schema TypeScript, quy ước id, bảng ánh xạ 15 chương / 95 section. |
| [architecture_guide.md](docs/guides/architecture_guide.md) | Kiến trúc tổng thể, tech stack, design patterns, blueprint 8 bước. |
| [project_structure.md](docs/guides/project_structure.md) | Cây thư mục đầy đủ, trách nhiệm từng file. |
| [interactive_components_guide.md](docs/guides/interactive_components_guide.md) | PRD/UX — 6 tab, state contract, acceptance criteria. |
| [ui_system_design_guide.md](docs/guides/ui_system_design_guide.md) | Design tokens, CSS `@layer`, icon dictionary. |
| [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md) | CI/CD GitHub Actions → GitHub Pages. |

### `docs/content/` — nội dung sách
| File | Nội dung |
| :--- | :--- |
| [chapters.md](docs/content/chapters.md) | Bản đồ 15 chương: tóm tắt, section/sub-section, thời gian đọc, thứ tự ưu tiên. |
| [labs.md](docs/content/labs.md) | 15 lab thực hành, một lab/chương, kèm acceptance criteria. |
| [flashcards_guide.md](docs/content/flashcards_guide.md) | Quy trình tạo flashcard bằng Gemini/NotebookLM sau mỗi chương. |
| [glossary.md](docs/content/glossary.md) | ~60 thuật ngữ Web API theo chương, link MDN. |
| [resources.md](docs/content/resources.md) | Tài liệu đọc thêm: spec, article, video, demo — theo chương. |
| [quit_criteria_guide.md](docs/content/quit_criteria_guide.md) | Ma trận dừng/skip + exit criteria cho từng chương. |

## Mô hình tiến độ / Progress model

```
Overall % = Read % × 0.4 + Hands-on % × 0.4 + Chapter deliverables % (lab + flashcard) × 0.2
```

Pomodoro sessions được theo dõi và hiển thị trên Dashboard nhưng **không** tính vào công thức trên.

## Bước tiếp theo / Next step

Giao `docs/` cho một AI agent hoặc tự code theo blueprint để dựng `src/` — bắt đầu từ Step 1 trong [architecture_guide.md](docs/guides/architecture_guide.md#5-step-by-step-blueprint-for-ai-agents).
