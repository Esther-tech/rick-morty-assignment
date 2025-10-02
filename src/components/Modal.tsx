import { type Character } from "../services/characterService";
import { type Location } from "../services/locationService";
import { type Episode } from "../services/episodeService";

type ModalData = Character | Location | Episode;

type ModalProps = {
  data: ModalData | null;
  onClose: () => void;
  loading: boolean;
};

export default function Modal({ data, onClose, loading }: ModalProps) {
  console.log(data);
  if (!data && !loading) return null;

  const isCharacter = (d: ModalData): d is Character => "status" in d;
  const isLocation = (d: ModalData): d is Location => "dimension" in d;
  const isEpisode = (d: ModalData): d is Episode => "air_date" in d;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        {loading && (
          <div className="modal-skeleton">
            <div className="skeleton header" />
            <div className="skeleton line" />
            <div className="skeleton line" />
            <div className="skeleton line" />
          </div>
        )}

        {!loading && data && (
          <>
            <div className="modal-header">
              {isCharacter(data) && <img src={data.image} alt={data.name} />}
              <h2>{data.name}</h2>
            </div>

            <div className="modal-info">
              {isCharacter(data) && (
                <>
                  <InfoRow label="Status" value={data.status} />
                  <InfoRow label="Species" value={data.species} />
                  <InfoRow label="Gender" value={data.gender} />
                  <InfoRow label="Origin" value={data.origin.name} />
                  <InfoRow label="Location" value={data.location.name} />
                </>
              )}

              {isLocation(data) && (
                <>
                  <InfoRow label="Type" value={data.type} />
                  <InfoRow label="Dimension" value={data.dimension} />
                  <InfoRow label="Residents" value={data.residents.length} />
                </>
              )}

              {isEpisode(data) && (
                <>
                  <InfoRow label="Code" value={data.episode} />
                  <InfoRow label="Air Date" value={data.air_date} />
                  <InfoRow label="Characters" value={data.characters?.length} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="info-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}
