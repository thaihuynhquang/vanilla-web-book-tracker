# PRODUCT REQUIREMENT DOCUMENT (PRD): INTERACTIVE UI COMPONENTS & USER FLOW SPECIFICATIONS

This document is the **Product Requirement Document (PRD)** and User Interaction Specification for all interactive features of the **Vanilla Web Book Tracker**.

> [!NOTE]
> For architecture and code patterns, see [architecture_guide.md](./architecture_guide.md). For the data schema and id conventions, see [book_data_model_guide.md](./book_data_model_guide.md). For directory structure, see [project_structure.md](./project_structure.md). For design tokens and icons, see [ui_system_design_guide.md](./ui_system_design_guide.md).

---

## 1. Purpose & Interactive Design Principles

1. **Instant Reactive Feedback**: every interaction (checking read/hands-on, filtering chapters, starting the timer, bookmarking a resource, toggling theme/language) reflects immediately, zero page reload.
2. **State-Driven Persistence**: every change updates the state store and persists to `localStorage` instantly.
3. **Three-Axis Progress Model**: overall % = Read (40%) + Hands-on (40%) + Chapter deliverables — labs + flashcards (20%). Pomodoro sessions are tracked but excluded from this formula (see `architecture_guide.md` Pattern 4).

---

## 2. Global Features & Navigation Bar Specifications (PRD-01)

### 2.1. Theme Switcher (Dark/Light Mode)
- **User Story**: As a reader, I want to toggle Dark/Light theme to read comfortably at any time of day.
- **UI Component**: `Theme Toggle Component`, header bar.
- **Flow**: read `theme` from store → flip → apply `data-theme` on `<html>` → swap Sun/Moon SVG icon → persist.
- **AC**:
  - [ ] Theme persists across reloads.
  - [ ] CSS custom properties transition smoothly between themes.

### 2.2. Language Switcher (VI/EN)
- **User Story**: As a reader, I want to switch the app's UI and chapter descriptions between Vietnamese and English.
- **UI Component**: `Language Toggle Component`, header bar.
- **Flow**: read `lang` from store → flip → call `getChapters()`/`getLabs()`/etc. through the `bookData.ts` facade to repaint content in the new language → sweep static header text via `applyStaticTranslations()` → persist.
- **AC**:
  - [ ] Switching language never changes any `id` or completion state — only display text changes.

### 2.3. Export Backup
- **User Story**: As a reader, I want to export my reading progress and Pomodoro history to a backup file.
- **UI Component**: `Export Action Component`, header bar.
- **Flow**: serialize `AppState` to JSON → download as `vanilla-web-tracker-backup-YYYY-MM-DD.json` → success toast.
- **AC**:
  - [ ] File contains `read`, `handsOn`, `labDone`, `flashcardDone`, `resourceFlags`, `activeTab`, `theme`, `lang`, `pomodoroSettings`, `pomodoroSessions`.

### 2.4. Import Backup
- **User Story**: As a reader, I want to import a JSON backup to restore progress on a new device.
- **UI Component**: `Import Action Component`, header bar.
- **Flow**: file picker (`.json` only) → validate schema → on success restore state, re-render, toast; on failure show error toast and keep current state intact.
- **AC**:
  - [ ] Corrupted/invalid JSON is rejected cleanly without crashing the app.

### 2.5. Progress Reset
- **User Story**: As a reader, I want to clear all progress and restart from chapter 1.
- **UI Component**: `Reset Action Component`, header bar.
- **Flow**: confirmation dialog → on confirm, clear `read`/`handsOn`/`labDone`/`flashcardDone`/`resourceFlags`, wipe `pomodoroSessions`, restore default timer settings (`25/5`), save, re-render to 0%.
- **AC**:
  - [ ] All progress badges instantly return to 0%.

### 2.6. Hash Router & Dynamic Navigation Badge
- **UI Component**: `Navigation Bar Component`.
- **Flow**: URL hash format `#/view-name` (`dashboard`, `chapters`, `pomodoro`, `labs`, `glossary`, `resources`, `quitcriteria`) → toggle active tab + matching view container → `#badge-overall-pct` on the Dashboard tab shows the weighted overall %.
- **AC**:
  - [ ] Direct URL hash access (e.g. `#/quitcriteria`) activates the correct tab.

---

## 3. Dashboard View Specifications (PRD-02)

