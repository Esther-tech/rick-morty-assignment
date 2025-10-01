import { type Character } from "../services/characterService";

import { type Location } from "../services/locationService";

type CardData = Character | Location;

type CardProps<T extends CardData> = {
  data: T;
  onClick: (data: T) => void;
};

export default function Card<T extends CardData>({
  data,
  onClick,
}: CardProps<T>) {
  return (
    <div className="card" onClick={() => onClick(data)}>
      {"image" in data && <img src={data.image} alt={data.name} />}
      <div className="card-content">
        <h3 title={data.name}>{data.name}</h3>

        {"species" in data && <p>{data.species}</p>}
        {"status" in data && (
          <p className="statusText">
            <span
              className={`statusIndicator ${data.status.toLowerCase()}`}
            ></span>
            {data.status}
          </p>
        )}
        {"dimension" in data && data.dimension && (
          <p>Dimension: {data.dimension}</p>
        )}
      </div>
    </div>
  );
}
