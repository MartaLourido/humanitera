<script>
  // This property is used by Modal.svelte to pass down the close function
  export let onClose;
</script>

<button on:click={onClose}>Custom Close Button</button>

<style>
  button {
    position: absolute;
    top: -3rem;
    right: 0;
    color: white;
    background: #689c54;
    border: 2px solid pink;
  }
</style>
