import { useMemo, useState, useEffect } from "react";
import type { Memory, MemoryFormData, SpecialDay } from "../types/globle";
import {
  addMemoryToFirestore,
  deleteMemoryPermanently,
  fetchMemories,
  fetchSpecialDays,
  restoreMemory,
  softDeleteMemory,
  toggleMemoryFavorite,
} from "../libs/firestoreHelpers";

export function useMemories(isUnlocked: boolean) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [specialDays, setSpecialDays] = useState<SpecialDay[]>([]);

  const refresh = async () => {
    const updated = await fetchMemories();
    setMemories(updated);
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchMemories().then(setMemories);
      fetchSpecialDays().then(setSpecialDays);
    }
  }, [isUnlocked]);

  const handleAddMemory = async (formData: MemoryFormData) => {
    await addMemoryToFirestore(formData);
    await refresh();
    alert("Memory added successfully.");
  };

  const handleToggleFavorite = async (memory: Memory) => {
    await toggleMemoryFavorite(memory.id, !!memory.isFavorite);
    await refresh();
  };

  const handleSoftDelete = async (memoryId: string) => {
    await softDeleteMemory(memoryId);
    await refresh();
  };

  const handleRestore = async (memoryId: string) => {
    await restoreMemory(memoryId);
    await refresh();
  };

  const handleDeleteForever = async (memoryId: string) => {
    await deleteMemoryPermanently(memoryId);
    await refresh();
  };

  const activeMemories = useMemo(
    () => memories.filter((m) => !m.deletedAt),
    [memories]
  );

  const deletedMemories = useMemo(
    () => memories.filter((m) => !!m.deletedAt),
    [memories]
  );

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = activeMemories.filter(
      (m) =>
        m.date?.getMonth?.() === now.getMonth() &&
        m.date?.getFullYear?.() === now.getFullYear()
    ).length;
    return {
      total: activeMemories.length,
      favorites: activeMemories.filter((m) => m.isFavorite).length,
      thisMonth,
    };
  }, [activeMemories]);

  const nextSpecialDay = useMemo(() => {
    if (!specialDays.length) return null;
    const today = new Date();
    return specialDays
      .map((day) => {
        const d = new Date(day.date);
        const target = new Date(today.getFullYear(), d.getMonth(), d.getDate());
        if (target < today) target.setFullYear(today.getFullYear() + 1);
        return { ...day, target };
      })
      .sort((a, b) => a.target.getTime() - b.target.getTime())[0] ?? null;
  }, [specialDays]);

  return {
    activeMemories,
    deletedMemories,
    stats,
    nextSpecialDay,
    handleAddMemory,
    handleToggleFavorite,
    handleSoftDelete,
    handleRestore,
    handleDeleteForever,
  };
}
