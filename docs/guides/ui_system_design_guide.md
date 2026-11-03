# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Official UI System Design & Component Layout Guide for the **Vanilla Web Book Tracker**. Covers design language, tokens, component dictionary, and layout assembly. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system follows the **OccupySaaS protest-poster** language — paper and ink, wide uppercase display type, square corners, thick rules and solid offset shadows with press feedback — recoloured around a single **poster red (`#E74C3C`, `rgb(231, 76, 60)`)** instead of OccupySaaS's own red. Readability comes first: `#E74C3C` is only 3.5:1 on paper and 3.8:1 under white text, so it is used as a *fill* with ink text on top (4.9:1), and a darker red (`--primary-text`) carries every red *foreground* role.

This document also covers what's specific to a *book* tracker: per-chapter status badges and progress rows, chapter cards with a collapsible section list, a standalone Pomodoro view, and a small set of extra icons.

---

## 1. Visual Design Philosophy & Tokens

### 1.1. Light-First Paper, Dark Ink Variant
Light is the `:root` default (`color-scheme: light`); dark flips the same token names under `:root[data-theme="dark"]`. The saved/OS-preferred theme is applied via `data-theme` on `<html>`.

### 1.2. Color Palette System (`_tokens.css`)

| Token | Light | Dark | Use |
| :--- | :--- | :--- | :--- |
| `--bg-main` / `--bg-glass` | `#F8F5F0` (paper) | `#14110F` | page background, sticky top bar |
| `--bg-card` | `#FFFFFF` | `#1F1A17` | card surfaces |
| `--bg-card-hover` | `#FDEBE8` (red tint) | `#2E211E` | surface-card header bands |
| `--ink` / `--border-color` | `#14110F` | `#000` / `#F5EEE6` | rules and borders |
| `--text-primary` / `-secondary` / `-muted` | `#14110F` / `#433D37` / `#5B544C` | `#F5EEE6` / `#D8CEC3` / `#ACA196` | text (muted ≥ 6.1:1 on every surface) |
| `--primary` / `--primary-hover` | `#E74C3C` / `#C0392B` | `#E74C3C` / `#C0392B` | **fills only** — active tab, marquee, metric icon, resource button, selection, progress stripes |
| `--primary-contrast` | `#14110F` | `#14110F` | text drawn on `--primary` (4.9:1 — white would be 3.8:1) |
| `--primary-text` / `-hover` | `#A8261A` / `#7D1A10` | `#FF8A7A` / `#FFB3A8` | red *foreground*: links, outlined numerals, tags, subtitle (≥ 5.6:1 on every surface) |
| `--primary-strong` | `#C0392B` | `#F26B5C` | decorative strokes: pomodoro ring, inner card frames, tab hover underline |
| `--shadow-accent` | `--primary` | `--primary` | accent offset shadows on buttons and hover lifts |
| `--focus-ring` | `#1D4FBF` | `#8DB2FF` | `:focus-visible` outlines — blue so focus never reads as an error-red state |
| `--on-accent` | `#FFFFFF` | `#14110F` | text on lime/amber/sky/rose fills |
| `--accent-lime` | `#1D6B3A` | `#6DD391` | "done" status |
| `--accent-amber` | `#8A5300` | `#F5B84A` | "in progress" status — pushed toward gold so it never reads as the brand red |
| `--accent-sky` / `--accent-purple` | `#1D4FBF` / `#5A3D99` | `#8DB2FF` / `#C2A8FF` | info / resource badges |
| `--accent-rose` | `#9C1F5E` | `#FF8AB8` | danger: reset hover, delete, error toast — magenta, distinct from the brand red |
| `--status-idle` | `#5B544C` | `#ACA196` | "not started" |

Every text/background pair meets WCAG AA (≥ 4.5:1); most exceed 6:1.

### 1.3. Border, Radius, Shadow, Transition Tokens
- `--radius-{sm,md,lg}` are **0** (square corners); `--radius-full` stays for the pomodoro ring.
- `--border-thin` (2px), `--border-thick` (3px), `--rule` (4px) solid ink lines.
- Offset shadows have no blur. Interactive elements lift on hover (`translate(-2px,-2px)` + larger shadow) and press on `:active`.
- Transitions: `--transition-fast: 0.12s`, `--transition-normal: 0.2s`.

