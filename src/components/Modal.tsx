import { type Character } from "../services/characterService";
import { type Location } from "../services/locationService";

type ModalData = Character | Location;

type ModalProps = {
  data: ModalData | null;
  onClose: () => void;
};

export default function Modal({ data, onClose }: ModalProps) {
  if (!data) return null;

  const isCharacter = (d: ModalData): d is Character => "status" in d;

  const modalData = isCharacter(data)
    ? [
        { label: "Status", value: data.status },
        { label: "Species", value: data.species },
        { label: "Gender", value: data.gender },
        { label: "Origin", value: data.origin.name },
        { label: "Location", value: data.location.name },
      ]
    : [
        { label: "Type", value: data.type },
        { label: "Dimension", value: data.dimension },
        { label: "Residents", value: data.residents.length },
      ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        {isCharacter(data) && (
          <div className="modal-header">
            <img src={data.image} alt={data.name} />
            <h2>{data.name}</h2>
          </div>
        )}

        {!isCharacter(data) && (
          <div className="modal-header">
            <h2>{data.name}</h2>
          </div>
        )}

        <div className="modal-info">
          {modalData.map((item) => (
            <div key={item.label} className="info-row">
              <span className="label">{item.label}</span>
              <span className="value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
