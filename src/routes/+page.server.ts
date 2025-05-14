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

      const gameNameList: string[] = [];

      games.forEach((game) => {
        gameNameList.push(game.name);
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