### 1.4. Spacing & Typography
4px-grid spacing tokens (`--space-3xs`…`--space-3xl`). Fonts load from Google Fonts in `index.html` with `display=swap`: **Archivo** (variable width; headings use `wdth` 125 via `--wdth-display`, uppercase, weight 900), **JetBrains Mono** for labels, numbers and badges, **Permanent Marker** for hand-lettered accents (next-section title, quit-card titles). A faint paper-grain SVG overlay sits on `body::before`.

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
│                       #   .status-badge--dynamic, .tag, .item-row, .surface-card, .progress-bar-fill--dynamic
├── _views.css         # -> @layer views (chapter cards, dashboard chapter-progress-list, lab cards,
│                       #   resource cards, quit-matrix)
├── _pomodoro.css      # -> @layer views (Pomodoro tab: hero card, ring, mode pills, history)
└── _responsive.css   # -> @layer utilities (768px / 480px breakpoints)
```

---

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
`justify-content: space-between`. Children: `.header-brand` (logo + "Vanilla Web Book Tracker" title, subtitle "Reading & Practice Tracker"), `.header-actions` (Export, Import, Reset-danger, Language toggle, Theme toggle) — same layout as the sibling project. The brand mark is a poster-red square with a 3px ink frame, an ink line-art open book and a white check mark; tilted -4°, straightens on hover. A decorative red slogan marquee (`.app-marquee`, `aria-hidden`, paused under `prefers-reduced-motion`) runs under the top bar.

Stickiness lives one level up: `index.html` wraps `.app-header` and `.nav-tabs-container` together in `.app-topbar` (`position: sticky; top: 0`), so the two-row mobile header (below) and the tab bar stick as one unit instead of the tab bar needing a hardcoded offset under a header of varying height. All-icon `.header-actions` has no text label to hide for space, unlike the sibling project's labeled buttons — so at `max-width: 768px` (`_responsive.css`) `.app-header` gets `flex-wrap: wrap` and `.header-actions` gets `flex-basis: 100%; justify-content: flex-start`, forcing it onto its own row, left-aligned under `.header-brand`, rather than relying on wrap-if-it-happens-to-not-fit.

### 3.2. Navigation Tab Bar (`.nav-tabs-container`, `.nav-tab`)
5 tabs: **Dashboard, Chapters, Pomodoro, Resources, Quit Criteria**. Horizontal-scroll on mobile, centered `max-width: 1200px` on desktop. The active tab gets a solid red fill + ink text and a 4px ink underline; its badge inverts to ink with red text. Only the Dashboard tab shows a badge (`#badge-overall-pct`, `.nav-tab-badge`) with the weighted overall %. There is no separate Labs tab — the lab and flashcard deliverables render inside each chapter card (§3.4, §3.7). There is no separate Glossary tab either — glossary terms merged into the Resources tab (§3.8).

