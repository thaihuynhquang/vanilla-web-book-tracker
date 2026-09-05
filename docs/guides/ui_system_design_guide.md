# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Official UI System Design & Component Layout Guide for the **Vanilla Web Book Tracker**. Covers design language, tokens, component dictionary, and layout assembly. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system is copied as-is from the sibling roadmap tracker (same tokens, same layer structure) — this document only adds what's specific to a *book* tracker: chapter status badges, a progress ring per chapter, and a small set of new icons.

---

## 1. Visual Design Philosophy & Tokens

### 1.1. Dark-First Aesthetic with Light Mode Fallback
Same as the sibling project: deep dark background, elevated cards, glassmorphic header blur, theme swap via `data-theme` on `<html>`.

### 1.2. Color Palette System (`_tokens.css`)

Reuse the exact token set below (unchanged from the sibling project, since the visual identity should feel like the same product family):

| Token Variable | Dark Mode (Default) | Light Mode | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#0b0f19` | `#f8fafc` | Main body background |
| `--bg-card` | `#111827` | `#ffffff` | Surface card background |
| `--bg-card-hover` | `#1f2937` | `#f1f5f9` | Card hover background |
| `--bg-glass` | `rgba(17, 24, 39, 0.75)` | `rgba(255, 255, 255, 0.85)` | Sticky header glass (`backdrop-filter: blur(12px)`) |
| `--border-color` | `rgba(255, 255, 255, 0.1)` | `rgba(0, 0, 0, 0.1)` | Card/input/separator border |
| `--border-color-strong` | `rgba(255, 255, 255, 0.2)` | `rgba(0, 0, 0, 0.18)` | Hover/active border |
| `--text-primary` | `#f9fafb` | `#0f172a` | Headings, primary content |
| `--text-secondary` | `#9ca3af` | `#475569` | Descriptions, inactive tabs |
| `--text-muted` | `#6b7280` | `#94a3b8` | Metadata, footers, timestamps |
| `--primary` | `#6366f1` (Indigo) | `#4f46e5` | Brand color, active tab indicator |
| `--primary-hover` | `#4f46e5` | `#4338ca` | Primary button hover |
| `--primary-glow` | `rgba(99, 102, 241, 0.35)` | `rgba(79, 70, 229, 0.2)` | Glow box-shadow |
| `--accent-emerald` | `#10b981` | `#059669` | Success / read+hands-on complete |
| `--accent-amber` | `#f59e0b` | `#d97706` | Read-but-not-hands-on warning (§4.1) |
| `--accent-rose` | `#f43f5e` | `#f43f5e` | Danger action (reset), stop-signal box |
| `--accent-sky` | `#0ea5e9` | `#0ea5e9` | Info toast, external links |
| `--accent-purple` | `#a855f7` | `#a855f7` | Secondary accent gradient, lab/flashcard badges |

### 1.3. Radius, Shadow, Transition Tokens

```css
--radius-sm: 6px;      /* Badges, tags, small buttons */
--radius-md: 12px;     /* Buttons, inputs, action icons */
--radius-lg: 18px;     /* Chapter cards, metric cards */
--radius-full: 9999px; /* Progress rings, status pills */

--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);

--transition-fast: 0.15s ease;
--transition-normal: 0.25s ease;
```

---

## 2. Layered CSS File Breakdown

```text
src/styles/
├── main.css         # @layer (reset, base, components, views, utilities)
├── _tokens.css       # -> @layer base
├── _reset-base.css   # -> @layer reset
├── _header.css       # -> @layer components
├── _tabs.css          # -> @layer components
├── _main-layout.css  # -> @layer components
├── _views.css         # -> @layer views (chapter accordion, lab cards, glossary cards, quit-matrix)
└── _responsive.css   # -> @layer utilities
```

