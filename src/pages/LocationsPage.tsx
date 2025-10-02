import { useState } from "react";
import { useLocation, useLocations } from "../hooks/useLocations";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { mapLocationToCard } from "../utils/mapToCardData";

export default function LocationsPage() {
  const [page, setPage] = useState(1);
  const { locations, totalPages, loading, error } = useLocations(page);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { location, loading: detailLoading } = useLocation(selectedId);

  return (
    <div className="page">
      <h1>Locations</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {locations.map((loc) => (
          <Card
            key={loc.id}
            data={mapLocationToCard(loc)}
            onClick={() => setSelectedId(loc.id)}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {selectedId && (
        <Modal
          data={location}
          loading={detailLoading}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
