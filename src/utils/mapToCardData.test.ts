import { describe, it, expect } from "vitest";
import {
  mapCharacterToCard,
  mapLocationToCard,
  mapEpisodeToCard,
} from "./mapToCardData";
import type { Character } from "../services/characterService";
import type { Location } from "../services/locationService";
import type { Episode } from "../services/episodeService";

describe("mapToCardData helpers", () => {
  it("maps a valid Character to BaseCardData", () => {
    const character: Character = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "https://example.com/rick.png",
      gender: "Male",
      origin: { name: "Earth" },
      location: { name: "Earth" },
    };

    const result = mapCharacterToCard(character);
    expect(result).toEqual({
      id: 1,
      name: "Rick Sanchez",
      subtitle: "Human",
      description: "Alive",
      image: "https://example.com/rick.png",
    });
  });

  it("maps a valid Location to BaseCardData", () => {
    const location: Location = {
      id: 10,
      name: "Earth (C-137)",
      type: "Planet",
      dimension: "Dimension C-137",
      residents: [],
    };

    const result = mapLocationToCard(location);
    expect(result).toEqual({
      id: 10,
      name: "Earth (C-137)",
      subtitle: "Planet",
      description: "Dimension C-137",
    });
  });

  it("maps a valid Episode to BaseCardData", () => {
    const episode: Episode = {
      id: 5,
      name: "Meeseeks and Destroy",
      air_date: "January 20, 2014",
      episode: "S01E05",
      characters: [],
    };

    const result = mapEpisodeToCard(episode);
    expect(result).toEqual({
      id: 5,
      name: "Meeseeks and Destroy",
      subtitle: "S01E05",
      description: "January 20, 2014",
    });
  });

  it("returns error card for undefined Character", () => {
    const result = mapCharacterToCard(undefined);
    expect(result).toEqual({
      id: -1,
      name: "Something went wrong",
      subtitle: "",
      description: "",
    });
  });
});
