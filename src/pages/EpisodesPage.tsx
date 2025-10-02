import { mapEpisodeToCard } from "../utils/mapToCardData";
import Card from "../components/Card";
import { useState } from "react";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEpisode, useEpisodes } from "../hooks/useEpisodes";
import { episodeFilterConfigs } from "../utils/filterConfig";
import Filters from "../components/Filters";

export default function EpisodesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { episode, loading: detailLoading } = useEpisode(selectedId);

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const { episodes, loadMore, loading, error, page, totalPages } =
    useEpisodes(filters);

  return (
    <div className="page">
      <h1>Episodes</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}

      <button
        className="btn btn-toggle-filters"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilters && (
        <Filters configs={episodeFilterConfigs} onApply={setFilters} />
      )}

      <div className="grid">
        {episodes.map((ep) => (
          <Card
            key={ep.id}
            data={mapEpisodeToCard(ep)}
            onClick={() => setSelectedId(ep.id)}
          />
        ))}
      </div>

      {page < totalPages && !loading && (
        <div className="pagination">
          <button className="load-more" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}

      {selectedId && (
        <Modal
          data={episode}
          loading={detailLoading}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
