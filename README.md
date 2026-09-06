# Vanilla Web Book Tracker

> 🇻🇳 Interactive Web Tracker theo dõi tiến độ đọc & thực hành cuốn sách [*Vanilla Web*](https://www.manning.com/books/vanilla-web) (Manning). App đã được xây dựng theo blueprint trong `docs/` — xem bên dưới để chạy local hoặc deploy.
>
> 🇬🇧 An Interactive Web Tracker that follows reading and hands-on progress through the book [*Vanilla Web*](https://www.manning.com/books/vanilla-web) (Manning). The app is built to the blueprint in `docs/` — see below to run it locally or deploy it.

## Trạng thái / Status

✅ **Đã có code** — `src/` triển khai đầy đủ blueprint trong `docs/guides/`. Đọc `docs/guides/book_data_model_guide.md` trước tiên nếu bạn sửa nội dung sách, đây là hợp đồng dữ liệu mà mọi guide/content khác tham chiếu.

✅ **Built** — `src/` fully implements the blueprint in `docs/guides/`. Read `docs/guides/book_data_model_guide.md` first if you're editing book content — it's the data contract every other guide/content file references.

## Chạy local / Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run typecheck # tsc --noEmit only
```

Deploy tự động lên GitHub Pages qua `.github/workflows/deploy.yml` khi push lên `main` — xem [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md).

Automatically deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main` — see [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md).

## Kiến trúc / Architecture

Vanilla TypeScript + native Custom Elements (Light DOM) + layered vanilla CSS + `localStorage` — cùng kiến trúc với dự án chị em [Applied AI Engineer Roadmap 2026 Tracker](https://github.com/thaihuynhquang/applied-ai-engineer-roadmap-2026-vn), chỉ khác nội dung theo dõi (sách 15 chương thay vì lộ trình học AI). Chi tiết ở [architecture_guide.md](docs/guides/architecture_guide.md) và [project_structure.md](docs/guides/project_structure.md).

## Bản đồ tài liệu / Documentation map

### `docs/guides/` — kỹ thuật, dựng app
| File | Nội dung |
| :--- | :--- |
| [book_data_model_guide.md](docs/guides/book_data_model_guide.md) | **Đọc trước tiên.** Schema TypeScript, quy ước id, bảng ánh xạ 15 chương / 95 section. |
| [architecture_guide.md](docs/guides/architecture_guide.md) | Kiến trúc tổng thể, tech stack, design patterns, blueprint 8 bước. |
| [project_structure.md](docs/guides/project_structure.md) | Cây thư mục đầy đủ, trách nhiệm từng file. |
| [interactive_components_guide.md](docs/guides/interactive_components_guide.md) | PRD/UX — 7 tab, state contract, acceptance criteria. |
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

Pomodoro có tab riêng, sessions được theo dõi và tổng giờ tập trung hiển thị lại trên Dashboard, nhưng **không** tính vào công thức trên.

