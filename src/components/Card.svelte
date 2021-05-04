<script>
  export let productTitle;
  export let productPrice;
  export let productImage;
 
</script>

<div class="card">
  <img class="product-image" src={productImage} alt="Product" />
  <h1>{productTitle}</h1>
  <slot name="description">
  </slot>
  <p class="price">
    SEK
    <span>{productPrice}</span>
  </p>
  <p>
    <button class="myButton">Add to Cart</button>
  </p>
</div>

<style>
  .card {
    font-family: "Gelasio";
    text-align: center;
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.2);
    float: left;
    height: 30rem;
    width: 25%;
    padding: 0 1rem;
    margin: 1.5rem;
  }
  .price {
    color: white;
    font-size: 20px;
  }
  .product-image {
    width: 100%;
    height: 50%;
  }

  .myButton {
    background-color: transparent;
    border-radius: 28px;
    border: 1px solid white;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    height: 50%;
    width: 100%;
    text-decoration: none;
    text-shadow: 0px 1px 0px black;
  }
  .myButton:hover {
    background-color: transparent;
  }
  .myButton:active {
    position: relative;
    top: 1px;
  }
</style>
