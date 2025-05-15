import { STEAM_API_KEY } from "$env/static/private";

export async function getSteamId(vanity: string): Promise<number> {
  const params = new URLSearchParams({
    key: STEAM_API_KEY,
    vanityurl: vanity,
  });

  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching SteamId!");
  }

  const data = await response.json();

  if (!(data.response.success === 1)) {
    throw new Error(
      `Error from Steam while fetching SteamId: "${data.response.message}"`,
    );
  }

  const steamId = data.response.steamid;
  return steamId;
}
