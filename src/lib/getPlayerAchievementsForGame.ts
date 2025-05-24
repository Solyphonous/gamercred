import { STEAM_API_KEY } from "$env/static/private";

export async function getPlayerAchievementsForGame(
  steamId: number,
  ownedGame: ownedGame,
  clientMessage: (message: string) => void,
): Promise<string[]> {
  const params = new URLSearchParams({
    key: STEAM_API_KEY,
    steamid: steamId.toString(),
    appid: ownedGame.appid.toString(),
  });

  const response: Response = await fetch(
    `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?${params.toString()}`,
  );

  if (!response.ok) {
    clientMessage(`${ownedGame.name} has no achievements.`);
    return [];
  }

  const data = await response.json();

  const unlockedAchievements: string[] = [];

  if (!data.error && data.playerstats.achievements !== undefined) {
    for (const achievement of data.playerstats.achievements) {
      if (achievement.achieved) {
        unlockedAchievements.push(achievement.apiname);
      }
    }
  }

  clientMessage(
    `Got ${unlockedAchievements.length} unlocked achievements for ${ownedGame.name}...`,
  );

  return unlockedAchievements;
}
