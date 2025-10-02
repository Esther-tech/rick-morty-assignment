import { useState } from "react";
import { useCharacter, useCharacters } from "../hooks/useCharacters";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { mapCharacterToCard } from "../utils/mapToCardData";

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const { characters, totalPages, loading, error } = useCharacters(page);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { character, loading: detailLoading } = useCharacter(selectedId);

  return (
    <div className="page">
      <h1>Characters</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

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
