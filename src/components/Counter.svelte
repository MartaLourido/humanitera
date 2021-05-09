<script>
  import { cartStore, costStore, validCouponStore } from "./stores";

    export let count = costStore.total;

    function handleIncrementClick(product) {
        count += 1; {
    }
    costStore.addItem(product);
};
    function handleDecrementClick(product) {
        if(count > 0) {
            count -=1;
        }
        costStore.removeItem(product)
    }



</script>
<div>
    <button on:click={handleDecrementClick}>-</button>
    <input type="number" bind:value={count} />
    <button on:click={handleIncrementClick}>+</button>
</div>

<style>
    button {
        padding: .5rem;
        margin: .1rem;
        border-radius: .4rem;
        cursor: pointer;
    }
</style>