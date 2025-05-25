<script lang="ts">
  import { fade } from "svelte/transition";
  import Profile from "./profile.svelte";

  let { outputs = $bindable([]) } = $props();

  let vanity = $state("");
  let fetching = $state(false);

  let showDetails = $state(false);
  let playerInfo = $state({
    avatarURL: "",
    displayName: "",
    profileURL: "",
  });
  let achievements = $state();

  let gamerCred = $state(0);

  let eventSource: EventSource | null = $state(null);

  function onSubmit(event: Event) {
    outputs = [];
    fetching = true;
    event.preventDefault();
    const params = new URLSearchParams();
    params.append("vanity", vanity);

    eventSource = new EventSource("api/getUserData?" + params);

    eventSource.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;

      if (data.eventType == "message") {
        outputs.unshift(message);
      } else if (data.eventType == "error") {
        if (eventSource) {
          eventSource.close();
        }
        outputs.unshift(message);

        fetching = false;
      } else if (data.eventType == "finalMessage") {
        const parsed = JSON.parse(data.message);

        if (eventSource) {
          eventSource.close();
        }
        fetching = false;

        showDetails = true;

        playerInfo = parsed.playerInfo;
        gamerCred = parsed.gamerCred;
        achievements = parsed.achievements;
      } else if (data.eventType == "ping") {
        console.log("Server pinged to check if connection is alive");
      }
    });
  }
</script>

<div class="card">
  {#if !showDetails}
    <div transition:fade={{ duration: 300 }}>
      <h1>GAMERCRED</h1>
      <h3>Get the value of your steam achievements</h3>
      <form onsubmit={onSubmit}>
        <input
          type="text"
          name="vanity"
          placeholder="Steam Username, ID or URL"
          required
          disabled={fetching}
          bind:value={vanity}
        />
      </form>

      {#if fetching}
        <p>Fetching data from steam servers...</p>
      {/if}
    </div>
  {:else}
    <div transition:fade={{ duration: 300 }}>
      <Profile profile={playerInfo} {gamerCred} {achievements} />
    </div>
  {/if}
</div>

<style>
  .card {
    position: relative;
    z-index: 999;
    text-align: center;

    padding: 1.5rem;
    width: 30%;
    aspect-ratio: 1.66/1;

    background-color: var(--dark-grey);
    border: 1px solid var(--border-grey);

    box-shadow: 0px 0px 10px black;
  }

  @media (max-width: 1000px) {
    .card {
      width: 80%;
      font-size: 0.5rem;
    }
  }

  form {
    margin: 12% 0%;
  }

  input[type="text"] {
    width: 75%;
    font-size: 2rem;
    box-sizing: border-box;
    background-color: var(--light-grey);
    color: white;
    border: 1px solid var(--border-grey);
    border-radius: 5px;
    box-shadow: 1px 1px 5px black inset;
    transition: box-shadow 0.2s ease;
  }

  input[type="text"]:focus {
    box-shadow: 2px 2px 5px black inset;
  }
</style>
