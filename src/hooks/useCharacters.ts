import { useEffect, useState } from "react";
import {
  fetchCharacter,
  fetchCharacters,
  type Character,
} from "../services/characterService";

export function useCharacters(page: number, filters?: Record<string, string>) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchCharacters(page, filters)
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
  }, [page, filters]);

  return { characters, totalPages, loading, error };
}

// detail hook
export function useCharacter(id: number | null) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);
    setError(null);

    fetchCharacter(id)
      .then((data) => {
        if (active) setCharacter(data);
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
  }, [id]);

  return { character, loading, error };
}
