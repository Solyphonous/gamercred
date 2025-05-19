<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();

  let fetching: boolean = $state(false);
</script>

<div class="hero">
  <div class="blur"></div>
  <div class="pixels"></div>
  <div class="card">
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
  </div>
</div>

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
  .hero {
    position: relative;
    background: url("images/sample_background.png");
    height: 100vh;
    box-sizing: border-box;
    background-color: white;
    background-size: 100% auto;
    display: flex;
  }

  .blur {
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    opacity: 60%;
  }

  .pixels {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("images/white_pixel.png");
    opacity: 10%;
  }

  .card {
    z-index: 999;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    padding: 10px 10px;
    margin: auto;
    width: 30vw;
    aspect-ratio: 1.66/1;

    background-color: #0c1216;
    border-radius: 30px;

    box-shadow: 0px 0px 10px black;
  }

  @media (max-width: 800px) {
    .card {
      width: 90%;
    }
  }

  form {
    width: 80%;
    margin: auto;
  }

  input[type="text"] {
    width: 100%;
    font-size: 32px;
    box-sizing: border-box;
    background-color: black;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
  }
</style>
