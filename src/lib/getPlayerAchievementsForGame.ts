import { STEAM_API_KEY } from "$env/static/private";

export async function getPlayerAchievementsForGame(
  steamId: number,
  ownedGame: ownedGame,
  clientMessage: (message: string, eventType?: string) => boolean,
): Promise<playerAchievement[]> {
  const params = new URLSearchParams({
    key: STEAM_API_KEY,
    steamid: steamId.toString(),
    appid: ownedGame.appid.toString(),
  });

  const response: Response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?${params.toString()}`,
  );

  if (!response.ok) {
    clientMessage(`${ownedGame.name} has no achievements.`);
    return [];
  }

  const data = await response.json();

  const unlockedAchievements = [];

  if (!data.error && data.playerstats.achievements !== undefined) {
    for (const achievement of data.playerstats.achievements) {
      if (achievement.achieved == 1) {
        unlockedAchievements.push({
          apiname: achievement.apiname,
          appid: String(ownedGame.appid),
        });
      }
    }
  }

  clientMessage(
    `Got ${unlockedAchievements.length} unlocked achievements for ${ownedGame.name}...`,
  );

  return unlockedAchievements;
}
