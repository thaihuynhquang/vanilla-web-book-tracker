# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Official UI System Design & Component Layout Guide for the **Vanilla Web Book Tracker**. Covers design language, tokens, component dictionary, and layout assembly. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system is ported from the sibling roadmap tracker (same tokens, same layer structure, same metric-tile/status-badge language) — this document covers what's specific to a *book* tracker: per-chapter status badges and progress rows, always-expanded chapter cards, a standalone Pomodoro view, and a small set of extra icons.

---

## 1. Visual Design Philosophy & Tokens

### 1.1. Dark-First Aesthetic with Light Mode Fallback
Same as the sibling project: deep dark background, elevated cards, glassmorphic header blur, theme swap via `data-theme` on `<html>`.

### 1.2. Color Palette System (`_tokens.css`)

Reuse the exact token set below (same as the sibling project, plus two book-tracker-specific surface tints):

| Token Variable | Dark Mode (Default) | Light Mode | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#0b0f19` | `#f8fafc` | Main body background |
| `--bg-card` | `#111827` | `#ffffff` | Surface card background |
| `--bg-card-hover` | `#1f2937` | `#f1f5f9` | Card hover background |
| `--bg-glass` | `rgba(17, 24, 39, 0.75)` | `rgba(255, 255, 255, 0.85)` | Sticky header glass (`backdrop-filter: blur(12px)`) |
| `--border-color` | `rgba(255, 255, 255, 0.1)` | `rgba(0, 0, 0, 0.1)` | Card/input/separator border |
| `--border-color-strong` | `rgba(255, 255, 255, 0.2)` | `rgba(0, 0, 0, 0.18)` | Hover/active border |
| `--surface-tint` | `rgba(255, 255, 255, 0.02)` | `rgba(0, 0, 0, 0.02)` | Subtle elevation fill (`.item-row`, `.chapter-summary-box`) — theme-aware, unlike a hardcoded white-alpha tint |
| `--surface-tint-strong` | `rgba(255, 255, 255, 0.06)` | `rgba(0, 0, 0, 0.04)` | Slightly stronger tint (`.tag`) |
| `--text-primary` | `#f9fafb` | `#0f172a` | Headings, primary content |
| `--text-secondary` | `#9ca3af` | `#475569` | Descriptions, inactive tabs |
| `--text-muted` | `#6b7280` | `#94a3b8` | Metadata, footers, timestamps |
| `--primary` | `#6366f1` (Indigo) | `#4f46e5` | Brand color, active tab indicator |
| `--primary-hover` | `#4f46e5` | `#4338ca` | Primary button hover |
| `--primary-glow` | `rgba(99, 102, 241, 0.35)` | `rgba(79, 70, 229, 0.2)` | Glow box-shadow |
| `--accent-emerald` | `#10b981` | `#059669` | Success / read+hands-on complete / chapter "done" status |
| `--accent-emerald-glow` | `rgba(16, 185, 129, 0.3)` | `rgba(5, 150, 105, 0.2)` | Emerald glow (Pomodoro break ring) |
| `--accent-amber` | `#f59e0b` | `#d97706` | Read-but-not-hands-on warning, chapter "in progress" status |
| `--accent-amber-glow` | `rgba(245, 158, 11, 0.3)` | `rgba(217, 119, 6, 0.2)` | Amber glow |
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

--font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

`Inter` (weights 400–800) loads from Google Fonts in `index.html` with `display=swap`; the system-font fallback stack paints first so there's no invisible-text flash.

### 1.4. Spacing & Typography Scale

Every `padding`/`gap`/`font-size` is a token, not a raw rem literal — snapped to a 4px grid:

```css
--space-3xs: 0.25rem;  --space-2xs: 0.375rem;  --space-xs: 0.5rem;
--space-sm:  0.75rem;  --space-md:  1rem;      --space-lg: 1.25rem;
--space-xl:  1.5rem;   --space-2xl: 2rem;      --space-3xl: 2.5rem;

--font-size-2xs: 0.7rem;  --font-size-xs: 0.75rem;  --font-size-sm: 0.85rem;
--font-size-md:  0.9rem;  --font-size-base: 0.95rem; --font-size-lg: 1.1rem;
--font-size-xl:  1.25rem; --font-size-2xl: 1.6rem;   --font-size-3xl: 3.5rem; /* Pomodoro digits only */

--font-weight-normal: 400;  --font-weight-medium: 500;  --font-weight-semibold: 600;
--font-weight-bold: 700;    --font-weight-black: 800;

--line-height-tight: 1.2;  --line-height-snug: 1.4;  --line-height-normal: 1.5;  --line-height-relaxed: 1.6;
--letter-spacing-tighter: -0.04em; --letter-spacing-tight: -0.02em;
--letter-spacing-wide: 0.04em;     --letter-spacing-wider: 0.08em;
```

