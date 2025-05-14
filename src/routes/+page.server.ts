import type { RequestEvent } from "../routes/$types";
import { getSteamId } from "$lib/getSteamId";

export const actions = {
  default: async ({ request }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const vanity: string = String(formData.get("vanity"));

      const steamId = await getSteamId(vanity);

      return { message: `Your steamid is ${steamId}` };
    } catch (error) {
      return { message: (error as Error).message };
    }
  },
};
