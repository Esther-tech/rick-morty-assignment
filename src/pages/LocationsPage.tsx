import { useState } from "react";
import { useLocation, useLocations } from "../hooks/useLocations";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { mapLocationToCard } from "../utils/mapToCardData";
import { locationFilterConfigs } from "../utils/filterConfig";
import Filters from "../components/Filters";

export default function LocationsPage() {
  const [page, setPage] = useState(1);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const { locations, totalPages, loading, error } = useLocations(page, filters);
  const { location, loading: detailLoading } = useLocation(selectedId);

  const handleFilterApply = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="page">
      <h1>Locations</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

      <button
        className="btn btn-toggle-filters"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilters && (
        <Filters configs={locationFilterConfigs} onApply={handleFilterApply} />
      )}

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
