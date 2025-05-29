<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import Output from "$lib/components/output.svelte";

  let outputs: string[] = $state([]);
  $effect(() => {
    console.log("Updated outputs");
  });
</script>

<Card bind:outputs />
<Output {outputs} />
