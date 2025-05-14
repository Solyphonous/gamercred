<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();

  let fetching: boolean = $state(false);
</script>

<h1>Welcome to GAMERCRED&TRADE;</h1>
<p>theres no gamorcred yet but soon thereee willl beeeeee</p>

<img src="images/gamer cred.jpg" alt="" />

<form
  method="POST"
  use:enhance={() => {
    fetching = true;

    return async ({ update }) => {
      await update();
      fetching = false;
    };
  }}
>
  <label for="steamId">
    Enter your Steam Username, ID or URL:
    <br />
    <input
      type="text"
      name="vanity"
      placeholder="Steam Username, ID or URL"
      required
      disabled={fetching}
    />
  </label>
</form>

{#if fetching}
  <p>Fetching data from steam servers...</p>
{/if}

{#if form}
  <p>{form.message}</p>

  {#each form.gamesList || [] as game, index (index)}
    <p>{game.name}</p>
    <img
      src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/{game.appid}/header.jpg"
      alt="Game thumbnail"
    />
  {/each}
{/if}

<style>
  input[type="text"] {
    field-sizing: content;
  }
</style>
