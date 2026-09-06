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
6 tabs: **Dashboard, Chapters, Pomodoro, Glossary, Resources, Quit Criteria**. Horizontal-scroll on mobile, centered `max-width: 1200px` on desktop. Only the Dashboard tab shows a badge (`#badge-overall-pct`, `.nav-tab-badge`) with the weighted overall %. There is no separate Labs tab — the lab and flashcard deliverables render inside each chapter card (§3.4, §3.7).

### 3.3. Dashboard View (`<book-view-dashboard>`)
- **Stat grid** (`.stat-grid` → `.metric-card` × 4): sections read (`N/95`), hands-on sections done, chapter deliverables done (labs + flashcards), total Pomodoro focus hours. Each tile is an icon square (`.metric-icon--primary/--amber/--sky`, 15%-alpha tint of the accent color) + a big value + a muted label. There is deliberately **no** "overall %" tile — it would duplicate the progress card immediately below.
- **Progress overview card** (`.card` → `.progress-header` + one `.progress-bar-track`): title + subtitle on the left, the big overall % (`.progress-percentage`, emerald) on the right, one full-width gradient bar underneath (`.progress-bar-fill--dynamic`, primary→emerald gradient when no `--status-color` is set). No per-axis breakdown bars — kept to a single glanceable stat, same shape as the sibling project's `.progress-card`.
- **Next-focus card** (`.card--accent-primary`, or `.card--accent-emerald` when everything is done): rocket-tagged callout naming the active chapter and either the next unread section ("Mark as read") or the next section still missing hands-on ("Mark hands-on"), whichever applies. Recalculated from `calculateProgress()` on every state change.
- **Chapter progress list** (`.chapter-progress-list` → `.chapter-progress-row`): one compact row per non-`tbd` chapter — number badge, title, `.status-badge--dynamic` pill + `%`, and a thin `.progress-bar-track--sm` bar. Status/color come from `ChapterProgress.status`/`statusColor` (`src/progress.ts`) — see §3.4.

### 3.4. Chapter Card (`.chapter-card`)
- **Layout**: every chapter renders **fully expanded** — no accordion, no chevron. Header row: number badge, title + a meta line (`N sections · ~M min`, from `Section.estMinutes`), and on the right a `.status-badge--dynamic` pill + `completed/total (pct%)`. Below the header: a thin `.progress-bar-track--sm` bar, then an optional `.chapter-summary-box` (renders `Chapter.summary`), then the section list, then the chapter's flashcard card and lab card (§3.7) as the last two items in `.chapter-card-body`.
- **Status color system**: each chapter computes a `ChapterStatus` (`"notStarted" | "inProgress" | "done"`, `src/progress.ts` `buildChapterProgress()`) from `(read + handsOn) / (2 × sectionCount)`, mapped to a CSS color via `CHAPTER_STATUS_COLOR` (`src/constants.ts`). That color is passed down as an inline `--status-color` custom property; `.status-badge--dynamic` and `.progress-bar-fill--dynamic` derive their fill/border from it with `color-mix()` (20%/40% alpha) — one value drives the pill, the percentage text, and the bar. The same system feeds both this card and the Dashboard's chapter-progress-list row for the same chapter, so the two always agree.
- **Perf**: `content-visibility: auto; contain-intrinsic-size: auto 320px` on `.chapter-card`, since all ~13 chapters (up to ~140 sections) render at once. Off-screen cards skip layout/paint until scrolled near.
- **Focus preservation**: toggling a section, lab, or flashcard checkbox triggers a full `refresh()` (the view re-renders `innerHTML` from a template string, per Pattern 2). `book-view-chapters.ts` records `document.activeElement`'s `data-read-id`/`data-handson-id`/`data-lab-id`/`data-flashcard-id` before the rebuild and re-focuses the matching input after, so keyboard navigation isn't lost mid-list.
- **`tbd` state**: card renders with a muted `.chapter-card--tbd` style, no status badge/progress bar, body replaced by a one-line "Not yet published by Manning" notice, still followed by the flashcard and lab deliverable cards (labs render their own "not yet defined" placeholder, §3.7).

