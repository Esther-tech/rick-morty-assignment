import { useEffect, useState } from "react";
import { fetchCharacters, type Character } from "../services/characterService";

export function useCharacters(page: number, status?: string, species?: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchCharacters(page)
      .then((data) => {
        if (active) {
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        }
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, status, species]);

  return { characters, totalPages, loading, error };
}