### 3.1. Metric Tiles
- **UI Component**: `Dashboard View Component` (`.stat-grid` → `.metric-card` × 4).
- **Requirements**: sections read (`readCount/95`), hands-on sections done, chapter deliverables done (`labDoneCount + flashcardDoneCount`), total Pomodoro focus hours. No "overall %" tile — it would duplicate 3.2.
- **AC**:
  - [ ] Each tile updates instantly when its underlying state changes.

### 3.2. Progress Overview Card
- **UI Component**: `Dashboard View Component` (`.progress-header` + one `.progress-bar-track`).
- **Requirements**: title + subtitle, one big weighted Overall % (`.progress-percentage`), one full-width gradient bar (`.progress-bar-fill--dynamic`) driven by that same %. Deliberately a single stat, not a per-axis (read/hands-on/deliverables) breakdown — see `progress.ts`'s `overallPct` weighting in Pattern 4 of `architecture_guide.md` for how the three axes still feed into it.
- **AC**:
  - [ ] The bar width and the header % always match, since both read `stats.overallPct`.

### 3.3. Active Chapter & Next Focus Card
- **User Story**: As a reader, I want to see which chapter I'm on and what to do next without hunting through the Chapters tab.
- **UI Component**: `Dashboard View Component` ("Next Focus" card, `.card--accent-primary`).
- **Flow**: Progress Engine finds first chapter not 100% read+hands-on → if it has an unread section, renders that section + a "Mark as read" button (`data-section-id`); else renders its first section still missing hands-on + a "Mark hands-on" button (`data-handson-id`). When every chapter is complete, renders a `.card--accent-emerald` "all done" state instead.
- **Trigger**: click either button → `toggleRead(sectionId)` / `toggleHandsOn(sectionId)` → Dashboard recalculates and re-renders.
- **AC**:
  - [ ] Clicking a button updates state and recalculates overall % immediately.

### 3.4. Per-Chapter Progress List
- **User Story**: As a reader, I want to see at a glance which chapters are done, in progress, or untouched, without opening each one.
- **UI Component**: `Dashboard View Component` (`.chapter-progress-list` → `.chapter-progress-row`, one per non-`tbd` chapter).
- **Flow**: each row shows the chapter number/title, a `.status-badge--dynamic` pill (`notStarted`/`inProgress`/`done`) + `%`, and a thin progress bar — all derived from `ChapterProgress` (`calculateProgress().chapterProgresses`, see Pattern 4 in `architecture_guide.md`). The same `ChapterProgress` entries drive the Chapters view's per-card badge (§4.1), so the two views always agree for the same chapter.
- **AC**:
  - [ ] Status color/label/percentage for a given chapter are identical between the Dashboard row and the Chapters tab card.

---

## 4. Chapters View Specifications (PRD-03)

### 4.1. Always-Expanded Chapter Cards
- **UI Component**: `Chapters View Component` (`<book-view-chapters>`), 15 `.chapter-card`s, no accordion.
- **Flow**: every chapter renders fully expanded — header shows chapter number, title, a `N sections · ~M min` meta line, a `.status-badge--dynamic` pill, and `completed/total (pct%)`; body shows an optional chapter-summary box, then all section rows. `tbd` chapters (14, 15) render a "content not yet published" placeholder instead of a section list.
- **Filtering**: a chapter filter-chip row (`chapterFilterChipsHtml()`, `src/views/helpers.ts`) narrows the list to one chapter at a time, or back to "All chapters" — this is the primary way to navigate a ~140-section page now that there's no collapse/expand.
- **AC**:
  - [ ] Selected chapter filter and the "missing hands-on" filter (§4.3) compose — both can be active at once.
  - [ ] Toggling a section's read/hands-on checkbox re-renders the list without losing keyboard focus on that checkbox (the view records and restores `document.activeElement` around the `innerHTML` rebuild).

