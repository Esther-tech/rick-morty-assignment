import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import { type Character } from "../services/characterService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const { characters, totalPages, loading, error } = useCharacters(page);
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <div className="page">
      <h1>Characters</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} onClick={setSelected} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>
            {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <CharacterModal character={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
