<script>
  import Header from "./components/GeneralComponents/Header.svelte";
  import Home from "./pages/Home.svelte";
  import Footer from "./components/GeneralComponents/Footer.svelte";
  import Products from "./components/ShoppingCart/Products.svelte";
</script>

<Header />
<Home />
<main>
  <article id="the-products">
    <h1><a href="#the-products">Check out our <em>bestsellers</em></a></h1>
  </article>
  <section>
    <Products />
  </section>
</main>
<Footer />

<style>
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  @media (min-width: 800px) {
    :root {
      --fs-h1: 4.5rem;
      --fs-h2: 3.75rem;
      --fs-h3: 1.5rem;
      --fs-body: 1.125rem;
    }

    h1 {
      text-align: center;
    }
  }
</style>
