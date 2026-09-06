import type { FlashcardTask } from "../../types/appState";

export const FLASHCARD_TASKS: FlashcardTask[] = Array.from({ length: 15 }, (_, i) => ({
  id: `fc-ch-${i + 1}`,
  chapterId: `ch-${i + 1}`,
}));
