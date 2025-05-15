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

      //test vars
      let test_expectedAchievementCount = 0;
      let test_actualAchievementCount = 0;

      for (const ownedGame of ownedGames) {
        let res: QueryResult = await query(
          "SELECT * FROM games WHERE appid=$1;",
          [ownedGame.appid.toString()],
        );
        if (res.rowCount == 0) {
          console.warn(`No game data for ${ownedGame.name}`);
          await updateDatabase(ownedGame);

          res = await query("SELECT * FROM games WHERE appid=$1;", [
            ownedGame.appid.toString(),
          ]);
        }

        const gameInfo = res.rows[0];

        const lastUpdatedDate = new Date(gameInfo.last_updated);
        const oneDayAgo: Date = new Date(
          new Date().getTime() - 24 * 60 * 60 * 1000,
        );

        if (lastUpdatedDate < oneDayAgo) {
          console.warn(`Game data out of date for ${ownedGame.name}, updating`);
          await updateDatabase(ownedGame);

          res = await query("SELECT * FROM games WHERE appid=$1;", [
            ownedGame.appid.toString(),
          ]);
        }

        const achievementsForGame = await getPlayerAchievementsForGame(
          steamId,
          ownedGame.appid,
        );

        test_expectedAchievementCount += achievementsForGame.length;

        console.log(`... ${ownedGame.name}`);

        playerAchievements = playerAchievements.concat(achievementsForGame);
      }

      test_actualAchievementCount = playerAchievements.length;
      console.log(
        `Expected: ${test_expectedAchievementCount} | Actual ${test_actualAchievementCount}`,
      );

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
