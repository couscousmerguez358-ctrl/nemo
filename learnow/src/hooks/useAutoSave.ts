import { useEffect, useState, useCallback } from "react";
import Dexie, { type Table } from "dexie";

// Define Learnow local Dexie IndexedDB
export interface LessonState {
  id: string;
  code: string;
  lastSaved: number;
}

class LearnowDatabase extends Dexie {
  lessonStates!: Table<LessonState>;

  constructor() {
    super("LearnowDatabase");
    this.version(1).stores({
      lessonStates: "id",
    });
  }
}

export const db = new LearnowDatabase();

export function useAutoSave(lessonId: string, initialCode: string) {
  const [code, setCode] = useState(initialCode);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  // Restore saved state from IndexedDB on mount
  useEffect(() => {
    let active = true;

    const restoreState = async () => {
      try {
        const saved = await db.lessonStates.get(lessonId);
        if (saved && active) {
          setCode(saved.code);
          setLastSaved(saved.lastSaved);
        } else if (active) {
          setCode(initialCode);
          setLastSaved(null);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération depuis IndexedDB :", err);
      }
    };

    restoreState();

    return () => {
      active = false;
    };
  }, [lessonId, initialCode]);

  // Debounced auto-save function
  useEffect(() => {
    if (!code || code === initialCode) return;

    const delayDebounceFn = setTimeout(async () => {
      setIsSaving(true);
      try {
        const timestamp = Date.now();
        await db.lessonStates.put({
          id: lessonId,
          code,
          lastSaved: timestamp,
        });
        setLastSaved(timestamp);
      } catch (err) {
        console.error("Erreur de sauvegarde automatique IndexedDB :", err);
      } finally {
        setIsSaving(false);
      }
    }, 2000); // 2 seconds auto-save debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [code, lessonId, initialCode]);

  const forceSave = useCallback(async (customCode: string) => {
    setIsSaving(true);
    try {
      const timestamp = Date.now();
      await db.lessonStates.put({
        id: lessonId,
        code: customCode,
        lastSaved: timestamp,
      });
      setCode(customCode);
      setLastSaved(timestamp);
    } catch (err) {
      console.error("Erreur de sauvegarde IndexedDB forcée :", err);
    } finally {
      setIsSaving(false);
    }
  }, [lessonId]);

  return {
    code,
    setCode,
    isSaving,
    lastSaved,
    forceSave,
  };
}
