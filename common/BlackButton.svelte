<style>
  button {
    border: none;
    color: #ccc;
    background: transparent;
    outline: none;
    min-width: 50px;
    height: 50px;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-auto-flow: column;
    grid-gap: 4px;
    font-size: 16px;
    width: min-content;
    white-space: nowrap;
  }

  button:active {
    color: #fff;
  }
</style>

<button on:click><slot /></button>