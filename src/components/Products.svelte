<script>
  import { onDestroy } from "svelte";
  import { productStore, cartStore } from "./Stores.js";
  import { PRODUCTS } from "../services/data/data.js";
  import Card from "./Card.svelte";
  let products = [];

  const unsubscribeProductStore = productStore.subscribe(
    (value) => (products = value)
  );

  onDestroy(() => {
    unsubscribeProductStore();
  });

  const addToCart = (product) => {
    cartStore.addItem(product);
  };
</script>

{#if products.length}
  <ul class="products-list">
    {#each products as product (product.id)}
      <section>
        {#each PRODUCTS as product}
          <Card
            productId={product.id}
            productTitle={product.name}
            productPrice={product.price}
            productImage={product.image}
            productSize={product.size}
          >
            <p slot="description">{product.description}</p>
          </Card>
        {/each}
      </section>
    {/each}
  </ul>
{/if}

<style>
  .products-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Ubuntu", sans-serif;
    font-size: 1em;
    letter-spacing: 1px;
  }

  p{
    font-family: "Ubuntu", sans-serif;
    font-size: 1em;
    letter-spacing: 1px;
  }
</style>
