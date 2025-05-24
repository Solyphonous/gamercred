<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import Output from "$lib/components/output.svelte";

  let outputs: string[] = $state([]);
  $effect(() => {
    console.log("Updated outputs");
  });
</script>

<div class="hero-background"></div>
<div class="blur"></div>
<div class="pixels"></div>

<div class="hero">
  <Card bind:outputs />
  <Output {outputs} />
</div>

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

    background: url("/images/sample_background.png");
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
    background: url("/images/white_pixel.png");
    opacity: 10%;
  }
</style>
