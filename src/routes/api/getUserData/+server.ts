import { getSteamId } from "$lib/getSteamId";
import { getOwnedGames } from "$lib/getOwnedGames";
import { query } from "$lib/db";
import type { QueryResult } from "pg";
import { updateDatabase } from "$lib/updateDatabase";
import { getGamerCred } from "$lib/getGamerCred";
import { getPlayerAchievementsForGame } from "$lib/getPlayerAchievementsForGame";
import { getProfileInfo } from "$lib/getProfileInto.js";

async function processRequest(
  vanity: string,
  clientMessage: (message: string, eventType?: string) => boolean,
): Promise<void> {
  try {
    const steamId = await getSteamId(vanity);
    const playerInfo = await getProfileInfo(steamId);
    const ownedGames: ownedGame[] = await getOwnedGames(steamId);

    let playerAchievements: playerAchievement[] = [];

    for (const ownedGame of ownedGames) {
      if (!clientMessage("", "ping")) {
        return;
      }

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
        clientMessage,
      );

      playerAchievements = playerAchievements.concat(achievementsForGame);
      //clientMessage(`Finished processing ${ownedGame.name}`);
    }

    clientMessage(`Finished processing all ${ownedGames.length} owned games`);
    const { gamerCred, achievements } = await getGamerCred(playerAchievements);

    for (const achievement of achievements) {
      if (achievement.name == "Shadow") console.log(achievement);
    }

    clientMessage(
      JSON.stringify({
        gamerCred: gamerCred,
        achievements: achievements,
        playerInfo: playerInfo,
      }),
      "finalMessage",
    );
  } catch (error) {
    console.error(error);
    clientMessage((error as Error).message, "error");
  }
}

export const GET = ({ url }) => {
  const vanity: string = String(url.searchParams.get("vanity"));

  const bodyStream = new ReadableStream({
    start(controller) {
      let isConnected = true;
      function clientMessage(
        message: string,
        eventType: string = "message",
      ): boolean {
        if (!isConnected) {
          return false;
        }

        try {
          const response = {
            eventType: eventType,
            message: message,
          };

          controller.enqueue(`data: ${JSON.stringify(response)}\n\n`);

          if (eventType == "finalMessage" || eventType == "error") {
            controller.close();
            isConnected = false;
          }

          return true;
        } catch {
          console.error("Stream controller error!");
          isConnected = false;
          return false;
        }
      }

      processRequest(vanity, clientMessage);
    },

    cancel() {
      console.log("Stream closed by client.");
    },
  });

  return new Response(bodyStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
};
