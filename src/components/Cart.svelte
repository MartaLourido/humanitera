<script>
  import { cartStore, costStore, validCouponStore } from "./stores";
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  let modal;

  let shown = false;
  export function show() {
    shown = true;
  }

  let isOpened = false;
  let couponInput = null;

  const removeToCart = (product) => {
    cartStore.removeItem(product);
  };

  const applyCoupon = () => {
    const validCoupon = $validCouponStore.find(
      (coupon) => coupon.code === couponInput.value
    );

    if (validCoupon) {
      cartStore.addCoupon(validCoupon);
      couponInput.value = "";
    }
  };

  const unapplyCoupon = (coupon) => {
    cartStore.removeCoupon(coupon);
  };

  const countButtonHandler = (e) => {
    if (e.target.classList.contains("add")) {
      count++;
    } else if (count >= 1) {
      count--;
    }
    $cartStore.totalItems;
  };
</script>

<Button on:click={() => modal.show()}
  >Shopping Cart ({$cartStore.totalItems})</Button
>

<Modal bind:this={modal}>
  <div class="title">
    <h2>Your Shopping Cart</h2>
  </div>
  {#if show}
    {#if $cartStore.items.length}
      {#each $cartStore.items as item (item.id)}
	  <div class="Cart">
        <div class="image">
          <img class="item-1.png" src={item.image} alt="Product" />
        </div>
        <div class="content-product">
          <span class="product-name"><strong>{item.name}</strong></span>
          <span class="product-name"><strong>Size {item.size}</strong></span>
          <span class="product-price">{item.price} SEK</span>
          <span class="separator-top" />

          <div class="count">
            <button class="add" on:click={countButtonHandler}>+</button>
            <p>{item.count}</p>
            <button class="subtract" on:click={countButtonHandler}>-</button>
            <button class="remove" on:click={removeToCart(item)}>
              <object
                aria-label="remove"
                type="image/svg+xml"
                data="img/svg/cancel.svg"
              />
              Remove
            </button>
          </div>
          <small style="display: block;"
            >(x{$cartStore.quantities[item.id]}) -
            <strong>SEK{$cartStore.quantities[item.id] * item.price}</strong
            ></small
          >
        </div>
	</div>
      {/each}
      <hr />
      <div>
        <div class="cart__subtotal">
          <span>Sub-Total</span><strong>SEK{$costStore.subTotal}</strong>
        </div>
        <div class="cart__discounts">
          <span>Discount</span><strong>-SEK{$costStore.discountAmount}</strong>
        </div>
        {#if $cartStore.coupons.length}
          <ul class="cart__coupons-list">
            {#each $cartStore.coupons as coupon (coupon.code)}
              <li class="cart__coupons-list__item">
                <span>{coupon.code}</span>
                <Button type="Button" on:click={unapplyCoupon(coupon)}>x</Button
                >
              </li>
            {/each}
          </ul>
        {/if}
        <div class="cart__coupon">
          <input
            class="cart__coupon__input"
            type="text"
            placeholder="Coupon"
            bind:this={couponInput}
          />
          <button class="cart__coupon__btn" type="button" on:click={applyCoupon}
            >Apply</button
          >
        </div>
        <hr />
        <div class="cart__total">
          <span>Total</span><strong>SEK{$costStore.total}</strong>
        </div>
      </div>
	  <hr />
	  <div class="btn-left">
	  <button on:click={() => modal.hide()}>Checkout</button>
	</div>
      <div class="btn-group">
        <Button on:click={() => modal.hide()}>Continue Shopping</button>
	</div>

    {:else}
      <div class="CartList">
        <h3>Shopping cart is empty!</h3>
      </div>
	  <div class="btn-group">
		<button on:click={() => modal.hide()}>Continue Shopping</button>
	  </div>

    {/if}
  {/if}


</Modal>

<!-- <button class="myButton" on:click={toggleDropdown}>Cart ({$cartStore.totalItems})</button> -->
<style>
  img {
    width: 80px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 0.5em;
  }

  .content-product {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 2em;
  }

  .content-product .product-price {
    color: #a1a1a1;
    font-size: 17px;
    font-weight: 800;
  }

  .cart__subtotal,
  .cart__discounts,
  .cart__total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }

  .Cart {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }

  h3 {
    margin-top: 0.2em;
    margin-bottom: 2em;
  }


  .cart__coupon {
    display: flex;
    justify-content: flex-end;
  }

  .cart__coupons-list {
    list-style: none;
    padding: 0;
    margin-bottom: 0.25rem;
  }

  .cart__coupons-list__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .cart__coupons-list__item:not(:last-child) {
    margin-bottom: 0.25rem;
  }

  .count {
    display: flex;
    margin-top: 10px;
  }

  .count > * {
    display: block;
    margin: 0;
    font-size: 0.8em;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .count button.add {
    padding: 0.2em 0.4em;
    border-radius: 5px 0 0 5px;
    margin-right: 0;
    border: 0.5px solid #7d7d7d;
  }

  .count p {
    border: 0.5px solid #7d7d7d;
    margin: 0;
    padding: 0.2em 0.4em;
    background: #fefefe;
    border-left: none;
    border-right: none;
  }

  .count button.subtract {
    border: 0.5px solid #7d7d7d;
    padding: 0.2em 0.4em;
    border-radius: 0 5px 5px 0;
  }

  .count button.remove {
    display: flex;
    align-content: center;
    font-size: 0.6em;
    background-color: #c91616;
    color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-left: 10px;
  }

  .count button.remove object {
    width: 20px;
    height: 20px;
  }

  button > *:active,
  button > *:focus {
    outline: none;
  }

  .btn-group button {
    background-color: #04aa6d; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: right; /* Float the buttons side by side */

  }

  .btn-left button {
    background-color: #04aa6d; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */

  }

  .btn-group button:not(:last-child) {
    border-right: none; /* Prevent double borders */
  }

  /* Clear floats (clearfix hack) */
  .btn-group:after {
    content: "";
    clear: both;
    display: table;
  }

  /* Add a background color on hover */
  .btn-group button:hover {
    background-color: #3e8e41;
  }

  @media screen and (max-width: 1048px) {
    img {
      width: 45%;
    }
  }
</style>
