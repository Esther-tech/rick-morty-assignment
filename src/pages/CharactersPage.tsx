import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import Card from "../components/Card";
import { type Character } from "../services/characterService";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

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
          <Card key={c.id} data={c} onClick={setSelected} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
