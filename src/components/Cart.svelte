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
  
  <div class="shopping-cart">
	<Modal bind:this={modal}>
	  <div class="title">
	  <h2>Your Shopping Cart</h2>
  </div>
	  {#if show}
	  <div class="shopping-cart">
		  <div class="buttons">
			<span class="delete-btn"></span>
			<span class="like-btn"></span>
		  </div>
		  {#if $cartStore.items.length}
			  {#each $cartStore.items as item (item.id)}
			  <div class="image">
				  <img class="item-1.png" src={item.image} alt="Product" />
			  </div> 
				 <div class="description">
				  <h1>{item.name}</h1>
				  <p class="price">Size: {item.size}</p>
				  <p class="price">Price: {item.price} SEK</p>
				  <slot name="description" />
				  {item.description}
  
				  <div class="count">
					<button class="add" on:click={countButtonHandler}>+</button>
					<p>{item.count}</p>
					<button class="subtract" on:click={countButtonHandler}
					  >-</button
					>
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
					<strong>${$cartStore.quantities[item.id] * item.price}</strong
					></small
				  >
				</div>
			  {/each}
			<hr />
			<div>
			  <div class="cart__subtotal">
				<span>Sub-Total</span><strong>${$costStore.subTotal}</strong>
			  </div>
			  <div class="cart__discounts">
				<span>Discount</span><strong>-${$costStore.discountAmount}</strong
				>
			  </div>
			  {#if $cartStore.coupons.length}
				<ul class="cart__coupons-list">
				  {#each $cartStore.coupons as coupon (coupon.code)}
					<li class="cart__coupons-list__item">
					  <span>{coupon.code}</span>
					  <Button type="Button" on:click={unapplyCoupon(coupon)}
						>x</Button
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
				<button
				  class="cart__coupon__btn"
				  type="button"
				  on:click={applyCoupon}>Apply</button
				>
			  </div>
			  <hr />
			  <div class="cart__total">
				<span>Total</span><strong>${$costStore.total}</strong>
			  </div>
			</div>
		  {:else}
			<p class="empty-cart-msg">Cart is empty.</p>
		  {/if}
		</div>
	  {/if}
	  <Button on:click={() => modal.hide()}>Checkout</Button>
	</Modal>
	<!-- <button class="myButton" on:click={toggleDropdown}>Cart ({$cartStore.totalItems})</button> -->
  </div>
  
  <style>
  .item {
	padding: 20px 30px;
	height: 120px;
	display: flex;
  }
   
  .item:nth-child(3) {
	border-top:  1px solid #E1E8EE;
	border-bottom:  1px solid #E1E8EE;
  }
  
	.cart__dropdown {
	  background: #212527;
	  color: #9fb2b9;
	  float: left;
	  display: grid;
	  width: 100%;
	  margin: 2em auto 0;
	}
  
	.cart__list {
	  list-style: none;
	  padding: 0;
	  z-index: 10;
	  max-width: 70vw;
	  border-radius: 0.3rem;
	  background-color: white;
	  overflow: hidden;
	}
  
	.cart__list__item {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
  
	.cart__list__item:not(:last-child) {
	  margin-bottom: 0.5rem;
	}
  
	.empty-cart-msg {
	  margin: 0;
	  color: grey;
	}
  
	.cart__subtotal,
	.cart__discounts,
	.cart__total {
	  display: flex;
	  justify-content: space-between;
	  margin-bottom: 0.25rem;
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
	.price {
	  color: black;
	  font-size: 20px;
	}
  
	.myButton {
	  min-width: 70px;
	  max-width: 200px;
	  margin: 1em;
	  padding: 1em 2em;
	  border-radius: 5px;
	  border-width: 2px;
	  background-color: #83b271;
	  font-family: "Ubuntu", sans-serif;
	  font-size: 1em;
	  letter-spacing: 1px;
	}
	.myButton:hover {
	  cursor: pointer;
	  color: greenyellow;
	  border-color: greenyellow;
	}
	.myButton:active {
	  position: relative;
	  top: 1px;
	}
	.card-list {
	  margin: 4;
	  padding: 4;
	}
  
	h1 {
	  font-family: "Ubuntu", sans-serif;
	  font-size: 1.5em;
	  letter-spacing: 1px;
	}
  
	.product__image {
	  width: 12rem;
	  height: auto;
	  background-position: center;
	  background-size: cover;
	}
	.product {
	  display: flex;
	  border: 1px solid #e5eaef;
	  border-radius: 0.5rem;
	  overflow: hidden;
	  max-width: 44rem;
	}
  
	.item-grid {
	  display: flex;
	}
  
  
  
	.item-meta-data {
	  flex-grow: 1;
	  display: flex;
	  flex-direction: column;
	}
  
	.item-meta-data h3 {
	  margin-top: 0;
	}
  
	.item-meta-data p {
	  margin: 0.2em 0;
	  font-size: 0.8em;
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
  
	@media screen and (max-width: 1048px) {
	  img {
		width: 45%;
	  }
	}
  
	@media screen and (max-width: 454px) {
	  .item-grid {
		flex-direction: column;
	  }
  
	  img {
		width: 100%;
	  }
	}
  </style>
  
  