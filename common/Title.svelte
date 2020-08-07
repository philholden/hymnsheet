<script>
  import { onMount } from "svelte";
  let title = "Hymn sheet";
  let el;
  onMount(() => {
    title = "Hymn sheet - " + el.textContent;
  });
</script>

<style>
  h1 {
    margin: 0;
    padding: 0;
    line-height: 1.4;
    font-size: 22px;
    font-weight: normal;
  }
</style>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<h1 bind:this={el} {...$$restProps}><slot /></h1>