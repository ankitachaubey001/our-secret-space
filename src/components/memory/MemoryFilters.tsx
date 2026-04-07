type ViewMode = "grid" | "timeline";

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  tagFilter: string;
  setTagFilter: (v: string) => void;
  tags: string[];
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (v: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
};

export default function MemoryFilters({
  searchTerm, setSearchTerm,
  tagFilter, setTagFilter, tags,
  dateFrom, setDateFrom,
  dateTo, setDateTo,
  showFavoritesOnly, setShowFavoritesOnly,
  viewMode, setViewMode,
}: Props) {
  const hasActiveFilters =
    searchTerm || tagFilter !== "all" || dateFrom || dateTo || showFavoritesOnly;

  const clearAll = () => {
    setSearchTerm("");
    setTagFilter("all");
    setDateFrom("");
    setDateTo("");
    setShowFavoritesOnly(false);
  };

  return (
    <section className="page-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, note, or tag…"
          className="input-field flex-1"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "btn-primary" : "btn-outline"}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={viewMode === "timeline" ? "btn-primary" : "btn-outline"}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagFilter(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              tagFilter === tag
                ? "bg-rose-600 text-white border-rose-600"
                : "border-slate-200 text-slate-600 hover:border-rose-300"
            }`}
          >
            {tag === "all" ? "All" : tag}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-3 flex-wrap">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="input-field"
          />
          <span className="self-center text-slate-400 text-sm">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="input-field"
          />
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            className="accent-rose-500"
          />
          Favorites only
        </label>

        {hasActiveFilters && (
          <button onClick={clearAll} className="text-xs text-rose-500 hover:underline">
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}