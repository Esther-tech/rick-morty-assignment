import { type Character } from "../services/characterService";

type CharacterModalProps = {
  character: Character | null;
  onClose: () => void;
};

export default function CharacterModal({
  character,
  onClose,
}: CharacterModalProps) {
  if (!character) return null;

  const modalData = [
    { label: "Status", value: character.status },
    { label: "Species", value: character.species },
    { label: "Gender", value: character.gender },
    { label: "Origin", value: character.origin.name },
    { label: "Location", value: character.location.name },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <div className="modal-header">
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
        </div>

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
