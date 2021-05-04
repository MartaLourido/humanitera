<script>
	  // components
	import Header from "./components/Header.svelte";
	import Home from "./pages/Home.svelte";
	import Footer from "./components/Footer.svelte";
  </script>
  
  <Header />
  <main>
	<Home/>
  </main>
  <Footer />
  <style>
	@media (min-width: 640px) {
	  main {
		max-width: none;
	  }
	}
  </style>
  