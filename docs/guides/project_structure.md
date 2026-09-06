# PROJECT DIRECTORY STRUCTURE

Detailed directory tree, file responsibilities, and module layout for the **Vanilla Web Book Tracker** app, as implemented in `src/`.

---

## 1. Overview Directory Tree

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build & deploy to GitHub Pages
├── docs/
│   ├── content/                    # Book content documents rendered/sourced by the app
│   │   ├── chapters.md             # 15-chapter map: summaries, sections, sub-sections, time estimates, reading order
│   │   ├── labs.md                 # 15 hands-on labs, one per chapter, with acceptance criteria
│   │   ├── flashcards_guide.md     # Gemini/NotebookLM flashcard generation workflow, per chapter
│   │   ├── glossary.md             # Web API glossary, ~60 terms, linked to chapters
│   │   ├── resources.md            # MDN/spec/article/video/demo links, grouped by chapter
│   │   └── quit_criteria_guide.md  # Stop-signal + exit-criteria matrix per chapter
│   └── guides/                     # Technical guides for building/maintaining the app
│       ├── architecture_guide.md
│       ├── book_data_model_guide.md
│       ├── project_structure.md    # This file
│       ├── ui_system_design_guide.md
│       ├── interactive_components_guide.md
│       └── github_pages_deployment_guide.md
├── public/
│   └── favicon.svg
├── src/
│   ├── actions/
│   │   └── backup.ts               # JSON export/import & progress reset handlers
│   ├── data/
│   │   ├── bookData.ts             # Facade: getChapters()/getMetaData()/getLabs()/getGlossary()/getResources()/getQuitCriteriaData(); dev-only id-set and content-count assertions
│   │   ├── bookData.vi.ts          # Vietnamese chapter summaries; composes shared/ + labs/ + quitCriteria/ into Chapter[]/Lab[]/QuitCriteriaRow[]
│   │   ├── bookData.en.ts          # English translations of the same prose - same ids/shape as bookData.vi.ts
│   │   ├── glossary/               # Per-locale glossary data - description is the only field that differs
│   │   │   ├── vi.ts               # GLOSSARY_VI: 60 GlossaryTerm objects, Vietnamese description
│   │   │   └── en.ts               # GLOSSARY_EN: 60 GlossaryTerm objects, same ids/names/urls, English description
│   │   ├── labs/                   # Per-locale lab prose - composed with shared/labMeta.ts for chapterId/apisUsed/tbd
│   │   │   ├── vi.ts               # LAB_CONTENT_VI: Record<labId, LabContent> - title/goal/requirements/acceptanceCriteria
│   │   │   └── en.ts               # LAB_CONTENT_EN: same keys, English prose
│   │   ├── quitCriteria/           # Per-locale quit-criteria prose - id/chapterId still derived from CHAPTER_META in bookData.*.ts
│   │   │   ├── vi.ts               # QUIT_CRITERIA_VI: Record<chapterId, QuitCriteriaText> - stopSignal/exitCriteria
│   │   │   └── en.ts               # QUIT_CRITERIA_EN: same keys, English prose
│   │   └── shared/                 # Language-independent structure - the single source of id parity between vi/en
│   │       ├── sections.ts         # SECTIONS_BY_CHAPTER: 95 Section objects (ids, nums, subsections, estMinutes)
│   │       ├── chapterMeta.ts      # CHAPTER_META: chapter id/num/title/tbd/labId/flashcardId/glossaryRefs
│   │       ├── labMeta.ts          # LAB_META: lab id/chapterId/apisUsed/tbd
│   │       ├── flashcards.ts       # FLASHCARD_TASKS: 15 FlashcardTask objects
│   │       └── resources.ts        # RESOURCES: 41 Resource objects (title is shared across locales, per the data model)
│   ├── i18n/
│   │   ├── strings.ts              # UI_STRINGS table, one flat key -> string map per language
│   │   ├── index.ts                # t(key, params) + plural(n, vi, enOne, enOther)
│   │   └── dom.ts                  # applyStaticTranslations() - data-i18n sweep for header markup
│   ├── state/
│   │   └── storage.ts              # AppState singleton, localStorage, read/handsOn/lab/flashcard toggles, Pomodoro logs
│   ├── styles/
│   │   ├── main.css
│   │   ├── _tokens.css              # Colors, spacing scale, typography scale, radius, shadow tokens
│   │   ├── _reset-base.css          # Includes prefers-reduced-motion guard
│   │   ├── _header.css
│   │   ├── _tabs.css
│   │   ├── _main-layout.css         # Shared primitives: .card, .stat-grid/.metric-card, .status-badge--dynamic, .tag, .item-row
│   │   ├── _views.css               # Chapter cards, dashboard chapter-progress-list, lab/glossary/resource/quit cards
│   │   ├── _pomodoro.css            # Pomodoro tab: hero card, ring, mode pills, history
│   │   └── _responsive.css
│   ├── types/
│   │   └── appState.ts             # Chapter, Section, SubSection, Lab, FlashcardTask, GlossaryTerm, Resource, QuitCriteriaRow, AppState
│   ├── utils/
│   │   ├── audio.ts                # Pomodoro chime via Web Audio API
│   │   ├── icons.ts                # SVG icon dictionary
│   │   ├── notification.ts         # Web Notification API
│   │   └── html.ts                 # escapeHtml() - required for any user-typed string interpolated into a view's HTML
│   ├── views/
│   │   ├── base.ts                   # BookView - shared connectedCallback/disconnectedCallback/render-listener lifecycle; skips refresh() while hidden
│   │   ├── helpers.ts                # chapterFilterChipsHtml(), searchHeaderHtml()/bindSearch() - shared chip-filter and search-input markup, binds without losing focus/caret
│   │   ├── index.ts                  # registers all <book-view-*> custom elements
│   │   ├── book-view-dashboard.ts    # <book-view-dashboard> - metric tiles, progress overview, next-focus card, per-chapter progress list
│   │   ├── book-view-chapters.ts     # <book-view-chapters> - 15 always-expanded chapter cards, section checklists, chapter filter chips, per-chapter flashcard row + lab card
│   │   ├── book-view-pomodoro.ts     # <book-view-pomodoro> - standalone Pomodoro timer tab (mode/ring/presets/history)
│   │   ├── book-view-glossary.ts     # <book-view-glossary> - searchable Web API glossary
│   │   ├── book-view-resources.ts    # <book-view-resources> - resource catalog with bookmarks
│   │   └── book-view-quitcriteria.ts # <book-view-quitcriteria> - stop-signal/exit-criteria matrix
│   ├── constants.ts                # STORAGE_KEY, THEME_KEY, LANG_KEY, ROUTE_IDS, CHAPTER_STATUS_COLOR
│   ├── main.ts                     # Bootstrap: load state -> apply theme -> router -> listeners -> renderAll()
│   ├── progress.ts                 # calculateProgress(): read/hands-on/lab weighted %, active chapter, next section, per-chapter ChapterProgress[]
│   ├── renderer.ts                 # registerRenderListener() / renderAll()
│   ├── router.ts                   # Hash router (#/route), tab switching, state sync
│   ├── toast.ts                    # Toast notification utility
│   └── vite-env.d.ts
├── .gitignore
├── index.html                      # Header, nav tabs, view containers, toast container
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── vite.config.ts                  # base: './' for GitHub Pages
```

---

## 2. Directory Responsibilities

### `.github/`
`deploy.yml` — on push to `main`/`master`: `npm ci`, `npm run build`, deploy `dist/` to GitHub Pages.

### `docs/content/` (book content — see individual files for detail)
- **`chapters.md`**: source of the 15-chapter reading map (summaries, sections, sub-sections, time estimates, suggested reading order).
- **`labs.md`**: source of the 15 `Lab` objects.
- **`flashcards_guide.md`**: process doc for the 15 `FlashcardTask` completion criteria — not a data source, a how-to.
- **`glossary.md`**: source of `GlossaryTerm[]`.
- **`resources.md`**: source of `Resource[]`.
- **`quit_criteria_guide.md`**: source of `QuitCriteriaRow[]`.

### `docs/guides/`
- **`architecture_guide.md`**: architecture, tech stack, design patterns, build blueprint.
- **`book_data_model_guide.md`**: the data contract — interfaces, id conventions, full chapter/section id map. Read first.
- **`project_structure.md`**: this file.
- **`ui_system_design_guide.md`**: CSS tokens, `@layer` structure, SVG icons.
- **`interactive_components_guide.md`**: PRD/UX specs, component lifecycles, state contracts.
- **`github_pages_deployment_guide.md`**: CI/CD.

### `src/`
Mirrors the sibling roadmap-tracker project's layout; see **[architecture_guide.md](./architecture_guide.md)** for the design patterns behind each module, and **[book_data_model_guide.md](./book_data_model_guide.md)** for what `bookData.*.ts` must contain.
