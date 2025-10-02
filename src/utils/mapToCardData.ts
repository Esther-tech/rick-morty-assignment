import { type Character } from "../services/characterService";
import { type Location } from "../services/locationService";
import { type Episode } from "../services/episodeService";
import { type BaseCardData } from "../types/baseCardData";

function createErrorCard(): BaseCardData {
  return {
    id: -1,
    name: "Something went wrong",
    subtitle: "",
    description: "",
  };
}

export function mapCharacterToCard(character?: Character): BaseCardData {
  if (!character) {
    console.error("mapCharacterToCard received invalid input");
    return createErrorCard();
  }

  return {
    id: character.id,
    name: character.name,
    subtitle: character.species,
    description: character.status,
    image: character.image,
  };
}

export function mapLocationToCard(location?: Location): BaseCardData {
  if (!location) {
    console.error("mapLocationToCard received invalid input");
    return createErrorCard();
  }

  return {
    id: location.id,
    name: location.name,
    subtitle: location.type,
    description: location.dimension,
  };
}

export function mapEpisodeToCard(ep?: Episode): BaseCardData {
  if (!ep) {
    console.error("mapEpisodeToCard received invalid input");
    return createErrorCard();
  }

  return {
    id: ep.id,
    name: ep.name,
    subtitle: ep.episode,
    description: ep.air_date,
  };
}
