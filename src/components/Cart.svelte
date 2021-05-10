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
	<header class="container">
	  <h2>Your Shopping Cart</h2>
	</header>
	{#if show}
	  {#if $cartStore.items.length}
		{#each $cartStore.items as item (item.id)}
		  <header class="container">
			<ul class="breadcrumb">
			  <li>Product</li>
			  <li>Quantity Cart</li>
			  <li>Price</li>
			  <span class="count">({$cartStore.totalItems})items in the bag</span>
			</ul>
		  </header>
  
		  <section class="container">
			<ul class="products">
			  <li class="row">
				<div class="col left">
				  <div class="thumbnail">
					<img class="item-1.png" src={item.image} alt="Product" />
				  </div>
				  <div class="detail">
					<div class="name">
					  <span class="product-name">{item.name}</span>
					</div>
					<div class="description">Size {item.size}</div>
					<div class="description">
					  <div class="price">
						Price <small style="display: block;"
						  >(x{$cartStore.quantities[item.id]}) -
						  <strong
							>SEK {$cartStore.quantities[item.id] *
							  item.price}</strong
						  ></small
						>
					  </div>
					</div>
				  </div>
				  <!-- <span class="separator-top" /> -->
				  <div class="col right">
					<div class="quantity">
					  <input
						type="text"
						class="quantity"
						step="1"
						value={$cartStore.quantities[item.id]}
					  />
					</div>
					<div class="remove">
					  <button class="remove" on:click={removeToCart(item)}>
						<object
						  aria-label="remove"
						  type="image/svg+xml"
						  data="img/svg/cancel.svg"
						  
						/>
						X
					  </button>
					</div>
				  </div>
				</div>
			  </li>
			</ul>
		  </section>
  
		  <!-- <span class="product-price">{item.price} SEK</span> -->
  
		  <!-- <Counter bind:count={item.count} /> -->
		  <!-- <div class="count">
			  <button class="add" on:click={countButtonHandler}>+</button>
			  <p>{item.count}</p>
			  <InputQuantity
			  {quantity}
			  on:addQuantity={addQuantity}
			  on:removeQuantity={removeQuantity} /> -->
		{/each}
	  
  
		<div class="container">
		  <span>Sub-Total</span><strong>SEK{$costStore.subTotal}</strong>
  
		  <p>Have A Promo Code??</p>
		  <span>Use the code "FIRSTIME" to get a discount as a first time user</span>
		  <br>
		  <span>Discount</span><strong>-SEK{$costStore.discountAmount}</strong>
  
		  {#if $cartStore.coupons.length}
			<ul class="cart__coupons-list">
			  {#each $cartStore.coupons as coupon (coupon.code)}
				<li class="cart__coupons-list__item">
				  <span>{coupon.code}</span>
  
				  <button type="button" on:click={unapplyCoupon(coupon)}>x</button
				  >
				</li>
			  {/each}
			</ul>
		  {/if}
  
		  <input type="text" bind:this={couponInput} />
		  <button type="button" on:click={applyCoupon}>Apply</button>
  
		  <hr />
		  <div class="cart__total">
			<span>Total</span><strong>SEK{$costStore.total}</strong>
		  </div>
  
		  <div class="checkout">
			<button type="button">Check Out</button>
		  </div>
		</div>
  
		<hr />
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
	* {
	  box-sizing: border-box;
	}
  
	html {
	  font-size: 12px;
	}
  
	body {
	  margin: 20px 0;
	  padding: 0;
	  font-family: arial, sans-serif;
	  overflow: scroll;
	}
  
	img {
	  max-width: 100%;
	  vertical-align: middle;
	  border-radius: 4px;
	}
  
	a {
	  text-decoration: none;
	  color: #333333;
	}
  
	a:hover {
	  color: #f58551;
	}
  
	button {
	  background-color: #16cc9b;
	  border: 2px solid #16cc9b;
	  color: #ffffff;
	  transition: all 0.25s linear;
	  cursor: pointer;
	}
  
	button::after {
	  position: relative;
	  right: 0;
	  content: " \276f";
	  transition: all 0.15s linear;
	}
  
	button:hover {
	  background-color: #f58551;
	  border-color: #f58551;
	}
  
	button:hover::after {
	  right: -5px;
	}
  
	button:focus {
	  outline: none;
	}
  
	ul {
	  padding: 0;
	  margin: 0;
	  list-style-type: none;
	}
  
	input {
	  transition: all 0.25s linear;
	}
  
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
	  -webkit-appearance: none;
	  -moz-appearance: none;
	  appearance: none;
	  margin: 0;
	}
  
	input {
	  outline: none;
	}
  
	.container {
	  width: 90%;
	  margin: 0 auto;
	  overflow: auto;
	}
  
	/* --- HEADER --- */
	header.container {
	  margin-bottom: 1.5rem;
	}
  
	header .breadcrumb {
	  color: #7d7d7d;
	}
  
	header .breadcrumb li {
	  float: left;
	  padding: 0 6px;
	}
  
	header .breadcrumb li:first-child {
	  padding-left: 2px;
	}
  
	header .breadcrumb li:not(:last-child)::after {
	  content: " \276f";
	  padding-left: 8px;
	}
  
	header .count {
	  float: right;
	  color: #333333;
	}
  
	/* --- PRODUCT LIST --- */
	.products {
	  border-top: 1px solid #ddd;
	}
  
	.products > li {
	  padding: 1rem 0;
	  border-bottom: 1px solid #ddd;
	}
  
	.row {
	  position: relative;
	  overflow: auto;
	  width: 100%;
	}
  
	.col,
	.quantity,
	.remove {
	  float: left;
	}
  
	.col.left {
	  width: 70%;
	}
  
	.col.right {
	  width: 30%;
	  position: absolute;
	  right: 0;
	  top: calc(50% - 30px);
	}
  
	.detail {
	  padding: 0 0.5rem;
	  line-height: 2.2rem;
	}
  
	.detail .name {
	  font-size: 1.2rem;
	}
  
	.detail .description {
	  color: #7d7d7d;
	  font-size: 1rem;
	}
  
	.detail .price {
	  font-size: 1.5rem;
	}
  
	.quantity,
	.remove {
	  width: 50%;
	  text-align: center;
	}
  
	.remove svg {
	  width: 60px;
	  height: 60px;
	}
  
	.quantity > input {
	  display: inline-block;
	  width: 60px;
	  height: 60px;
	  position: relative;
	  left: calc(50% - 30px);
	  background: #fff;
	  border: 2px solid #ddd;
	  color: #7f7f7f;
	  text-align: center;
	  font: 600 1.5rem Helvetica, Arial, sans-serif;
	}
  
	.quantity > input:hover,
	.quantity > input:focus {
	  border-color: #f58551;
	}
  
	.close {
	  fill: #7d7d7d;
	  transition: color 150ms linear, background-color 150ms linear,
		fill 150ms linear, 150ms opacity linear;
	  cursor: pointer;
	}
  
	.close:hover {
	  fill: #f58551;
	}
  
	/* --- SUMMARY --- */
	.promotion,
	.summary,
	.checkout {
	  float: left;
	  width: 100%;
	  margin-top: 1.5rem;
	}
  
	.promotion > label {
	  float: left;
	  width: 100%;
	  margin-bottom: 1rem;
	}
  
	.promotion > input {
	  float: left;
	  width: 80%;
	  font-size: 1rem;
	  padding: 0.5rem 0 0.5rem 1.8rem;
	  border: 2px solid #16cc9b;
	  border-radius: 2rem 0 0 2rem;
	}
  
	.promotion:hover > input {
	  border-color: #f58551;
	}
  
	.promotion > button {
	  float: left;
	  width: 20%;
	  padding: 0.5rem 0;
	  border-radius: 0 2rem 2rem 0;
	}
  
	.promotion:hover > button {
	  border-color: #f58551;
	  background-color: #f58551;
	}
  
	.promotion > button::after {
	  content: "\276f";
	  font-size: 1rem;
	}
  
	.summary {
	  font-size: 1.2rem;
	  text-align: right;
	}
  
	.summary ul li {
	  padding: 0.5rem 0;
	}
  
	.summary ul li span {
	  display: inline-block;
	  width: 30%;
	}
  
	.summary ul li.total {
	  font-weight: bold;
	}
  
	.checkout {
	  text-align: right;
	}
  
	.checkout > button {
	  font-size: 1.2rem;
	  padding: 0.8rem 2.8rem;
	  border-radius: 1.5rem;
	}
  
	.empty-product {
	  text-align: center;
	}
  
	.empty-product > button {
	  font-size: 1.3rem;
	  padding: 10px 30px;
	  border-radius: 5px;
	}
  
	/* --- SMALL SCREEN --- */
	@media all and (max-width: 599px) {
	  .thumbnail img {
		display: none;
	  }
  
	  .quantity > input {
		width: 40px;
		height: 40px;
		left: calc(50% - 20px);
	  }
  
	  .remove svg {
		width: 40px;
		height: 40px;
	  }
	}
  
	/* --- MEDIUM & LARGE SCREEN --- */
	@media all and (min-width: 600px) {
	  html {
		font-size: 14px;
	  }
  
	  .container {
		width: 75%;
		max-width: 960px;
	  }
  
	  .thumbnail,
	  .detail {
		float: left;
	  }
  
	  .thumbnail {
		width: 35%;
	  }
  
	  .detail {
		width: 65%;
	  }
  
	  .promotion,
	  .summary {
		width: 50%;
	  }
  
	  .checkout {
		width: 100%;
	  }
  
	  .checkout,
	  .summary {
		text-align: right;
	  }
	}
  
	/* --- LARGE SCREEN --- */
	@media all and (min-width: 992px) {
	  html {
		font-size: 16px;
	  }
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
	  background-color: #a0c492;
	}
  
	@media screen and (max-width: 1048px) {
	  img {
		width: 45%;
	  }
	}
  </style>
  