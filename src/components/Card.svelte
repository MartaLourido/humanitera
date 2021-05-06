<script>
  export let productTitle;
  export let productPrice;
  export let productImage;
  export let productSize;
</script>

<section class="card-list">
  <article class="card">
    <img class="product-image" src={productImage} alt="Product" />
    <h1>{productTitle}</h1>
    <slot name="description" />
    <p class="price">
        Size: 
        <span>{productSize}</span>
      </p>
    <p class="price">
      SEK
      <span>{productPrice}</span>
    </p>
    <p>
      <button class="myButton">Add to Cart</button>
    </p>
  </article>
</section>

<style>
  .card {
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.2);
    font-family: "Gelasio";
    background: white;
    border-radius: 1em;
    padding: 2.3em;
    text-align: center;
  }
  .price {
    color: black;
    font-size: 20px;
  }
  .product-image {
    width: 80%;
    height: 50%;
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
  
  h1{
    font-family: "Ubuntu", sans-serif;
    font-size: 1.5em;
    letter-spacing: 1px;
  }
</style>
