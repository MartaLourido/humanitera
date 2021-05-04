<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Header />
<main>
  <h1 class="heading">Humanitera</h1>
</main>

<Footer />

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
