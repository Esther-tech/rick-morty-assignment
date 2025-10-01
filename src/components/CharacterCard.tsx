import { type Character } from "../services/characterService";

type CharacterCardProps = {
  character: Character;
  onClick: (char: Character) => void;
};

export default function CharacterCard({
  character,
  onClick,
}: CharacterCardProps) {
  return (
    <div className="card" onClick={() => onClick(character)}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
      <p className="statusText">
        <span
          className={`statusIndicator ${character.status.toLowerCase()}`}
        ></span>
        {character.status}
      </p>
    </div>
  );
}