### 3.3. Dashboard View (`<book-view-dashboard>`)
- **Stat grid** (`.stat-grid` → `.metric-card` × 4): sections read (`N/95`), hands-on sections done, chapter deliverables done (labs + flashcards), total Pomodoro focus hours. Each tile is an icon square (`.metric-icon--primary/--amber/--sky`, 15%-alpha tint of the accent color) + a big value + a muted label. There is deliberately **no** "overall %" tile — it would duplicate the progress card immediately below.
- **Progress overview card** (`.card` → `.progress-header` + one `.progress-bar-track`): title + subtitle on the left, the big overall % (`.progress-percentage`, outlined numeral stroked in `--primary-text`) on the right, one full-width bar underneath (`.progress-bar-fill--dynamic`, solid `--status-color`, falling back to `--primary-text`). No per-axis breakdown bars — kept to a single glanceable stat, same shape as the sibling project's `.progress-card`.
- **Next-focus card** (`.card--accent-primary`, or `.card--accent-lime` when everything is done): rocket-tagged callout naming the active chapter and either the next unread section ("Mark as read") or the next section still missing hands-on ("Mark hands-on"), whichever applies. Recalculated from `calculateProgress()` on every state change.
- **Chapter progress list** (`.chapter-progress-list` → `.chapter-progress-row`): one `.surface-card` per non-`tbd` chapter. Header band: number badge, title, `.status-badge--dynamic` pill + `%`. Body: a thin `.progress-bar-track--sm` bar plus a `.chapter-progress-meta` line (`completed/total sections · ~N min`, from `ChapterProgress.completedCount`/`total`/`estMinutes`). `--card-accent` is set to the chapter's `statusColor`; `--card-surface` overrides to `--bg-card` so the row still reads as a raised card against the page background. Status/color come from `ChapterProgress.status`/`statusColor` (`src/progress.ts`) — see §3.4. `.chapter-progress-title` gets `flex: 1; min-width: 8rem` (not `0`) so a long title wraps at word boundaries and forces `.surface-card-header`'s existing `flex-wrap: wrap` to drop the badge/`%` to their own line on narrow screens, instead of squeezing the title down to a sliver that breaks mid-word; `overflow-wrap: anywhere` stays as a fallback for the rare unbreakable string. `.status-badge` itself carries `flex-shrink: 0` so it never gets squeezed by its title sibling.

### 3.4. Chapter Card (`.chapter-card`)
- **Layout**: header, progress bar, summary box, flashcard card, and lab card always render — only the section list is collapsible. Header row: number badge, title + a meta line (`N sections · ~M min`, from `Section.estMinutes`), and on the right a `.status-badge--dynamic` pill + `completed/total (pct%)`. Same narrow-screen wrap behavior as the Dashboard's progress row (§3.3): `.chapter-card-title-group` uses `min-width: 8rem` instead of `0`, and `.chapter-card-title` gets `overflow-wrap: anywhere` as a fallback, so `.chapter-card-header`'s `flex-wrap: wrap` drops the status pill to its own line rather than the title breaking mid-word. Below the header: a thin `.progress-bar-track--sm` bar, then an optional `.chapter-summary-box` — a `.surface-card` with a `fileText`-icon header band ("Tổng quan chương"/"Chapter overview") and a body paragraph rendering `Chapter.summary` — then a `.section-list-toggle` button (`chevronDown` icon, rotates -90° when collapsed) controlling a `.section-list[hidden]` wrapper around the section rows, then the chapter's flashcard card and lab card (§3.7) as the last two items in `.chapter-card-body`. Collapse state is an in-memory `Set<string>` on `BookViewChapters` (see `interactive_components_guide.md` §4.3) — not persisted, defaults to expanded, and does not go through `refresh()`.
- **Status color system**: each chapter computes a `ChapterStatus` (`"notStarted" | "inProgress" | "done"`, `src/progress.ts` `buildChapterProgress()`) from `(read + handsOn) / (2 × sectionCount)`, mapped to a CSS color via `CHAPTER_STATUS_COLOR` (`src/constants.ts`). That color is passed down as an inline `--status-color` custom property; `.status-badge--dynamic` and `.progress-bar-fill--dynamic` derive their fill/border from it with `color-mix()` (20%/40% alpha) — one value drives the pill, the percentage text, and the bar. The same system feeds both this card and the Dashboard's chapter-progress-list row for the same chapter, so the two always agree.
- **Perf**: `content-visibility: auto; contain-intrinsic-size: auto 320px` on `.chapter-card`, since all ~13 chapters (up to ~140 sections) render at once. Off-screen cards skip layout/paint until scrolled near.
- **Focus preservation**: toggling a section, lab, or flashcard checkbox triggers a full `refresh()` (the view re-renders `innerHTML` from a template string, per Pattern 2). `book-view-chapters.ts` records `document.activeElement`'s `data-read-id`/`data-handson-id`/`data-lab-id`/`data-flashcard-id` before the rebuild and re-focuses the matching input after, so keyboard navigation isn't lost mid-list.
- **`tbd` state**: card renders with a muted `.chapter-card--tbd` style, no status badge/progress bar, body replaced by a one-line "Not yet published by Manning" notice, still followed by the flashcard and lab deliverable cards (labs render their own "not yet defined" placeholder, §3.7).

