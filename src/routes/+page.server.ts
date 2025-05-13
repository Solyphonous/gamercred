import type { Load, RequestEvent } from "@sveltejs/kit";
import { STEAM_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const actions = {
  default: async ({ request, fetch }: RequestEvent) => {
    const formData = await request.formData();
    const steamId: string = String(formData.get("steamId"));

    const params = new URLSearchParams({
      key: STEAM_API_KEY,
      vanityurl: steamId,
    });

    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?${params.toString()}`,
    );

    if (response.ok) {
      const data = await response.json();
      return { loginData: data };
    }
  },
};
