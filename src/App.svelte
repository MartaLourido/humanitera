<script>
  import Header from "./components/Header.svelte";
</script>

<Header />
<h1 class="heading">Humanitera</h1>

<style>
  .heading {
    text-transform: uppercase;
    text-align: center;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