---

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
Sticky, `justify-content: space-between`. Children: `.header-brand` (logo + "Vanilla Web Book Tracker" title, subtitle "Reading & Practice Tracker"), `.header-actions` (Export, Import, Reset-danger, Language toggle, Theme toggle) — identical layout to the sibling project.

### 3.2. Navigation Tab Bar (`.nav-tabs-container`, `.nav-tab`)
6 tabs: Dashboard, Chapters, Labs, Glossary, Resources, Quit Criteria. Horizontal-scroll on mobile, centered `max-width: 1200px` on desktop. Active tab shows the overall progress badge only on the Dashboard tab (`#badge-overall-pct`).

### 3.3. Chapter Card (`.chapter-card`) — new
- **Layout**: accordion — header row (`.chapter-card-header`: number badge, title, `completed/total` section counter, chevron) + collapsible body (`.chapter-card-body`: section rows).
- **Chapter Progress Ring**: a small SVG ring (`.chapter-ring`, 32px) in the header showing `(read + handsOn) / (2 × sectionCount)` for that chapter, using `--primary` stroke.
- **`tbd` state**: card renders with a muted `.chapter-card--tbd` style, chevron disabled, body replaced by a one-line "Not yet published by Manning" notice.

### 3.4. Section Row (`.section-row`) — new
- **Layout**: flex row — section number + title, two checkboxes (`.check-read`, `.check-handson`, each with a small label icon: open-book for read, flask for hands-on).
- **Sub-section list** (`.subsection-list`): plain `<ul>` indented under the row, muted text color, no interactive control — purely a reading aid.
- **Status badges** (`.section-badge`):
  - Not started: `--text-muted` outline pill, "Chưa đọc"/"Not started".
  - Read only: `--accent-amber` pill, "Đã đọc"/"Read".
  - Read + hands-on: `--accent-emerald` pill, "Hoàn thành"/"Done".

### 3.5. Lab Card (`.lab-card`) — new
Header (chapter title, lab title), body (goal, requirements list, acceptance-criteria checklist as plain bullets, "APIs used" chip row linking to Glossary term ids), footer (single `.lab-checkbox` + "Mark lab complete").

### 3.6. Flashcard Task Row (`.flashcard-task-row`) — new
One line per chapter inside the Labs view: chapter title, link to `docs/content/flashcards_guide.md` prompt template, single checkbox.

### 3.7. Glossary Term Card (`.glossary-card`) — new
Term name, one-line VI description, chapter chip(s) linking back to Chapters view, MDN/spec link buttons (`--accent-sky` outline buttons with external-link icon).

### 3.8. Quit Criteria Module Card (`.quit-module-card`)
Same layout as the sibling project's decision-matrix card: chapter title header, `.quit-box--trigger` (amber, "Stop signal") and `.quit-box--pivot` (emerald, "Exit criteria") boxes side by side, stacking on mobile.

### 3.9. Toast Notifications (`.toast`)
Identical to sibling project: `--accent-emerald` success, `--accent-rose` error, `--accent-sky` info, bottom-right stack, auto-dismiss 3.5s.

---

## 4. New Icons (`src/utils/icons.ts`)

Add to the existing SVG dictionary pattern (one string per icon, 24×24 viewBox, `currentColor` stroke):

| Icon key | Used in |
| :--- | :--- |
| `book` | Chapters tab nav icon, chapter card header |
| `bookOpen` | Section row "read" checkbox label |
| `flask` | Section row "hands-on" checkbox label, Lab card footer |
| `cards` | Labs tab nav icon (shared with flashcard rows), flashcard task row |
| `glossary` (magnifying glass over `{ }`) | Glossary tab nav icon |
| `chevronDown` | Chapter accordion toggle (rotates 180° when expanded, reuse existing rotation pattern from `.nav-tab` if present) |

All other icons (Export, Import, Reset, Sun/Moon theme, Star bookmark, external-link, search, warning-amber, corner-up-right) are reused unchanged from the sibling project's dictionary.
