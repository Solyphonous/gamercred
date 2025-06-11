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
            <td
              ><a
                aria-label="User steam profile"
                href="https://steamcommunity.com/profiles/{tableRow.steamid}"
                target="_blank"
                ><img
                  src={tableRow.icon}
                  alt="Profile icon"
                  class="pfp"
                  loading="lazy"
                /></a
              ></td
            >
            <td
              ><a
                class="username"
                aria-label="User steam profile"
                href="https://steamcommunity.com/profiles/{tableRow.steamid}"
                target="_blank">{tableRow.displayname}</a
              ></td
            >
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

  .username {
    text-decoration: none;
  }

  .username:hover {
    text-decoration: underline;
  }

  .pfp:hover {
    outline: 1px solid white;
    outline-offset: -1px;
  }

  thead {
    position: sticky;
    top: 0;
    background-color: var(--dark-grey);
  }

  th,
  td {
    padding: 0px 5px;
  }

  table tr:nth-child(even) {
    background-color: var(--light-grey);
  }

  img {
    display: block;
    width: 50px;
  }
</style>
