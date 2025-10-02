import { useEffect, useState } from "react";
import {
  fetchEpisode,
  fetchEpisodes,
  type Episode,
} from "../services/episodeService";

export function useEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchEpisodes(page)
      .then((data) => {
        if (!active) return;
        setEpisodes((prev) => [...prev, ...data.results]); // append!
        setTotalPages(data.info.pages);
      })
      .catch((err: Error) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [page]);

  const loadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return { episodes, loadMore, loading, error, page, totalPages };
}

// detail hook
export function useEpisode(id: number | null) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);

    fetchEpisode(id)
      .then((data) => {
        if (active) setEpisode(data);
      })
      .catch((err: Error) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  return { episode, loading, error };
}
