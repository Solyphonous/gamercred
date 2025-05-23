<script lang="ts">
  let { outputs } = $props();

  let outputHidden: boolean = $state(true);
  function toggleVisible() {
    outputHidden = !outputHidden;
  }
</script>

<div class="output-container">
  <div class="output {outputHidden ? 'hidden' : ''}">
    <ul>
      {#each outputs as output, index (index)}
        <li>{outputs.length - 1 - index}: {output}</li>
      {/each}
    </ul>
  </div>
  <button onclick={toggleVisible}>
    <img
      src="images/arrow.png"
      alt=""
      class="arrow {outputHidden ? 'hidden' : ''}"
    />
  </button>
</div>

<style>
  .output-container {
    width: 25%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #222229;
    max-height: 50%;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    box-shadow: 0 0 7px black;
  }

  @media (max-width: 1000px) {
    .output-container {
      width: 70%;
    }
  }

  button {
    cursor: pointer;
    background-color: #222229;
    border: none;
  }

  .output {
    max-height: 500px;
    padding: 10px 15px;
    text-align: left;
    position: relative;
    overflow: auto;
    transition: max-height 0.2s ease;
  }

  .output.hidden {
    max-height: 0;
    overflow: hidden;
    padding-top: 0;
    padding-bottom: 0;
  }

  ul {
    list-style-type: none;
  }

  li {
    font-family: monospace !important;
  }

  .arrow {
    transform: rotate(270deg);
    transition: transform 0.2s;
  }

  .arrow.hidden {
    transform: rotate(90deg);
  }
</style>