### 4.2. Section Checklist (Read + Hands-on)
- **User Story**: As a reader, I want to separately mark a section as read and as hands-on'd, since some sections are theory-only.
- **UI Component**: `Chapters View Component` (per-section row, two checkboxes: `data-read-id`, `data-handson-id`, both set to the section's `id`).
- **Flow**: `change` on the read checkbox → `toggleRead(sectionId)`; `change` on the hands-on checkbox → `toggleHandsOn(sectionId)`. Sub-sections render as a plain indented list under each section row with **no checkbox** (display-only, per `book_data_model_guide.md`).
- **AC**:
  - [ ] Both states persist independently in `localStorage`.
  - [ ] Read contributes 40% weight, hands-on contributes 40% weight to overall progress.

### 4.3. "Missing Hands-on" Filter
- **User Story**: As a reader, I want to quickly find sections I've read but never coded along with.
- **UI Component**: `Chapters View Component` (filter toggle above the accordion list).
- **Flow**: when active, hide any section row where `read === true && handsOn === true` or `read === false`; show only `read === true && handsOn === false` rows, across all expanded chapters.
- **AC**:
  - [ ] Filter re-renders instantly on toggle, no page reload.

---

## 5. Labs & Flashcards View Specifications (PRD-04)

### 5.1. Lab Checklist
- **User Story**: As a reader, I want to track which chapter labs I've actually built.
- **UI Component**: `Labs View Component` (`<book-view-labs>`), one `.lab-card` per chapter.
- **Flow**: card shows goal, requirements, acceptance criteria bullets, APIs used (linked to Glossary); a single "Mark lab complete" checkbox bound to `data-lab-id` calls `toggleLabDone(labId)`. `tbd` chapters show a "lab not yet defined" placeholder.
- **AC**:
  - [ ] Checking a lab contributes to the 20%-weight chapter-deliverables axis.

### 5.2. Flashcard Task Checklist
- **User Story**: As a reader, I want one checkbox per chapter confirming "I generated and reviewed my flashcard deck," without the app needing to store the deck itself.
- **UI Component**: `Labs View Component` (`.flashcard-task-row`, one per chapter, linked from `docs/content/flashcards_guide.md`).
- **Flow**: single checkbox bound to `data-flashcard-id` calls `toggleFlashcardDone(flashcardId)`.
- **AC**:
  - [ ] This is intentionally the only flashcard state the app stores — no spaced-repetition scheduling, no card content in `localStorage`.

---

## 6. Glossary View Specifications (PRD-05)

### 6.1. Search & Chapter Filter
- **UI Component**: `Glossary View Component` (`#glossary-search-input`, chapter filter chips).
- **Flow**: filter `GlossaryTerm[]` by name/description substring match and/or selected chapter id; re-render matching term cards; empty state when zero matches.
- **AC**:
  - [ ] Filtering responds on `input` event with no full reload.

### 6.2. Term Card Links
- **UI Component**: `Glossary View Component` (term card, MDN/spec link buttons).
- **Flow**: links open with `target="_blank" rel="noopener noreferrer"`.

---

## 7. Resources View Specifications (PRD-06)

### 7.1. Chapter Filter
- **UI Component**: `Resources View Component` (filter button group: "All Chapters" + per-chapter buttons).
- **Flow**: clicking a filter limits visible resource cards to the selected chapter's `Resource[]`.

### 7.2. Resource Bookmark Star
- **UI Component**: `Resources View Component` (star SVG button on each resource card).
- **Flow**: toggles `resourceFlags[resourceId]`, swaps outline/filled star icon.

### 7.3. External Link Opener
- **UI Component**: `Resources View Component` (open-link button).
- **Flow**: opens in new tab with `rel="noopener noreferrer"`.

---

## 8. Quit Criteria View Specifications (PRD-07)

### 8.1. Combined Decision Matrix
- **User Story**: As a reader, I want one place that tells me both "when should I skip this chapter" and "when am I good enough to move on without finishing every page."
- **UI Component**: `Quit Criteria View Component` (`.quit-matrix-grid`, one `.quit-module-card` per chapter).
- **Flow**: iterate over `QuitCriteriaRow[]` (from `getQuitCriteriaData()`); each card shows chapter title, a **Stop Signal** box (amber warning icon, "skip if…") and an **Exit Criteria** box (green check icon, "good enough if…").
- **AC**:
  - [ ] All 15 chapters have a row, including `tbd` chapters 14–15 (with a placeholder stop-signal/exit-criteria until real content exists).

### 8.2. Real-Time Search
- **UI Component**: `Quit Criteria View Component` (`#quit-search-input`).
- **Flow**: same as PRD-06.3 in the original roadmap tracker — lowercase substring match against chapter title, stop signal, and exit criteria text; empty-state banner on zero matches.
- **AC**:
  - [ ] Filtering responds instantly on `input`, no reload.

---

## 9. Acceptance Criteria & Component Interaction Matrix

| PRD Code | Feature | Component | Event | State Contract | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PRD-01.1 | Theme Switcher | Theme Toggle | `click` | `setThemeState()` | Toggles `data-theme`, persists. |
| PRD-01.2 | Language Switcher | Language Toggle | `click` | `setLangState()` | Repaints content bundle, ids unchanged. |
| PRD-01.3 | Export Backup | Export Action | `click` | `exportStateJSON()` | Downloads valid `.json` snapshot. |
| PRD-01.4 | Import Backup | Import Action | `click` | `importState()` | Validates & restores, rejects invalid files cleanly. |
| PRD-01.5 | Progress Reset | Reset Action | `click` | `resetProgress()` | Confirms, resets all progress to 0%. |
| PRD-01.6 | Hash Router | Navigation Bar | `hashchange` | `setActiveTabState()` | Syncs `#/route`, active tab, badge %. |
| PRD-02.1 | Metric Tiles | Dashboard | render | `calculateProgress()` | Sections read / hands-on / deliverables / focus hours. |
| PRD-02.2 | Progress Overview Card | Dashboard | render | `calculateProgress()` | Single Overall % + one gradient bar. |
| PRD-02.3 | Next Focus Card | Dashboard | `click` | `toggleRead()` / `toggleHandsOn()` | Marks recommended section/hands-on, recalculates. |
| PRD-02.4 | Chapter Progress List | Dashboard | render | `calculateProgress().chapterProgresses` | Per-chapter status badge + % row, matches Chapters tab. |
| PRD-03.1 | Always-Expanded Chapter Cards + Filter Chips | Chapters | `click` | local filter state | No accordion; `chapterFilterChipsHtml()` narrows to one chapter; `tbd` placeholder for ch.14–15. |
| PRD-03.2 | Section Checklist | Chapters | `change` | `toggleRead()` / `toggleHandsOn()` | Two independent persisted booleans per section; checkbox focus preserved across re-render. |
| PRD-03.3 | Missing Hands-on Filter | Chapters | `click` | local filter state | Shows only read-but-not-handson sections, composes with the chapter filter. |
| PRD-04.1 | Lab Checklist | Labs | `change` | `toggleLabDone()` | Contributes to 20%-weight axis. |
| PRD-04.2 | Flashcard Task Checklist | Labs | `change` | `toggleFlashcardDone()` | Contributes to 20%-weight axis, no deck content stored. |
| PRD-05.1 | Glossary Search | Glossary | `input` | `searchQuery` | Instant filter, empty state. |
| PRD-06.1 | Resource Filter | Resources | `click` | `selectedChapterId` | Filters cards by chapter. |
| PRD-06.2 | Resource Bookmark | Resources | `click` | `toggleResourceFlag()` | Toggles star icon + `resourceFlags`. |
| PRD-07.1 | Combined Decision Matrix | Quit Criteria | render | none | 15 cards, stop signal + exit criteria. |
| PRD-07.2 | Quit Criteria Search | Quit Criteria | `input` | `searchQuery` | Instant filter, empty state. |
| PRD-08.1 | Pomodoro Timer | Pomodoro | `click` | `setPomodoroSettings()` / `addPomodoroSession()` | Countdown ring, chime + notification on completion, session logged. |

---

## 10. Pomodoro View Specifications (PRD-08, own tab, tracked but not weighted)

- **UI Component**: `<book-view-pomodoro>`, its own nav tab (not embedded in Dashboard).
- **Mechanics**: identical to the sibling roadmap tracker's Schedule view — mode switch Focus/Short Break/Long Break, `25/5`/`50/5`/Custom presets, countdown + SVG progress ring (ambient glow pulses while running, swaps to emerald on break), Web Audio chime, Web Notification, session history log with delete. The only difference from the sibling project: **no task-linking dropdown** (no per-task Pomodoro assignment, since reading isn't decomposed that finely).
- **Flow**: the timer's own Custom Element keeps its running/paused state in instance fields (not `AppState`) so a global `renderAll()` from an unrelated action (e.g. toggling a section elsewhere) never interrupts a running countdown; only completing a session calls `addPomodoroSession()` and `renderAll()`.
- **Cross-view effect**: the resulting session count/duration feeds the Dashboard's "focus hours" metric tile (§3.1) — but the timer UI itself lives only on this tab, and Pomodoro sessions are never part of `calculateProgress()`'s weighted formula.
- **AC**:
  - [ ] Switching to another tab and back does not reset or pause a running timer.
  - [ ] Completing a focus session plays the chime, fires a notification (if permitted), and appends to session history.
  - [ ] Deleting a history entry updates the Dashboard's focus-hours tile.
