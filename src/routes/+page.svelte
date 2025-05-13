<script lang="ts">
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<h1>Welcome to GAMERCRED&TRADE;</h1>
<p>theres no gamorcred yet but soon thereee willl beeeeee</p>

<img src="images/gamer cred.jpg" alt="" />

<form method="POST">
  <label for="steamId">
    Enter your Steam Username, ID or URL:
    <br />
    <input
      type="text"
      name="steamId"
      placeholder="Steam Username, ID or URL"
      required
    />
  </label>
</form>

{#if form?.loginData}
  <p>Your steam id is {form.loginData.response.steamid}</p>
{/if}

<style>
  input[type="text"] {
    field-sizing: content;
  }
</style>
