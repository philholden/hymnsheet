<script>
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  import Share from "./Share.svelte";
  import Input from "./Input.svelte";
  export let show;
  export let title;
  export let placeholder;
  let value;
  export let onAdd = () => {
    console.log("add");
  };
</script>

<style>
  .buttons {
    display: grid;
    grid-template-columns: min-content min-content;
    justify-content: space-between;
  }
</style>
{#if show}
<Modal on:close={() => show = false}>
  <form on:submit={(e) => {
    show = false;
    if(value) onAdd(value);
    e.preventDefault()
  }}>
  <Input
    autoFocus
    on:input={(e) => value = e.target.value}
    style="width: 100%;box-sizing: border-box;margin-bottom: 16px"
    {placeholder}
  />
  <div class="buttons">
  
 
  <Button  type="button" invisible iconLeft="close" on:click={() => show = false}>
    Close
  </Button>
  <Button iconLeft="add" type="submit">Add</Button>
  </div>
  </form>
  
</Modal>
{/if}