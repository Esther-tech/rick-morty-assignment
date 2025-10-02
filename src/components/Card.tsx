import { type BaseCardData } from "../types/baseCardData";

type CardProps = {
  data: BaseCardData;
  onClick: (data: BaseCardData) => void;
};

export default function Card({ data, onClick }: CardProps) {
  return (
    <div className="card" onClick={() => onClick(data)}>
      {data.image && <img src={data.image} alt={data.name} />}

      <div className="card-content">
        <h3 title={data.name}>{data.name}</h3>
        {data.subtitle && <p>{data.subtitle}</p>}
        {data.description && <p>{data.description}</p>}
      </div>
    </div>
  );
}
