# Vanilla Web Book Tracker

An Interactive Web Tracker that follows reading and hands-on progress through the book [*Vanilla Web*](https://www.manning.com/books/vanilla-web) (Manning). The app is built to the blueprint in `docs/` — see below to run it locally or deploy it.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run typecheck # tsc --noEmit only
```

Automatically deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main` — see [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md).

## Architecture

Vanilla TypeScript + native Custom Elements (Light DOM) + layered vanilla CSS + `localStorage`. Details in [architecture_guide.md](docs/guides/architecture_guide.md) and [project_structure.md](docs/guides/project_structure.md).

## Documentation map

### `docs/guides/` — technical, app build
| File | Contents |
| :--- | :--- |
| [book_data_model_guide.md](docs/guides/book_data_model_guide.md) | **Read first.** TypeScript schema, id conventions, 15-chapter / 95-section mapping table. |
| [architecture_guide.md](docs/guides/architecture_guide.md) | Overall architecture, tech stack, design patterns, 8-step blueprint. |
| [project_structure.md](docs/guides/project_structure.md) | Full directory tree, responsibility of each file. |
| [interactive_components_guide.md](docs/guides/interactive_components_guide.md) | PRD/UX — 7 tabs, state contract, acceptance criteria. |
| [ui_system_design_guide.md](docs/guides/ui_system_design_guide.md) | Design tokens, CSS `@layer`, icon dictionary. |
| [github_pages_deployment_guide.md](docs/guides/github_pages_deployment_guide.md) | CI/CD via GitHub Actions → GitHub Pages. |

### `docs/content/` — book content
| File | Contents |
| :--- | :--- |
| [chapters.md](docs/content/chapters.md) | Map of all 15 chapters: summary, sections/sub-sections, reading time, priority order. |
| [labs.md](docs/content/labs.md) | 15 hands-on labs, one per chapter, with acceptance criteria. |
| [flashcards_guide.md](docs/content/flashcards_guide.md) | Workflow for generating flashcards with Gemini/NotebookLM after each chapter. |
| [glossary.md](docs/content/glossary.md) | ~60 Web API terms by chapter, with MDN links. |
| [resources.md](docs/content/resources.md) | Further reading: specs, articles, videos, demos — by chapter. |
| [quit_criteria_guide.md](docs/content/quit_criteria_guide.md) | Stop/skip matrix and exit criteria for each chapter. |

## Progress model

```
Overall % = Read % × 0.4 + Hands-on % × 0.4 + Chapter deliverables % (lab + flashcard) × 0.2
```
