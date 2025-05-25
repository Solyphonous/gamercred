<script>
  let { image, title, text } = $props();
</script>

<div class="card">
  <img src={image} alt="" />
  <h1>{title}</h1>
  <p>{text}</p>
</div>

<style>
  .card {
    overflow: hidden;
    width: 400px;
    max-width: 90vw;
    min-width: 300px;
    background-color: var(--light-grey);
    margin: 0 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px black;
    height: 600px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .card {
      width: 100%;
      max-width: 400px;
      margin: 0;
      height: auto;
      min-height: 500px;
    }
  }

  img {
    max-width: 100%;
  }

  h1,
  p {
    padding: 0px 10px;
  }
</style>
