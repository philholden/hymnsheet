<script>
  import Icon from "./Icon.svelte";
  export let icon;
  export let style;
</script>
<style>
  .outer {
    border-radius: 10px;
    display: grid;
    grid-gap: 24px;
    align-content: space-around;
    justify-items: center;
    background-color: var(--card-bg-2);
    color: var(--text1);
    padding: 24px;
    font-size: 21px;
    line-height: 1.5;
  }
</style>

<div class="outer" style={style}>
  {#if icon}
    <Icon name={icon} size={36}/>
  {/if}
  <slot />
</div>