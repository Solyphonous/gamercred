<script lang="ts">
  import { onDestroy } from "svelte";

  let { outputs = $bindable([]) } = $props();

  let vanity = $state("");
  let fetching = $state(false);

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

      switch (data.eventType) {
        case "message":
          outputs.unshift(message);
          break;

        case "error":
          if (eventSource) {
            eventSource.close();
          }
          outputs.unshift(message);

          fetching = false;
          break;

        case "finalMessage":
          if (eventSource) {
            eventSource.close();
          }
          fetching = false;
          // Full completion code HERE
          console.log(`GamerCred: ${data.message}`);
          break;
        case "ping":
          console.log("Server pinged to check if connection is alive");
      }
    });

    eventSource.addEventListener("finalMessage", (event) => {
      console.log("Recieved final message");
      const gamerCred = JSON.parse(event.data).finalMessage;
      outputs.unshift(gamerCred);
    });

    eventSource.addEventListener("error", (event) => {
      console.log(event);
      const message = JSON.parse(event.data).message;
      outputs.unshift(message);
    });
  }
</script>

<div class="card">
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

<style>
  .card {
    position: relative;
    z-index: 999;
    text-align: center;

    padding: 20px;
    width: 30%;
    aspect-ratio: 1.66/1;

    background-color: #0c1216;

    border: 1px solid #444444;
    box-shadow: 0px 0px 10px black;
  }

  @media (max-width: 1000px) {
    .card {
      width: 80%;
    }
  }

  form {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  input[type="text"] {
    width: 75%;
    font-size: 32px;
    box-sizing: border-box;
    background-color: black;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
  }
</style>
