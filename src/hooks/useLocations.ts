import { useState, useEffect } from "react";
import { fetchLocations, type Location } from "../services/locationService";

export function useLocations(page: number, type?: string, dimension?: string) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchLocations(page)
      .then((data) => {
        if (active) {
          let filtered = data.results;

          if (type) {
            filtered = filtered.filter((loc) =>
              loc.type.toLowerCase().includes(type.toLowerCase())
            );
          }
          if (dimension) {
            filtered = filtered.filter((loc) =>
              loc.dimension.toLowerCase().includes(dimension.toLowerCase())
            );
          }

          setLocations(filtered);
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
  }, [page, type, dimension]);

  return { locations, totalPages, loading, error };
}
