<script>
	  // components
	import Header from "./components/Header.svelte";
	import Home from "./pages/Home.svelte";
	import Footer from "./components/Footer.svelte";
	import Card from "./components/Card.svelte";
    import { PRODUCTS } from "./services/data/data";
  </script>
  
  <Header />
  <Home/>
  <main>
	<section>
		{#each PRODUCTS as product}
		  <Card
			productId={product.id}
			productTitle={product.name}
			productPrice={product.price}
			productImage={product.image}>
			<p slot="description">{product.description}</p>
		  </Card>
		{/each}
	  </section>
  </main>
  <Footer />
  <style>
	@media (min-width: 640px) {
	  main {
		max-width: none;
	  }
	}
  </style>
  