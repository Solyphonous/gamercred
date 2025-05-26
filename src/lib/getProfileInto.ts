import { env } from "$env/dynamic/private";

export async function getProfileInfo(steamId: string) {
  const params = new URLSearchParams({
    key: env.STEAM_API_KEY,
    steamids: steamId.toString(),
  });

  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to get steam user info.`);
  }

  const data = await response.json();
  const playerInfo = data.response.players[0];

  return {
    displayName: playerInfo.personaname,
    profileURL: playerInfo.profileurl,
    avatarURL: playerInfo.avatarfull,
  };
}
