import type { QueryResult } from "pg";
import { query } from "./db";

export async function getGamerCred(playerAchievements: string[]) {
  let gamerCred: number = 0;
  const achievements = [];
  for (const achievementName of playerAchievements) {
    const queryResult: QueryResult = await query(
      `SELECT * FROM achievements WHERE achievement_name=$1`,
      [achievementName],
    );

    if (queryResult.rowCount == 0) {
      continue;
    }

    const achievement = queryResult.rows[0];
    gamerCred += achievement.score;

    achievements.push({
      name: achievement.display_name,
      icon: achievement.icon,
      unlockPercentage: achievement.unlock_percentage,
      score: achievement.score,
    });
  }

  return {
    gamerCred: gamerCred,
    achievements: achievements,
  };
}
