<script>
  // components
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import Footer from "./components/Footer.svelte";
  import Products from "./components/Products.svelte";


</script>

<Header />
<Home />
<main>
	<article id="the-products">
		<h1><a href="#the-products">Check our  <em>bestsellers</em></a></h1>
	</article>
  <section>
   <Products/>
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

	h1{
		text-align: center;
	}
}
</style>
