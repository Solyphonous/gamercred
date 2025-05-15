import type { RequestEvent } from "../routes/$types";
import { getSteamId } from "$lib/getSteamId";
import { getOwnedGames } from "$lib/getOwnedGames";
import { query } from "$lib/db";
import type { QueryResult } from "pg";
import { updateDatabase } from "$lib/updateDatabase";
import { getGamerCred } from "$lib/getGamerCred";
import { getPlayerAchievementsForGame } from "$lib/getPlayerAchievementsForGame";

export const actions = {
  default: async ({ request }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const vanity: string = String(formData.get("vanity"));

      const steamId = await getSteamId(vanity);

      const ownedGames: ownedGame[] = await getOwnedGames(steamId);

      let playerAchievements: string[] = [];

      for (const ownedGame of ownedGames) {
        let res: QueryResult = await query(
          "SELECT * FROM games WHERE appid=$1;",
          [ownedGame.appid.toString()],
        );
        if (res.rowCount == 0) {
          console.warn(`No game data for ${ownedGame.name}`);
          await updateDatabase(ownedGame);

          // Re-get database entry since it should exist now
          res = await query("SELECT * FROM games WHERE appid=$1;", [
            ownedGame.appid.toString(),
          ]);
        }

        const gameInfo = res.rows[0];

        const lastUpdatedDate = new Date(gameInfo.last_updated);
        const updateInterval: Date = new Date(new Date().getTime() - 604800000); // 7 days

        if (lastUpdatedDate < updateInterval) {
          console.warn(`Game data out of date for ${ownedGame.name}, updating`);
          await updateDatabase(ownedGame);
          // We don't re-get database entry after updating, since the only thing changes in games table is the last_updated value.
          // However, updateDatabase() also updates the achievements table, which is used in getPlayerAchievementsForGame() below,
          // so we should still update the database here.
        }

        const achievementsForGame = await getPlayerAchievementsForGame(
          steamId,
          ownedGame,
        );

        playerAchievements = playerAchievements.concat(achievementsForGame);
        console.log(`Finished processing ${ownedGame.name}`);
      }

      const gamerCred: number = await getGamerCred(playerAchievements);

      return {
        message: `Your steamid is ${steamId}. Your GAMERCRED(TM) is ${gamerCred} You own the following games:`,
        gamesList: ownedGames,
      };
    } catch (error) {
      console.error(error);
      return { message: (error as Error).message };
    }
  },
};
