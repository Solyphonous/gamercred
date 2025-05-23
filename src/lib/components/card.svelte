<script lang="ts">
  import { enhance } from "$app/forms";

  let { fetching } = $props();
</script>

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
    <input
      type="text"
      name="vanity"
      placeholder="Steam Username, ID or URL"
      required
      disabled={fetching}
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
