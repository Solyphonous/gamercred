<div class="output-container">
  <div class="output">
    <ul>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
      <li>Output sample</li>
    </ul>
  </div>
  <div class="pull">V</div>
</div>

<style>
  .output-container {
    font-family: monospace;
    text-align: center;
    width: 25%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #222229;
    max-height: 50%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    .output-container {
      width: 70%;
    }
  }

  .pull {
    font-size: 30px;
    text-align: center;
    cursor: pointer;
  }

  .output {
    padding: 10px 15px;
    text-align: left;
    position: relative;

    flex: 1; /* Allow this section to grow and take up remaining space */
    overflow: auto; /* Use auto for scroll if needed */
  }

  ul {
    list-style-type: none;
  }
</style>
