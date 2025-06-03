import { env } from "$env/dynamic/private";

export async function getPlayerAchievementsForGame(
  steamId: string,
  ownedGame: ownedGame,
  clientMessage: (message: string, eventType?: string) => boolean,
): Promise<playerAchievement[]> {
  const params = new URLSearchParams({
    key: env.STEAM_API_KEY,
    steamid: steamId.toString(),
    appid: ownedGame.appid.toString(),
  });

  const response: Response = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?${params.toString()}`,
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.playerstats.error == "Profile is not public") {
      throw new Error(
        "Your game details are private! Make sure your game details are set to public on your steam profile settings.",
      );
    }

    clientMessage(`${ownedGame.name} has no achievements.`);
    return [];
  }

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
