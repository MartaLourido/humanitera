<button on:click>
  <slot />
</button>

<style>
  button {
    display: block;
    font-size: 1.2rem;
    margin: 10px;
    transition: 1s;
    cursor: pointer;
    border-radius: 50px;
    background-color: #689c54;
    color: white;
    min-width: 70px;
    max-width: 200px;
    margin: 1em;
    padding: 1em 2em;
    border-radius: 5px;
    border-width: 2px;
    background-color: black;
    font-family: "Ubuntu", sans-serif;
    font-size: 1em;
    letter-spacing: 1px;
  }
  button:hover,
  button:active {
    cursor: pointer;
    color: greenyellow;
    border-color: greenyellow;
  }
</style>
