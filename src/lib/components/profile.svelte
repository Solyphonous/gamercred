<script lang="ts">
  let { profile, gamerCred, achievements } = $props();

  achievements.sort((a: FullAchievement, b: FullAchievement) => {
    return Number(a.score) - Number(b.score);
  });

  achievements.reverse();

  function reload() {
    location.reload();
  }
</script>

<div class="container">
  <div class="top-container">
    <img src={profile.avatarURL} alt="Profile" />
    <div class="top-text-container">
      <h1>{profile.displayName}</h1>
      <h2>GAMERCRED: {gamerCred}G</h2>
    </div>
  </div>
  <h3>Top Achievements:</h3>
  <div class="achievements">
    {#each achievements as achievement: FullAchievement, index (index)}
      <div class="achievement">
        <img
          title={achievement.name}
          class="icon"
          src={achievement.icon}
          alt="Achievement icon"
          loading="lazy"
        />
        <p>{achievement.score}G</p>
      </div>
    {/each}
  </div>
  <button onclick={reload}>Go again?</button>
</div>

<style>
  button {
    cursor: pointer;
    background-color: var(--light-grey);
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.5em;
  }
  .achievements {
    overflow: auto;
    max-height: 20em;
    display: flex;
    padding-bottom: 15px;
  }
  .icon {
    max-width: 5em;
    min-width: 5em;
    margin: 0em 0.2em;
  }

  .top-container {
    display: flex;
  }

  .top-text-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  h1,
  h2,
  h3 {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h3 {
    margin: 0.5rem 0rem;
  }

  img {
    max-width: 100%;
    aspect-ratio: 1/1;
    margin-right: 1.5rem;
  }

  @media (max-width: 1000px) {
    img {
      max-width: 100px;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1rem;
    }
  }
</style>
