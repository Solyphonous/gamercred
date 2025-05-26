import type { QueryResult } from "pg";
import { query } from "./db";

export async function getGamerCred(playerAchievements: playerAchievement[]) {
  let gamerCred: number = 0;
  const achievements = [];
  for (const achievement of playerAchievements) {
    const queryResult: QueryResult = await query(
      `SELECT * FROM achievements WHERE achievement_name=$1 AND appid=$2`,
      [achievement.apiname, achievement.appid],
    );

    if (queryResult.rowCount == 0) {
      continue;
    }

    const achievementResult = queryResult.rows[0];
    gamerCred += achievementResult.score;

    achievements.push({
      name: achievementResult.display_name,
      icon: achievementResult.icon,
      unlockPercentage: achievementResult.unlock_percentage,
      score: achievementResult.score,
    });
  }

  return {
    gamerCred: gamerCred,
    achievements: achievements,
  };
}