### 3.5. Section Row (`.item-row`)
- **Layout**: `.item-row-main` — section number + title + a `.section-badge` (not-started/read/done) + a `.tag` showing `estMinutes`. Below: `.section-row-checks`, two `.section-check` labels (open-book icon for read, flask icon for hands-on) each wrapping a native checkbox (`data-read-id` / `data-handson-id`, both set to the section's `id`).
- **Sub-section list** (`.subsection-list`): a row of `.tag` pills, one per sub-section — muted, no interactive control, purely a reading aid.
- **Status badges** (`.section-badge`):
  - Not started: `--text-muted` outline pill, "Chưa đọc"/"Not started".
  - Read only: `--accent-amber` pill, "Đã đọc"/"Read".
  - Read + hands-on: `--accent-emerald` pill, "Hoàn thành"/"Done" — the row itself also gets `.item-row.checked` (slightly dimmed, faint emerald tint).

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
- **Layout**: hero card, metric row, and history card all span the same full content width (no card-specific `max-width`) so the tab lines up with every other tab's cards — `.pomodoro-container > .card, .pomodoro-container > .stat-grid { margin-bottom: 0 }` avoids the double-margin (container `gap` + `.card`'s own `margin-bottom`) that used to throw the cards' vertical rhythm off.
- **Hero card** (`.pomodoro-hero-card`): mode segmented-pill group (Focus/Short Break/Long Break, `aria-pressed` synced with `.active`), an SVG progress ring (`.pomodoro-ring-wrap`, sized `clamp(280px, 62vw, 400px)`, thin 6px stroke so the primary/emerald arc reads as a line rather than a band, ambient glow via a `::before` radial-gradient that pulses while `.running`), digital countdown (`.pomodoro-time`, tabular-nums, `clamp(2.4rem, 11vw, 3.5rem)`, `role="timer"`), pill-shaped Start/Reset buttons (Reset carries the `rotateCcw` icon at 18px, sized down from the shared 22px control-icon rule since its thin outline glyph would otherwise read heavier than Start/Pause's solid fill icons at the same box size), and a duration-preset segmented pill group (`25/5`, `50/5`, `Custom`) plus a custom-duration row.
- **Presets share the mode-pill's exact visual language**: `.pomodoro-modes` and `.pomodoro-presets` are one merged container rule (bordered pill-group), and `.pomodoro-mode-btn`/`.pomodoro-preset-btn` are one merged button rule (transparent/muted by default, `--surface-tint-strong` hover, `--primary` fill + glow + inset-shadow press when `.active`) — so the two rows look like a single design system instead of a segmented-pill row next to a floating-chip row. The break-mode emerald override stays scoped to `.pomodoro-mode-btn[data-pomo-mode="…"]`, so preset pills (no `data-pomo-mode` attribute) never pick it up. Selecting a preset closes and deselects the Custom pill; opening Custom deselects both presets — exactly one pill reads "selected" at a time, same as the mode row.
- **Custom-duration row** (`.pomodoro-custom-form`, shown when the `Custom` pill is active) mirrors the reference roadmap repo's `.custom-inputs-row`: a single bordered line (no background fill) holding inline `label + input` pairs (`.pomodoro-custom-group`) instead of stacked label-above-input blocks, with small centered bold number fields (`.pomodoro-custom-input`, `--bg-main` fill against the card so they read as distinct inset controls) and the Apply button (`.btn.btn-primary.btn-sm`) at the end of the row.
- **Break mode recolors the whole control cluster, not just the ring**: `setMode()` toggles `.break` on `.pomodoro-widget` (not the ring wrapper alone), so `.pomodoro-widget.break` drives the ring, its glow, the active Short/Long Break pill, and the Start/Pause button all switching from `--primary` to `--accent-emerald` together.
- **Interaction feedback follows the control's shape**: focus rings and the pressed state use `outline`/`box-shadow`, which clip to `border-radius`, never a background overlay or the bare UA rectangle — `.pomodoro-mode-btn` is in the shared `:focus-visible` group in `_main-layout.css` for this reason (`.pomodoro-preset-btn` gets the same treatment directly in `_pomodoro.css`). Preset/custom-apply controls get `disabled` while the timer is running (`setConfigEnabled()`) so a stray click can't silently reset an in-progress session; mode pills, preset pills, chips, and `.btn` all get hover/`:active` press states. The shared chip rules in `_main-layout.css` are scoped `button.chip` (not bare `.chip`) so the static `<span class="chip">` tags used as tags elsewhere (glossary chapter refs, lab API chips, resource-type chips) stay visually inert.
- **Metric row** (`#pomo-metrics.stat-grid`): three `.metric-card` tiles reusing the Dashboard's tile language (§3.3) — today's session count, today's focus minutes (+ hours, locale-formatted), and lifetime session count.
- **History card** (`.pomodoro-history-card`): a `progress-card`-shaped card — `.progress-header` (title left, a `{count} sessions` subtitle right) over a reverse-chronological list of card-style rows (`.pomodoro-history-item`, `.item-row`-like shape), each with an emerald "+1 Pomodoro" `.tag`, timestamp, duration, and a compact 32px delete `.icon-btn` with a rose hover.
- Session data (`state.pomodoroSessions`) also feeds the Dashboard's "focus hours" stat tile (§3.3) — but the timer UI itself lives only here, not on the Dashboard.

### 3.7. Deliverable Card (`.deliverable-card`)
Shared card shell for the two per-chapter deliverables nested at the bottom of each chapter card — no separate chapter title/number (the parent card already shows those). Header (icon + title, `--deliverable-accent` tint on the icon) / body / footer (single `.deliverable-checkbox` + mark-complete label, checkbox `accent-color` matching the header icon). Two variants:
- **`.deliverable-card--flashcard`** (purple accent, `cards` icon): body holds a link to `docs/content/flashcards_guide.md`'s prompt template; footer checkbox is "Generated & reviewed flashcards".
- **`.deliverable-card--lab`** (primary accent, `flask` icon): body holds goal, requirements list, acceptance-criteria checklist as plain bullets, "APIs used" chip row linking to Glossary term ids; footer checkbox is "Mark lab complete". `tbd` chapters render only the header + a "lab not yet defined" notice in the body.

Rendered in that order — flashcard card, then lab card — as the last two children of `.chapter-card-body`.

### 3.8. Glossary Term Card (`.glossary-card`)
Term name, one-line VI description, chapter chip(s) linking back to Chapters view, MDN/spec link buttons (`--accent-sky` outline buttons with external-link icon).

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Same layout as the sibling project's decision-matrix card: chapter title header, `.quit-box--trigger` (amber, "Stop signal") and `.quit-box--pivot` (emerald, "Exit criteria") boxes side by side, stacking on mobile.

### 3.10. Toast Notifications (`.toast`)
Identical to sibling project: `--accent-emerald` success, `--accent-rose` error, `--accent-sky` info, bottom-right stack, auto-dismiss 3.5s.

---

## 4. Icons (`src/utils/icons.ts`)

One flat `ICONS` dictionary, one raw SVG string per key (24×24 viewBox, `currentColor` stroke unless noted), consumed via `icon(key: IconKey)`.

| Icon key | Used in |
| :--- | :--- |
| `book` | Chapters tab nav icon |
| `bookOpen` | Section row "read" checkbox label, Dashboard "sections read" metric tile |
| `flask` | Section row "hands-on" checkbox label, lab deliverable card header, Dashboard "hands-on" metric tile |
| `target` | Dashboard "deliverables" metric tile |
| `pomodoro` | Pomodoro tab nav icon, Dashboard "focus hours" metric tile, Pomodoro tab "today's sessions" metric tile |
| `dashboard` | Dashboard tab nav icon |
| `layers` | Dashboard chapter-progress-list section heading |
| `rocket` | Dashboard next-focus card tag |
| `check` | Dashboard next-focus card CTA buttons |
| `checkCircle` | Dashboard "all chapters done" state, Quit Criteria exit-criteria box, Pomodoro history row "+1 Pomodoro" tag |
| `shieldAlert` | Quit Criteria tab nav icon |
| `cards` | Flashcard deliverable card header (chapter card) |
| `glossary` (magnifying glass over `{ }`) | Glossary tab nav icon |
| `close` | Pomodoro history row delete button |
| `clock` | Pomodoro tab "today's minutes" metric tile |
| `trophy` | Pomodoro tab "total sessions" metric tile |
| `rotateCcw` | Pomodoro Reset button — deliberately not `reset` (that key is a trash-can glyph reused by the header's destructive Reset-data button) |
| `chevronDown`, `skip`, `trash` | Defined in the dictionary, currently unused — free for future components |

All other icons (Export, Import, Reset, Sun/Moon theme, Star bookmark, external-link, search, warning-amber) are reused unchanged from the sibling project's dictionary.
