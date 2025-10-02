import type { FilterConfig } from "../components/Filters";

export const characterFilterConfigs: FilterConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Search name...",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "alive", label: "Alive" },
      { value: "dead", label: "Dead" },
      { value: "unknown", label: "Unknown" },
    ],
  },
  {
    name: "species",
    label: "Species",
    type: "text",
    placeholder: "e.g., Human, Alien",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "genderless", label: "Genderless" },
      { value: "unknown", label: "Unknown" },
    ],
  },
];

export const locationFilterConfigs: FilterConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Search location...",
  },
  {
    name: "type",
    label: "Type",
    type: "text",
    placeholder: "e.g., Planet, Space station",
  },
  {
    name: "dimension",
    label: "Dimension",
    type: "text",
    placeholder: "e.g., C-137",
  },
];

export const episodeFilterConfigs: FilterConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Search episode...",
  },
  {
    name: "episode",
    label: "Episode Code",
    type: "text",
    placeholder: "e.g., S01E01",
  },
];
