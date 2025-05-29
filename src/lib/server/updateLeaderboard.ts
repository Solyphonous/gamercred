import { query } from "./db";

export async function updateLeaderboard({
  steamid,
  displayname,
  icon,
  gamercred,
}: LeaderboardTableRow) {
  await query(
    `INSERT INTO leaderboard (steamid, displayname, icon, gamercred) VALUES ($1, $2, $3, $4)
    ON CONFLICT (steamid) DO UPDATE
    SET displayname = EXCLUDED.displayname,
    icon = EXCLUDED.icon,
    gamercred = EXCLUDED.gamercred
    ;`,
    [steamid, displayname, icon, String(gamercred)],
  );
}
