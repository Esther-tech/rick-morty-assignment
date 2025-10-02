import { type Character } from "../services/characterService";
import { type Location } from "../services/locationService";
import { type Episode } from "../services/episodeService";
import { type BaseCardData } from "../types/baseCardData";

export function mapCharacterToCard(character: Character): BaseCardData {
  return {
    id: character.id,
    name: character.name,
    subtitle: character.species,
    description: character.status,
    image: character.image,
  };
}

export function mapLocationToCard(location: Location): BaseCardData {
  return {
    id: location.id,
    name: location.name,
    subtitle: location.type,
    description: location.dimension,
  };
}

export function mapEpisodeToCard(ep: Episode): BaseCardData {
  return {
    id: ep.id,
    name: ep.name,
    subtitle: ep.episode,
    description: ep.air_date,
  };
}