---

## 2. Layered CSS File Breakdown

```text
src/styles/
├── main.css         # @layer (reset, base, components, views, utilities)
├── _tokens.css       # -> @layer base — colors, spacing, typography, radius, shadow tokens
├── _reset-base.css   # -> @layer reset — includes a prefers-reduced-motion guard
├── _header.css       # -> @layer components
├── _tabs.css          # -> @layer components
├── _main-layout.css  # -> @layer components — shared primitives: .card, .stat-grid/.metric-card,
│                       #   .status-badge--dynamic, .tag, .item-row, .progress-bar-fill--dynamic
├── _views.css         # -> @layer views (chapter cards, dashboard chapter-progress-list, lab cards,
│                       #   glossary cards, resource cards, quit-matrix)
├── _pomodoro.css      # -> @layer views (Pomodoro tab: hero card, ring, mode pills, history)
└── _responsive.css   # -> @layer utilities (768px / 480px breakpoints)
```

---

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
Sticky, `justify-content: space-between`. Children: `.header-brand` (logo + "Vanilla Web Book Tracker" title, subtitle "Reading & Practice Tracker"), `.header-actions` (Export, Import, Reset-danger, Language toggle, Theme toggle) — same layout as the sibling project, with a glow/hover-rotate treatment on the brand logo.

### 3.2. Navigation Tab Bar (`.nav-tabs-container`, `.nav-tab`)
7 tabs: **Dashboard, Chapters, Pomodoro, Labs, Glossary, Resources, Quit Criteria**. Horizontal-scroll on mobile, centered `max-width: 1200px` on desktop. Only the Dashboard tab shows a badge (`#badge-overall-pct`, `.nav-tab-badge`) with the weighted overall %.

### 3.3. Dashboard View (`<book-view-dashboard>`)
- **Stat grid** (`.stat-grid` → `.metric-card` × 4): sections read (`N/95`), hands-on sections done, chapter deliverables done (labs + flashcards), total Pomodoro focus hours. Each tile is an icon square (`.metric-icon--primary/--amber/--sky`, 15%-alpha tint of the accent color) + a big value + a muted label. There is deliberately **no** "overall %" tile — it would duplicate the progress card immediately below.
- **Progress overview card** (`.card` → `.progress-header` + one `.progress-bar-track`): title + subtitle on the left, the big overall % (`.progress-percentage`, emerald) on the right, one full-width gradient bar underneath (`.progress-bar-fill--dynamic`, primary→emerald gradient when no `--status-color` is set). No per-axis breakdown bars — kept to a single glanceable stat, same shape as the sibling project's `.progress-card`.
- **Next-focus card** (`.card--accent-primary`, or `.card--accent-emerald` when everything is done): rocket-tagged callout naming the active chapter and either the next unread section ("Mark as read") or the next section still missing hands-on ("Mark hands-on"), whichever applies. Recalculated from `calculateProgress()` on every state change.
- **Chapter progress list** (`.chapter-progress-list` → `.chapter-progress-row`): one compact row per non-`tbd` chapter — number badge, title, `.status-badge--dynamic` pill + `%`, and a thin `.progress-bar-track--sm` bar. Status/color come from `ChapterProgress.status`/`statusColor` (`src/progress.ts`) — see §3.4.

### 3.4. Chapter Card (`.chapter-card`)
- **Layout**: every chapter renders **fully expanded** — no accordion, no chevron. Header row: number badge, title + a meta line (`N sections · ~M min`, from `Section.estMinutes`), and on the right a `.status-badge--dynamic` pill + `completed/total (pct%)`. Below the header: a thin `.progress-bar-track--sm` bar, then an optional `.chapter-summary-box` (renders `Chapter.summary`), then the section list.
- **Status color system**: each chapter computes a `ChapterStatus` (`"notStarted" | "inProgress" | "done"`, `src/progress.ts` `buildChapterProgress()`) from `(read + handsOn) / (2 × sectionCount)`, mapped to a CSS color via `CHAPTER_STATUS_COLOR` (`src/constants.ts`). That color is passed down as an inline `--status-color` custom property; `.status-badge--dynamic` and `.progress-bar-fill--dynamic` derive their fill/border from it with `color-mix()` (20%/40% alpha) — one value drives the pill, the percentage text, and the bar. The same system feeds both this card and the Dashboard's chapter-progress-list row for the same chapter, so the two always agree.
- **Perf**: `content-visibility: auto; contain-intrinsic-size: auto 320px` on `.chapter-card`, since all ~13 chapters (up to ~140 sections) render at once. Off-screen cards skip layout/paint until scrolled near.
- **Focus preservation**: toggling a section checkbox triggers a full `refresh()` (the view re-renders `innerHTML` from a template string, per Pattern 2). `book-view-chapters.ts` records `document.activeElement`'s `data-read-id`/`data-handson-id` before the rebuild and re-focuses the matching input after, so keyboard navigation isn't lost mid-list.
- **`tbd` state**: card renders with a muted `.chapter-card--tbd` style, no status badge/progress bar, body replaced by a one-line "Not yet published by Manning" notice.

