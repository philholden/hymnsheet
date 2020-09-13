<script>
  import Logo from "./Logo.svelte";
  import { link } from "svelte-spa-router";
</script>

<style>
  .header {
    height: 70px;
    background: var(--header-color);
    color: white;
    display: grid;
    align-items: center;
    font-size: 20px;
    padding-left: 20px;
  }
</style>

<div class="header">
  <a use:link={'/'}>
    <Logo class="ape" style="position: relative; top: 4px;" />
  </a>
</div>
