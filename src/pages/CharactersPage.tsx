import { useState } from "react";
import { useCharacter, useCharacters } from "../hooks/useCharacters";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { mapCharacterToCard } from "../utils/mapToCardData";
import { characterFilterConfigs } from "../utils/filterConfig";
import Filters from "../components/Filters";

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { characters, totalPages, loading, error } = useCharacters(
    page,
    filters
  );
  const [showFilters, setShowFilters] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { character, loading: detailLoading } = useCharacter(selectedId);

  const handleFilterApply = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="page">
      <h1>Characters</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

      <button
        className="btn btn-toggle-filters"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilters && (
        <Filters configs={characterFilterConfigs} onApply={handleFilterApply} />
      )}

      <div className="grid">
        {characters.map((c) => (
          <Card
            key={c.id}
            data={mapCharacterToCard(c)}
            onClick={() => setSelectedId(c.id)}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {selectedId && (
        <Modal
          data={character}
          onClose={() => setSelectedId(null)}
          loading={detailLoading}
        />
      )}
    </div>
  );
}
