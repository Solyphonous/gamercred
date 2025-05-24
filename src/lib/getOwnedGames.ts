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
    throw new Error("Error fetching owned games! Please try again.");
  }

  const data = await response.json();

  if (Object.keys(data.response).length == 0) {
    throw new Error(
      "No owned games detected. Are your steam profile and game details privacy settings set to public?",
    );
  }

  return data.response.games;
}
