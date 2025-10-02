import { mapEpisodeToCard } from "../utils/mapToCardData";
import Card from "../components/Card";
import { useState } from "react";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEpisode, useEpisodes } from "../hooks/useEpisodes";

export default function EpisodesPage() {
  const { episodes, loadMore, loading, error, page, totalPages } =
    useEpisodes();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { episode, loading: detailLoading } = useEpisode(selectedId);

  return (
    <div className="page">
      <h1>Episodes</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
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
