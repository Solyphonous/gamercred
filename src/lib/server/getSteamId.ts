import { env } from "$env/dynamic/private";

export async function getSteamId(vanity: string): Promise<string> {
  const params = new URLSearchParams({
    key: env.STEAM_API_KEY,
    vanityurl: vanity,
  });

  const profileUrls = [
    "https://steamcommunity.com/id/",
    "https://steamcommunity.com/profiles/",
  ];

  if (
    !isNaN(+vanity) ||
    vanity.startsWith(profileUrls[1]) ||
    vanity.startsWith(profileUrls[2])
  ) {
    return vanity;
  }

  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1?${params.toString()}`,
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
