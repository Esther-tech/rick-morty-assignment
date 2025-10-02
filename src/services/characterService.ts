export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
};

type ApiResponse = {
  info: { pages: number; next: string | null; prev: string | null };
  results: Character[];
};

export async function fetchCharacters(
  page: number,
  filters?: Record<string, string>
): Promise<ApiResponse> {
  let url = `https://rickandmortyapi.com/api/character?page=${page}`;

  if (filters) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) queryParams.append(key, value);
    }
    const queryString = queryParams.toString();
    if (queryString) url += `&${queryString}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch characters: ${res.status}`);
  }
  return res.json();
}

export async function fetchCharacter(id: number): Promise<Character> {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch character: ${res.status}`);
  return res.json();
}
