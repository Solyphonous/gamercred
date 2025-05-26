import { env } from "$env/dynamic/private";

export async function getSteamId(vanity: string): Promise<string> {
  const params = new URLSearchParams({
    key: env.STEAM_API_KEY,
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
    if (data.response.message == "No match") {
      try {
        Number(vanity);
        return vanity;
      } catch {
        throw new Error(
          `Error from Steam while fetching SteamId: "${data.response.message}"`,
        );
      }
    }
    throw new Error(
      `Error from Steam while fetching SteamId: "${data.response.message}"`,
    );
  }

  const steamId = data.response.steamid;
  return steamId;
}
