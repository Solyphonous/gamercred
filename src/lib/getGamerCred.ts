import type { QueryResult } from "pg";
import { query } from "./db";

export async function getGamerCred(playerAchievements: string[]) {
  let gamerCred: number = 0;
  for (const achievementName of playerAchievements) {
    const queryResult: QueryResult = await query(
      `SELECT score FROM achievements WHERE achievement_name=$1`,
      [achievementName],
    );

    if (queryResult.rowCount == 0) {
      continue;
    }

    gamerCred += queryResult.rows[0].score;
  }

  return gamerCred;
}
