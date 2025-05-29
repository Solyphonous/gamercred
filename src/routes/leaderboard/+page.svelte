<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();

  let tableRows: LeaderboardTableRow[] = (
    data as { tableRows: LeaderboardTableRow[] }
  ).tableRows;
</script>

<div class="hero-box">
  <h1>LEADERBOARD</h1>
  <div class="table-container">
    <table class="leaderboard">
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th><h3>Username</h3></th>
          <th><h3>Gamercred</h3></th>
        </tr>
      </thead>
      <tbody>
        {#each tableRows as tableRow, index (index)}
          <tr>
            <td>{index + 1}</td>
            <td><img src={tableRow.icon} alt="Profile icon" /></td>
            <td>{tableRow.displayname}</td>
            <td>{tableRow.gamercred}G</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .hero-box {
    max-height: 80%;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    .hero-box {
      width: 80%;
      font-size: 0.8rem;
    }
  }

  .table-container {
    display: flex;
    justify-content: center;
    overflow-y: auto;
  }

  .leaderboard {
    text-align: left;
    border-collapse: collapse;
    width: 100%;
  }

  thead {
    position: sticky;
    top: 0;
    background-color: var(--dark-grey);
  }

  table tr:nth-child(even) {
    background-color: var(--light-grey);
  }

  img {
    display: block;
    width: 50px;
  }
</style>
