<script>
  import { cartStore, costStore, validCouponStore } from "./stores";
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  import InputQuantity from "./InputQuantity.svelte";
  import Counter from "./Counter.svelte";
  let modal;


  let shown = false;
  export function show() {
    shown = true;
  }

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



</script>

<Button on:click={() => modal.show()}
  >Shopping Cart ({$cartStore.totalItems})</Button
>

<Modal bind:this={modal}>
  <div class="Container">
    <h2>Your Shopping Cart</h2>
  </div>
  {#if show}
    {#if $cartStore.items.length}
      {#each $cartStore.items as item (item.id)}
	  <div class="btn-left">
		<p>product</p>
	  </div>
	  <div class='container'>
		
			  <img class="item-1.png" src={item.image} alt="Product" />
			<div class="btn-group">
			  <span class="product-name"><strong>{item.name}</strong></span>
			  <span class="product-name"><strong>Size {item.size}</strong></span>
			 
			  <span class="right">Price {item.price} SEK </span>
		<span class="separator-top" />
		<button class="remove" on:click={removeToCart(item)}>
			<object
			  aria-label="remove"
			  type="image/svg+xml"
			  data="img/svg/cancel.svg"
			/>
			Remove
		  </button>
	</div>
	
	 
          <span class="product-price">{item.price} SEK</span>
         
		  <Counter bind:count={item.count} />
          <!-- <div class="count">
            <button class="add" on:click={countButtonHandler}>+</button>
            <p>{item.count}</p>
			<InputQuantity
			{quantity}
			on:addQuantity={addQuantity}
			on:removeQuantity={removeQuantity} /> -->
         

          <small style="display: block;"
            >(x{$cartStore.quantities[item.id]}) -
            <strong>SEK{$cartStore.quantities[item.id] * item.price}</strong
            ></small
          >
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

          <input
            class="cart__coupon__input"
            type="text"
            placeholder="Coupon"
            bind:this={couponInput}
          />
          <button class="cart__coupon__btn" type="button" on:click={applyCoupon}
            >Apply</button
          >

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
        <button on:click={() => modal.hide()}>Continue Shopping</button>
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

.container {
   text-align:center;
} 
 button {
     display:inline-block;
}



    li {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
        border-bottom: .1em solid #cacaca;
        padding: .8em 0;
    }
    h4 {
        text-align: center;
        width: 100%;
    }
    span {
        width: 100%;
        text-align: right;
        font-size: .95em;
    }

  img {
    width: 80px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 0.5em;
	float: left;
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
	display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
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
    background-color: #2a2a2a; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: right; /* Float the buttons side by side */

  }

  .btn-left button {
    background-color: #689c54; /* Green background */
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
    background-color:#a0c492;
  }

  @media screen and (max-width: 1048px) {
    img {
      width: 45%;
    }
  }
</style>
