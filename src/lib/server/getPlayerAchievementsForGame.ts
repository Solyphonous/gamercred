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
      // TODO: Replace this client message with a proper system to distinguish between REAL private profiles and TOOLS which also cause this error!
      // This is temporary!!! Replace soon as users can currently wipe someone's gamercred if they private!!!
      clientMessage(
        "Your game details may be private! Make sure your game details are set to public on your steam profile settings. If this error does not appear to cause issue, the steam API may be malfunctioning (such as if you have tools in your library).",
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
