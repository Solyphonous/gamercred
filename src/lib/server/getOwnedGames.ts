import { env } from "$env/dynamic/private";

export async function getOwnedGames(steamId: string): Promise<ownedGame[]> {
  const params = new URLSearchParams({
    key: env.STEAM_API_KEY,
    steamid: steamId.toString(),
    include_appinfo: "true",
    include_played_free_games: "true",
  });
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      "Error fetching owned games! Please try again, as sometimes steam fails to return a valid response.",
    );
  }

  const data = await response.json();

  if (Object.keys(data.response).length == 0) {
    throw new Error(
      "No owned games detected. Are your steam profile and game details privacy settings set to public?",
    );
  }

  return data.response.games;
}
