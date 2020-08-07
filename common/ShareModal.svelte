<script>
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  import Share from "./Share.svelte";
  export let show;
  export let title;
  export let url;
</script>

{#if show}
<Modal on:close={() => show = false}>
  <Share {title} {url}  />
  <Button autoFocus invisible iconLeft="close" on:click={() => show = false}>Close</Button>
</Modal>
{/if}