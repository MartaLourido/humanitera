<script>
  import { cartStore, costStore } from "./Stores.js";
  import Button from "./Button.svelte";

  let isOpened = false;

  const toggleDropdown = () => {
    isOpened = !isOpened;
  };
</script>

<div class="cart">
  <Button class="cart__btn" on:click={toggleDropdown}
    >Cart ({$cartStore.totalItems})</Button
  >
  {#if isOpened}
    <div class="cart_dropdown">
      {#if $cartStore.items.length}
        <ul class="cart_list">
          {#each $cartStore.items as item (item.id)}
            <li class="cart_list_item">
              <div>
                <strong>{item.name}</strong>
                <small style="display: block;"
                  >(x{$cartStore.quantities[item.id]}) -
                  <strong>${$cartStore.quantities[item.id] * item.price}</strong
                  ></small
                >
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="message-empty-cart">
          you don't have any product in your cart
        </p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .cart {
    position: relative;
  }

  .cart_dropdown {
    position: absolute;
    right: 0;
    background-color: white;
    border: 1px solid black;
    color: black;
    width: 20rem;
    top: calc(100% + 0.25rem);
    padding: 0.75rem 1rem;
    z-index: 1;
  }

  .cart_list {
    list-style: none;
    padding: 0;
  }

  .cart_list_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cart_list_item:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  .message-empty-cart {
    margin: 0;
    color: grey;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
</style>