### 3.5. Section Row (`.item-row`)
- **Layout**: a compact 2-column grid, not the `.surface-card` header+body anatomy — with ~140 rows rendered per page, a header band per row would roughly double the Chapters tab's height. Columns: `.section-num` (a small tabular-nums chip, `--surface-tint-strong` fill) and `.item-row-main` (title line — `.section-title` + `.section-badge` + a `.tag` showing `estMinutes` — with `.subsection-list` stacked below when present). `.item-row-title-line` already carries `flex-wrap: wrap`; `.section-title` uses `flex: 1; min-width: 8rem` (plus `overflow-wrap: anywhere` fallback) and `.section-badge` carries `white-space: nowrap; flex-shrink: 0`, so on narrow screens the badge/duration tag drop to their own line under the title instead of the title breaking mid-word — same fix as §3.3/§3.4. Below both columns, `.item-row-footer` spans the full row width behind a hairline `border-top` — a `space-between` flex row holding the two `.section-check` labels (open-book icon for read / flask icon for hands-on, each wrapping a native checkbox — `data-read-id` / `data-handson-id`, both set to the section's `id`) pinned to opposite ends so the checkboxes land at a consistent x-offset across every row regardless of label length; wraps below ~480px via `flex-wrap`.
- **Checkbox tint**: `.section-check input` gets `accent-color: var(--card-accent)`, so the checkbox itself picks up the row's read/done accent instead of the browser default — same idiom as `.deliverable-checkbox input` (§3.7).
- **Sub-section list** (`.subsection-list`): a row of `.tag` pills, one per sub-section — muted, no interactive control, purely a reading aid.
- **State via `--card-accent`**: the row carries a 3px `border-left` colored by `--card-accent` (`--text-muted` at rest), the same local-token idiom `.surface-card` uses for its header icon — `.item-row` just applies it to a border instead of an icon.
  - Not started: `--text-muted` outline badge, "Chưa đọc"/"Not started"; row border stays muted.
  - Read only: `--accent-amber` badge, "Đã đọc"/"Read"; row gets `.item-row--read` (`--card-accent: var(--accent-amber)`).
  - Read + hands-on: `--accent-lime` badge, "Hoàn thành"/"Done"; row gets `.item-row--done` (`--card-accent: var(--accent-lime)`, `opacity: 0.85`, faint lime tint).

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
- **Layout**: hero card, metric row, and history card all span the same full content width (no card-specific `max-width`) so the tab lines up with every other tab's cards — `.pomodoro-container > .card, .pomodoro-container > .stat-grid { margin-bottom: 0 }` avoids the double-margin (container `gap` + `.card`'s own `margin-bottom`) that used to throw the cards' vertical rhythm off.
- **Hero card** (`.pomodoro-hero-card`): mode segmented-pill group (Focus/Short Break/Long Break, `aria-pressed` synced with `.active`), an SVG progress ring (`.pomodoro-ring-wrap`, sized `clamp(280px, 62vw, 400px)`, 10px `--primary-strong` stroke at radius 54 so the arc fits the 120-unit viewBox, a `::before` paper disc with a 3px ink border and an 8px offset shadow, and a small `--primary-strong` dot that pulses while `.running`), digital countdown (`.pomodoro-time`, tabular-nums, `clamp(2.4rem, 11vw, 3.5rem)`, `role="timer"`), pill-shaped Start/Reset buttons (Reset carries the `rotateCcw` icon at 18px, sized down from the shared 22px control-icon rule since its thin outline glyph would otherwise read heavier than Start/Pause's solid fill icons at the same box size), and a duration-preset segmented pill group (`25/5`, `50/5`, `Custom`) plus a custom-duration row.
- **Presets share the mode-pill's exact visual language**: `.pomodoro-modes` and `.pomodoro-presets` are one merged container rule (bordered pill-group), and `.pomodoro-mode-btn`/`.pomodoro-preset-btn` are one merged button rule (transparent by default, `--surface-tint-strong` hover, `--primary` fill with `--primary-contrast` ink text when `.active`) — so the two rows look like a single design system, same visual family as the `.filter-pill` chapter-filter row (§3.2) but with its own token set. The break-mode ink override (Short/Long Break pills fill with `--text-primary`) stays scoped to `.pomodoro-mode-btn[data-pomo-mode="…"]`, so preset pills (no `data-pomo-mode` attribute) never pick it up. Selecting a preset closes and deselects the Custom pill; opening Custom deselects both presets — exactly one pill reads "selected" at a time, same as the mode row.
- **Custom-duration row** (`.pomodoro-custom-form`, shown when the `Custom` pill is active) mirrors the reference roadmap repo's `.custom-inputs-row`: a single bordered line (no background fill) holding inline `label + input` pairs (`.pomodoro-custom-group`) instead of stacked label-above-input blocks, with small centered bold number fields (`.pomodoro-custom-input`, `--bg-main` fill against the card so they read as distinct inset controls) and the Apply button (`.btn.btn-primary.btn-sm`) at the end of the row.
- **Break mode recolors the whole control cluster, not just the ring**: `setMode()` toggles `.break` on `.pomodoro-widget` (not the ring wrapper alone), so `.pomodoro-widget.break` switches the ring to ink and the Start/Pause button to a red fill with ink text together.
- **Interaction feedback follows the control's shape**: focus rings and the pressed state use `outline`/`box-shadow`, which clip to `border-radius`, never a background overlay or the bare UA rectangle — `.pomodoro-mode-btn` is in the shared `:focus-visible` group in `_main-layout.css` for this reason (`.pomodoro-preset-btn` gets the same treatment directly in `_pomodoro.css`). Preset/custom-apply controls get `disabled` while the timer is running (`setConfigEnabled()`) so a stray click can't silently reset an in-progress session; mode pills, preset pills, filter pills, and `.btn` all get hover/`:active` press states. The interactive chapter-filter row uses `.filter-pill`/`.filter-pill.active` (`_main-layout.css`) — a square button, `--bg-card` resting, offset-shadow lift on hover, solid ink fill when selected. Static, non-interactive labels elsewhere (lab API tags, resource card chapter tags) use the separate `.tag`/`.tag--primary` classes (§3.7, §3.8) — small square mono chips (`.tag--primary` in `--primary-text`), no hover/press state, so they read as inert data rather than controls.
- **Metric row** (`#pomo-metrics.stat-grid`): three `.metric-card` tiles reusing the Dashboard's tile language (§3.3) — today's session count, today's focus minutes (+ hours, locale-formatted), and lifetime session count.
- **History card** (`.pomodoro-history-card`): a `progress-card`-shaped card — `.progress-header` (title left, a `{count} sessions` subtitle right) over a reverse-chronological list of card-style rows (`.pomodoro-history-item`, `.item-row`-like shape), each with a lime "+1 Pomodoro" `.tag`, timestamp, duration, and a compact 32px delete `.icon-btn` with a rose hover.
- Session data (`state.pomodoroSessions`) also feeds the Dashboard's "focus hours" stat tile (§3.3) — but the timer UI itself lives only here, not on the Dashboard.

### 3.7. Deliverable Card (`.deliverable-card`)
A thin modifier over `.surface-card` (§3.4's summary box and the Dashboard's chapter-progress-row are the other two consumers of that base) — `--card-surface: transparent` keeps its original flush-with-parent look. Shared for the two per-chapter deliverables nested at the bottom of each chapter card — no separate chapter title/number (the parent card already shows those). Header (icon + title, `--card-accent` tint on the icon) / body / footer (single `.deliverable-checkbox` + mark-complete label, checkbox `accent-color` matching the header icon). Two variants:
- **Flashcard card** (default `--card-accent` = `--primary`, `cards` icon, no dedicated modifier class): body holds a link to `docs/content/flashcards_guide.md`'s prompt template; footer checkbox is "Generated & reviewed flashcards".
- **Lab card** (default `--card-accent` = `--primary`, `flask` icon, no dedicated modifier class): body holds goal, requirements list, acceptance-criteria checklist as plain bullets, "APIs used" `.tag-row` linking to Glossary term ids; footer checkbox is "Mark lab complete". `tbd` chapters render only the header + a "lab not yet defined" notice in the body (no footer).

Rendered in that order — flashcard card, then lab card — as the last two children of `.chapter-card-body`.

### 3.8. Resource Card (`.resource-card`)
The Resources tab renders one flat, chapter-sorted grid mixing glossary terms and reading-list links — no sub-tab, no bookmark/star (removed). Each card: tag row (`.resource-tag-row`) with a tinted type `.resource-badge` (`--term` purple, `--mdn` primary, `--spec` amber, `--article` sky, `--video` rose, `--demo` lime, `--tool` muted — all via `color-mix(in srgb, var(--badge-color) 15%, transparent)` so tints stay theme-aware) plus chapter `.tag`/`.tag--primary` tag(s); bold title; a 3-line-clamped description (a term's definition, or a link's chapter label); footer separated by a hairline border with an optional secondary link (a term's Spec link) on the left and a red-fill "open link" button (`.btn--resource`, ink text) on the right. Card chrome (bg/border/radius/hover lift) matches `.deliverable-card`'s sibling shape.

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Same layout as the sibling project's decision-matrix card: chapter title header, `.quit-box--trigger` (amber, "Stop signal") and `.quit-box--pivot` (lime, "Exit criteria") boxes side by side, stacking on mobile.

### 3.10. Toast Notifications (`.toast`)
`--accent-lime` success, `--accent-rose` error, `--accent-sky` info — each carries its color via border, a 3px `border-left` accent, and a 12%-mix tinted background (not a 1px border alone), bottom-right stack, auto-dismiss 3.5s.

---

## 4. Icons (`src/utils/icons.ts`)

One flat `ICONS` dictionary, one raw SVG string per key (24×24 viewBox, `currentColor` stroke unless noted), consumed via `icon(key: IconKey)`.

| Icon key | Used in |
| :--- | :--- |
| `book` | Chapters tab nav icon |
| `bookOpen` | Section row "read" checkbox label, Dashboard "sections read" metric tile, Resources tab nav icon, resource card "MDN" type badge |
| `flask` | Section row "hands-on" checkbox label, lab deliverable card header, Dashboard "hands-on" metric tile |
| `target` | Dashboard "deliverables" metric tile |
| `pomodoro` | Pomodoro tab nav icon, Dashboard "focus hours" metric tile, Pomodoro tab "today's sessions" metric tile |
| `dashboard` | Dashboard tab nav icon |
| `layers` | Dashboard chapter-progress-list section heading, resource card "Spec" type badge |
| `rocket` | Dashboard next-focus card tag |
| `check` | Dashboard next-focus card CTA buttons |
| `checkCircle` | Dashboard "all chapters done" state, Quit Criteria exit-criteria box, Pomodoro history row "+1 Pomodoro" tag |
| `shieldAlert` | Quit Criteria tab nav icon |
| `cards` | Flashcard deliverable card header (chapter card) |
| `glossary` (magnifying glass over `{ }`) | Resource card "Term" type badge |
| `close` | Pomodoro history row delete button |
| `clock` | Pomodoro tab "today's minutes" metric tile |
| `trophy` | Pomodoro tab "total sessions" metric tile |
| `rotateCcw` | Pomodoro Reset button — deliberately not `reset` (that key is a trash-can glyph reused by the header's destructive Reset-data button) |
| `fileText` | Resource card "Article" type badge |
| `video` | Resource card "Video" type badge |
| `monitor` | Resource card "Demo" type badge |
| `wrench` | Resource card "Tool" type badge |
| `chevronDown`, `skip`, `trash`, `starOutline`, `starFilled` | Defined in the dictionary, currently unused — free for future components |

All other icons (Export, Import, Reset, Sun/Moon theme, Star bookmark, external-link, search, warning-amber) are reused unchanged from the sibling project's dictionary.
