export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

type ApiResponse = {
  info: { pages: number; next: string | null; prev: string | null };
  results: Episode[];
};

export async function fetchEpisodes(
  page = 1,
  filters?: Record<string, string>
): Promise<ApiResponse> {
  let url = `https://rickandmortyapi.com/api/episode?page=${page}`;

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
    throw new Error(`Failed to fetch episodes: ${res.status}`);
  }
  return res.json();
}

export async function fetchEpisode(id: number): Promise<Episode> {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch episode: ${res.status}`);
  return res.json();
}
