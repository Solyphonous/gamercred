import { STEAM_API_KEY } from "$env/static/private";

export async function getOwnedGames(steamId: number): Promise<ownedGame[]> {
  const params = new URLSearchParams({
    key: STEAM_API_KEY,
    steamid: steamId.toString(),
    include_appinfo: "true",
    include_played_free_games: "true",
  });
  const response = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching owned games!");
  }

  const data = await response.json();
  return data.response.games;
}
