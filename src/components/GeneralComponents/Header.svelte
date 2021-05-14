<script>
  export let src = "https://www.linkpicture.com/q/logo_219.png";
  import Cart from "../Cart.svelte";
</script>

<header>
  <img class="logo" {src} alt="humanitera logo" />
  <nav class="header__nav">
    <ul class="header__nav__list">
      <li class="header__nav__list__item"><Cart /></li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }

  .logo {
    max-width: 500px;
  }

  .header__nav__list {
    list-style: none;
    display: flex;
    margin: 0;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    padding: 0 1rem;
  }

  .header__nav__list__item:not(:last-child) {
    margin-right: 1rem;
  }
</style>
