import { getLeaderboard } from "$lib/server/getLeaderboard";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const tableRows: LeaderboardTableRow[] = await getLeaderboard();
  return { tableRows };
};
