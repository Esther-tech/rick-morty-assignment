export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // array of character URLs
};

type ApiResponse = {
  info: { pages: number; next: string | null; prev: string | null };
  results: Location[];
};

export async function fetchLocations(page = 1): Promise<ApiResponse> {
  const url = `https://rickandmortyapi.com/api/location?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch locations: ${res.status}`);
  }
  return res.json();
}

export async function fetchLocation(id: number): Promise<Location> {
  const url = `https://rickandmortyapi.com/api/location/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch location: ${res.status}`);
  return res.json();
}
