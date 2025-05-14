import type { RequestEvent } from "../routes/$types";
import { getSteamId } from "$lib/getSteamId";
import { getOwnedGames } from "$lib/getOwnedGames";

export const actions = {
  default: async ({ request }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const vanity: string = String(formData.get("vanity"));

      const steamId = await getSteamId(vanity);

      const games: Game[] = await getOwnedGames(steamId);

      // Todo:
      // - check if owned games are in cache, and up to date within 1 day
      // - fetch achievement stats if false
      // - fetch user's unlocked achievements per game
      // - lookup unlocked achievement in table to get gamercred for achievements
      // - total up gamercred and display to user

      const gameNameList: Game[] = [];
      games.forEach((game) => {
        gameNameList.push({ name: game.name, appid: game.appid });
      });

      return {
        message: `Your steamid is ${steamId}. You own the following games:`,
        gamesList: gameNameList,
      };
    } catch (error) {
      return { message: (error as Error).message };
    }
  },
};
