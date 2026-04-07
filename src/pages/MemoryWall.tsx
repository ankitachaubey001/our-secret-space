import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useMemories } from "../hooks/useMemories";
import PasswordGate from "../components/memory/PasswordGate";
import StatsBar from "../components/memory/StatsBar";
import CountdownPanel from "../components/memory/CountdownPanel";
import MemoryFilters from "../components/memory/MemoryFilters";
import MemoryGrid from "../components/memory/MemoryGrid";
import AddMemoryModal from "../components/AddMemoryModal";

type ViewMode = "grid" | "timeline";

export default function MemoryWall() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [searchParams] = useSearchParams();
  if (searchParams.get("add") === "true" && !showModal) setShowModal(true);

  const {
    activeMemories, deletedMemories, stats,
    nextSpecialDay,
    handleAddMemory, handleToggleFavorite,
    handleSoftDelete, handleRestore, handleDeleteForever,
  } = useMemories(isUnlocked);

  const tags = useMemo(() => {
    const set = new Set(activeMemories.map((m) => m.tag).filter(Boolean) as string[]);
    return ["all", ...Array.from(set)];
  }, [activeMemories]);

  const filteredMemories = useMemo(() => {
    const base = showDeleted ? deletedMemories : activeMemories;
    return base.filter((m) => {
      const text = searchTerm.toLowerCase();
      const matchSearch =
        m.title.toLowerCase().includes(text) ||
        m.message.toLowerCase().includes(text) ||
        m.tag?.toLowerCase().includes(text);
      const matchTag = tagFilter === "all" || m.tag === tagFilter;
      const matchFav = !showFavoritesOnly || m.isFavorite;
      const d = m.date ? new Date(m.date) : null;
      const fromOk = dateFrom ? (d ? d >= new Date(dateFrom) : false) : true;
      const toOk = dateTo ? (d ? d <= new Date(dateTo) : false) : true;
      return matchSearch && matchTag && matchFav && fromOk && toOk;
    });
  }, [activeMemories, deletedMemories, showDeleted, searchTerm, tagFilter, showFavoritesOnly, dateFrom, dateTo]);

  if (!isUnlocked) return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;

  return (
    <div className="page-shell">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title">Memory Wall</h1>
            <p className="section-subtitle mt-1">A visual timeline of your favorite shared moments.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleted((p) => !p)} className="btn-outline">
              {showDeleted ? "View active" : "View trash"}
            </button>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Add memory
            </button>
          </div>
        </div>

        {/* <StatsBar {...stats} /> */}

        {/* <section>
          <CountdownPanel nextSpecialDay={nextSpecialDay} activeMemories={activeMemories} />
        </section> */}

        <MemoryFilters
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          tagFilter={tagFilter} setTagFilter={setTagFilter} tags={tags}
          dateFrom={dateFrom} setDateFrom={setDateFrom}
          dateTo={dateTo} setDateTo={setDateTo}
          showFavoritesOnly={showFavoritesOnly} setShowFavoritesOnly={setShowFavoritesOnly}
          viewMode={viewMode} setViewMode={setViewMode}
        />

        <MemoryGrid
          memories={filteredMemories}
          viewMode={viewMode}
          showDeleted={showDeleted}
          onToggleFavorite={handleToggleFavorite}
          onSoftDelete={handleSoftDelete}
          onRestore={handleRestore}
          onDeleteForever={handleDeleteForever}
          onAddFirst={() => setShowModal(true)}
        />

        {showModal && (
          <AddMemoryModal
            onClose={() => setShowModal(false)}
            onSubmit={async (data) => { await handleAddMemory(data); setShowModal(false); }}
          />
        )}
      </div>
    </div>
  );
}
