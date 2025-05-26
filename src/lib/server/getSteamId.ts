import { env } from "$env/dynamic/private";

function removeMatchingStart(str: string, start: string) {
  if (str.startsWith(start)) {
    str = str.replace(start, "");
  }
  return str;
}

export async function getSteamId(vanity: string): Promise<string> {
  const profileUrls = [
    "https://steamcommunity.com/id/",
    "https://steamcommunity.com/profiles/",
  ];

  for (const profileUrl of profileUrls) {
    vanity = removeMatchingStart(vanity, profileUrl);
  }

  if (!isNaN(+vanity)) {
    return vanity;
  }

  console.log(vanity);

  const params = new URLSearchParams({
    key: env.STEAM_API_KEY,
    vanityurl: vanity,
  });

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
