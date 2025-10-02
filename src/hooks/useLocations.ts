import { useState, useEffect } from "react";
import {
  fetchLocation,
  fetchLocations,
  type Location,
} from "../services/locationService";

export function useLocations(page: number, filters?: Record<string, string>) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchLocations(page, filters)
      .then((data) => {
        if (active) {
          setLocations(data.results);
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

  return { locations, totalPages, loading, error };
}

// detail hook
export function useLocation(id: number | null) {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);
    setError(null);

    fetchLocation(id)
      .then((data) => {
        if (active) setLocation(data);
      })
      .catch((err: Error) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  return { location, loading, error };
}
