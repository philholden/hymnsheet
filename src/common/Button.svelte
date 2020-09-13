<script>
  import Icon from "./Icon.svelte";
  import { link } from "svelte-spa-router";
  export let invisible = false;
  export let iconLeft;
  export let iconRight;
  export let href;
  let num;
  $: num = [iconLeft, iconRight].filter(x => x).length + 1;
</script>

<style>
  button:focus,
  a:focus {
    outline: none;
  }
  button,
  a {
    box-sizing: border-box;
    position: relative;
    white-space: nowrap;
    line-height: 48px;
    border-radius: 24px;
    background-color: var(--header-color);
    border: none;
    color: var(--white);
    font-size: 16px;
    display: block;

    margin: 0;
    border: none;
    text-decoration: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .iconLeft {
    padding-left: 20px;
  }
  .iconRight {
    padding-right: 20px;
  }

  .iconLeft2 {
    padding-left: 20px;
  }
  .iconRight2 {
    padding-right: 20px;
  }
  .invisible .iconRight2 {
    padding-right: 26px;
  }
  .invisible .iconLeft2 {
    padding-left: 26px;
  }
  .invisible .iconRight {
    padding-right: 26px;
  }
  .invisible .iconLeft {
    padding-left: 26px;
  }

  button:active,
  a:active {
    background-color: #ff3e00;
  }

  .invisible {
    padding: 0 12px;
    background-color: rgba(255, 255, 255, 0);
    color: var(--text1);
    margin: 0 -12px;
    -webkit-font-smoothing: initial;
  }

  .invisible:active {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0 10px rgba(0, 0, 0, 0.05),
      0 0 5px rgba(0, 0, 0, 0.05);
  }

  .primary {
    padding: 0 24px;
  }
  .shim {
    position: relative;
    top: 1px;
  }
</style>
{#if href}
  <a on:click use:link={href} class:invisible class:primary={!invisible} {...$$restProps}>
     {#if iconLeft}
    <Icon name={iconLeft} size={24} style={`left: ${invisible ?12:16}px; position: absolute; top: 13px`} />
  {/if}
  <span class:iconLeft2={iconLeft} class:iconRight2={iconRight} class="shim"><slot /></span>
  {#if iconRight}
    <Icon name={iconRight} size={24} style={`right: ${invisible ?12:16}px; position: absolute; top: 13px`} />
  {/if}
  </a>
{:else}
<button on:click class:invisible class:primary={!invisible} {...$$restProps}>
  {#if iconLeft}
    <Icon name={iconLeft} size={24} style={`left: ${invisible ?12:16}px; position: absolute; top: 13px`} />
  {/if}
	{#if iconRight}
    <Icon name={iconRight} size={24} style={`right: ${invisible ?12:16}px; position: absolute; top: 13px`} />
  {/if}
  <span class="shim" class:iconLeft class:iconRight><slot /></span>
  
</button>
{/if}