<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import InfoCard from "$lib/components/infoCard.svelte";
  import Output from "$lib/components/output.svelte";
  import { onMount } from "svelte";

  let outputs: string[] = $state([]);
  $effect(() => {
    console.log("Updated outputs");
  });

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let background: HTMLElement | null = $state(null);

  onMount(() => {
    let backgroundImage: number = getRandomInt(1, 104);

    background?.style.setProperty(
      "background-image",
      `url(/images/backgrounds/${backgroundImage}.png`,
    );
  });
</script>

<svelte:head>
  <title>GAMERCRED</title>
  <link rel="icon" type="image/png" href="/images/favicon.png" />.
</svelte:head>

<div bind:this={background} class="hero-background"></div>
<div class="blur"></div>
<div class="pixels"></div>

<div class="hero">
  <Card bind:outputs />
  <Output {outputs} />
</div>

<div class="info">
  <InfoCard
    image="/images/backgrounds/58.png"
    title="What is GAMERCRED?"
    text="GAMERCRED is a measure of your worth as a human being. It is calculated by assigning a point value to each of your steam achievements, based on its rarity, and then summing the total point value."
  />
  <InfoCard
    image="/images/backgrounds/87.png"
    title="How do I get my score?"
    text="Go to the top of the page and type in your steam vanity URL username or SteamID64. Your GAMERCRED score will be given to you from the heavens; bask in its glory."
  />
  <InfoCard
    image="/images/backgrounds/19.png"
    title="Thank you so much."
    text="You are welcome. If you wish to thank me, send me BUG REPORTS at solyphonous+gamercred@pm.me. And I will fix it. For you. It's all for you. GAMERCRED. It's for you. That's the tagline."
  />
</div>
<p class="footer">
  Made by <a href="https://soly.jambos.casa" target="_blank">Solyphonous</a>
</p>

<style>
  .footer {
    width: 100%;
    background-color: black;
    display: inline-block;
    text-align: center;
    margin-top: -1em;
  }

  .info {
    height: 100vh;
    background-color: var(--dark-grey);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    margin: auto;
  }

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

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .blur {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px) brightness(125%);
    opacity: 60%;
  }

  .pixels {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("/images/white_pixel.png");
    opacity: 10%;
  }
</style>
