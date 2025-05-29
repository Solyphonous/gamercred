<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import InfoCard from "$lib/components/infoCard.svelte";

  let { children } = $props();

  // Navbar
  let currentpath = $state(browser ? window.location.pathname : "/");

  if (browser) {
    afterNavigate(() => {
      currentpath = window.location.pathname;
    });
  }

  let pages = [
    { name: "Home", link: "/" },
    { name: "Leaderboard", link: "/leaderboard" },
  ];

  // Background
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

<div bind:this={background} class="hero-background"></div>
<div class="blur"></div>
<div class="pixels"></div>

<div class="header">
  <ul>
    {#each pages as page, index (index)}
      <li>
        {#if page.link == currentpath}
          <span>{page.name}</span>
        {:else}
          <a href={page.link}>{page.name}</a>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<div class="hero">
  {@render children()}
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
  ul {
    margin: 10px 0;
    text-align: center;
    list-style: none;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  li {
    margin: 0px 10px;
    text-shadow: 0px 0px 10px black;
  }

  a {
    text-decoration: none;
  }

  span {
    text-decoration: underline;
    user-select: none;
  }

  .header {
    position: absolute;
    top: 0;
    z-index: 999;
    font-size: 1.5em;
    width: 100%;
  }

  .hero {
    position: relative;

    height: 100vh;
    width: 100%;

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
    height: 100%;
    width: 100%;

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

  .footer {
    width: 100%;
    background-color: black;
    display: inline-block;
    text-align: center;
    margin-top: -1em;
  }

  .info {
    min-height: 100vh;
    background-color: var(--dark-grey);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    overflow: auto;
    margin: auto;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .info {
      flex-direction: column;
      padding: 40px 20px;
    }
  }
</style>
