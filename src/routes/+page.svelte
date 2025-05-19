<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import Output from "$lib/components/output.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();

  let fetching: boolean = $state(false);
</script>

<div class="hero-background"></div>
<div class="blur"></div>
<div class="pixels"></div>

<div class="hero">
  <Card {fetching} />
  <Output />
</div>

<!-- Replace below if later - just for temp debugging purposes -->
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

    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 0;
    margin: 0;
  }

  .hero-background {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;

    background: url("images/sample_background.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .blur {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    opacity: 60%;
  }

  .pixels {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("images/white_pixel.png");
    opacity: 10%;
  }
</style>