### 3.5. Section Row (`.item-row`)
- **Layout**: `.item-row-main` — section number + title + a `.section-badge` (not-started/read/done) + a `.tag` showing `estMinutes`. Below: `.section-row-checks`, two `.section-check` labels (open-book icon for read, flask icon for hands-on) each wrapping a native checkbox (`data-read-id` / `data-handson-id`, both set to the section's `id`).
- **Sub-section list** (`.subsection-list`): a row of `.tag` pills, one per sub-section — muted, no interactive control, purely a reading aid.
- **Status badges** (`.section-badge`):
  - Not started: `--text-muted` outline pill, "Chưa đọc"/"Not started".
  - Read only: `--accent-amber` pill, "Đã đọc"/"Read".
  - Read + hands-on: `--accent-emerald` pill, "Hoàn thành"/"Done" — the row itself also gets `.item-row.checked` (slightly dimmed, faint emerald tint).

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
- **Hero card** (`.pomodoro-hero-card`): mode segmented-pill group (Focus/Short Break/Long Break), an SVG progress ring (`.pomodoro-ring-wrap`, ambient glow via a `::before` radial-gradient that pulses while `.running`, emerald instead of primary while `.break`), digital countdown (`.pomodoro-time`, tabular-nums), Start/Reset buttons, duration presets (`25/5`, `50/5`, custom form), and a completed-sessions/total-hours stat pair.
- **History card** (`.pomodoro-history-card`): reverse-chronological session log, each row deletable.
- Session data (`state.pomodoroSessions`) also feeds the Dashboard's "focus hours" stat tile (§3.3) — but the timer UI itself lives only here, not on the Dashboard.

### 3.7. Lab Card (`.lab-card`)
Header (chapter title, lab title), body (goal, requirements list, acceptance-criteria checklist as plain bullets, "APIs used" chip row linking to Glossary term ids), footer (single `.lab-checkbox` + "Mark lab complete").

### 3.8. Flashcard Task Row (`.flashcard-task-row`)
One line per chapter inside the Labs view: chapter title, link to `docs/content/flashcards_guide.md` prompt template, single checkbox.

### 3.9. Glossary Term Card (`.glossary-card`)
Term name, one-line VI description, chapter chip(s) linking back to Chapters view, MDN/spec link buttons (`--accent-sky` outline buttons with external-link icon).

### 3.10. Quit Criteria Module Card (`.quit-module-card`)
Same layout as the sibling project's decision-matrix card: chapter title header, `.quit-box--trigger` (amber, "Stop signal") and `.quit-box--pivot` (emerald, "Exit criteria") boxes side by side, stacking on mobile.

### 3.11. Toast Notifications (`.toast`)
Identical to sibling project: `--accent-emerald` success, `--accent-rose` error, `--accent-sky` info, bottom-right stack, auto-dismiss 3.5s.

---

## 4. Icons (`src/utils/icons.ts`)

One flat `ICONS` dictionary, one raw SVG string per key (24×24 viewBox, `currentColor` stroke unless noted), consumed via `icon(key: IconKey)`.

| Icon key | Used in |
| :--- | :--- |
| `book` | Chapters tab nav icon |
| `bookOpen` | Section row "read" checkbox label, Dashboard "sections read" metric tile |
| `flask` | Section row "hands-on" checkbox label, Lab card footer, Dashboard "hands-on" metric tile |
| `target` | Dashboard "deliverables" metric tile |
| `pomodoro` | Pomodoro tab nav icon, Dashboard "focus hours" metric tile |
| `dashboard` | Dashboard tab nav icon |
| `layers` | Dashboard chapter-progress-list section heading |
| `rocket` | Dashboard next-focus card tag |
| `check` | Dashboard next-focus card CTA buttons |
| `checkCircle` | Dashboard "all chapters done" state, Quit Criteria exit-criteria box |
| `shieldAlert` | Quit Criteria tab nav icon |
| `cards` | Labs tab nav icon (shared with flashcard rows), flashcard task row |
| `glossary` (magnifying glass over `{ }`) | Glossary tab nav icon |
| `close` | Pomodoro history row delete button |
| `chevronDown`, `trophy`, `clock`, `skip`, `trash` | Defined in the dictionary, currently unused — free for future components |

All other icons (Export, Import, Reset, Sun/Moon theme, Star bookmark, external-link, search, warning-amber) are reused unchanged from the sibling project's dictionary.
