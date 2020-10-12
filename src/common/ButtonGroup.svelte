<script>
  export let horizontal;
</script>

<style>
  .buttonGroup {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  .horizontal {
    grid-template-columns: repeat(auto-fit, minmax(0, max-content));
  }
</style>

<div class="buttonGroup" class:horizontal>
  <slot />
</div>
