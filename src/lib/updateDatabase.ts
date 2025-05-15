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

  const response = await fetch(
    `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${ownedGame.appid}&format=json`,
  );

  if (!response.ok) {
    console.log(`Failed achievement get for ${ownedGame.name}`);
    return;
  }

  const data = await response.json();

  const achievements: achievement[] = data.achievementpercentages.achievements;

  for (const achievement of achievements) {
    await query(
      `
      INSERT INTO achievements (achievement_name, appid, unlock_percentage)
      VALUES ($1, $2, $3)
      ON CONFLICT (achievement_name) DO
      UPDATE SET unlock_percentage = $3
      `,
      [
        achievement.name,
        ownedGame.appid.toString(),
        achievement.percent.toString(),
      ],
    );
  }
}
