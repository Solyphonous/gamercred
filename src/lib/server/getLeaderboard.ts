import type { QueryResult } from "pg";
import { query } from "./db";

export async function getLeaderboard(): Promise<LeaderboardTableRow[]> {
  const queryResult: QueryResult = await query(
    `SELECT TOP 500 * FROM leaderboard ORDER BY gamercred DESC`,
  );

  if (queryResult.rowCount == 0) {
    return [
      { steamid: "0", displayname: "ERROR", icon: "ERROR", gamercred: 0 },
    ];
  }

  const tableRows: LeaderboardTableRow[] = queryResult.rows;
  return tableRows;
}
