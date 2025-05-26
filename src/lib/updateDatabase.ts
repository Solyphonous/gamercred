import { env } from "$env/dynamic/private";
import { query } from "./db";

export async function updateDatabase(ownedGame: ownedGame) {
  console.log(`Creating/updating database entries for ${ownedGame.name}`);
  await query(
    `
    INSERT INTO games (appid, name) VALUES ($1, $2)
    ON CONFLICT (appid) DO UPDATE
    SET last_updated = NOW();
    `,
    [ownedGame.appid.toString(), ownedGame.name],
  );

  // Fetch achievement percentages for game
  const percentagesResponse = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${ownedGame.appid}&format=json`,
  );
  if (!percentagesResponse.ok) {
    console.log(`Failed achievement percentage get for ${ownedGame.name}`);
    return;
  }
  const percentageData = await percentagesResponse.json();

  if (Object.keys(percentageData).length === 0) {
    return;
  }

  const achievementPercentages: AchievementPercentage[] =
    percentageData.achievementpercentages.achievements;

  // Fetch achievement details for game
  const achievementQuery = new URLSearchParams({
    key: env.STEAM_API_KEY,
    appid: ownedGame.appid.toString(),
  });
  const achievementsResponse = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?${achievementQuery.toString()}`,
  );
  if (!achievementsResponse.ok) {
    console.log(`Failed achievement info get for ${ownedGame.name}`);
  }
  const achievementData = await achievementsResponse.json();

  const achievementInfo: AchievementInfo[] =
    achievementData.game.availableGameStats.achievements;

  const infoMap = new Map<string, AchievementInfo>(
    achievementInfo.map((item) => [item.name, item]),
  );

  const achievements = achievementPercentages.map(
    (achievementPercentageObject) => ({
      ...achievementPercentageObject,
      ...infoMap.get(achievementPercentageObject.name),
    }),
  );

  for (const achievement of achievements) {
    await query(
      `
      INSERT INTO achievements (achievement_name, appid, display_name, icon, unlock_percentage)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (achievement_name, appid) DO
      UPDATE SET unlock_percentage = $5
      `,
      [
        achievement.name,
        ownedGame.appid.toString(),
        achievement.displayName?.toString() || "!!!NONAME!!!", // Yes this is dumb. No I don't know how else to fix this stupid type error!
        achievement.icon?.toString() || "/images/favicon.png",
        achievement.percent.toString(),
      ],
    );
  }
}
