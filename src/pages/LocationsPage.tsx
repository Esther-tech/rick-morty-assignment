import { useState } from "react";
import { useLocations } from "../hooks/useLocations";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { type Location } from "../services/locationService";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

export default function LocationsPage() {
  const [page, setPage] = useState(1);
  const { locations, totalPages, loading, error } = useLocations(page);
  const [selected, setSelected] = useState<Location | null>(null);

  return (
    <div className="page">
      <h1>Locations</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {locations.map((loc) => (
          <Card key={loc.id} data={loc} onClick={setSelected} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
