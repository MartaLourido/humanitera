<script>
  let bgImage =
    "https://cdn.shopify.com/s/files/1/1132/3434/files/BedrockSandals_MT20_Bydlon_072520-1040449_1_1600x.jpg?v=1614191359";
  let color = "hotpink";
</script>

<div style="background-image: url('{bgImage}')">
  <div>
    <h1>
      Sustainable footwear for everyone, enjoy nature with comfortable footwear
      made from recycled materials.
    </h1>
    <button on:click={() => alert("")}> Shop now </button>
  </div>
</div>

<style>
  div {
    width: 100%;
    height: 800px;
    background-size: cover;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  
  @font-face {
    font-family: "Gelasio";
    font-style: normal;
    font-weight: 400;
    src: local("Gelasio Regular"), local("Gelasio-Regular"),
      url(https://fonts.gstatic.com/s/gelasio/v1/cIf9MaFfvUQxTTqS9C6hYQ.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  h1 {
    font-family: Gelasio;
    margin-left: auto;
    margin-right: auto;
    width: 8em;
    color:  #689c54;
  }
  button {
    color: #fff;
    background-color: #689c54;
    border-radius: 5px;
    padding: 8px;
    border: none;
  }
</style>
