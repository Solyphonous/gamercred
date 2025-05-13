import type { RequestEvent } from "../routes/$types";
import { getSteamId } from "$lib/getSteamId";

export const actions = {
  default: async (event: RequestEvent) => {
    try {
      const steamId = await getSteamId(event);
      return { message: `Your steamid is ${steamId}` };
    } catch (error) {
      return { message: (error as Error).message };
    }
  },
};
