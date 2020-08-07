<script>
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  import Share from "./Share.svelte";
  import Input from "./Input.svelte";
  import Title from "./Title.svelte";
  import Icon from "./Icon.svelte";
  export let value;
  let show;
  export let onSave = () => {
    console.log("save");
  };
</script>

<style>
  .buttons {
    display: grid;
    grid-template-columns: min-content min-content;
    justify-content: space-between;
  }
</style>
<Title>{value}</Title>
{#if show}
<Modal on:close={() => show = false}>
  <form on:submit={(e) => {
    show = false;
    if(value) onSave(value);
    e.preventDefault()
  }}>
  <Input
    autoFocus
    on:input={(e) => value = e.target.value}
    style="width: 100%;box-sizing: border-box;margin-bottom: 16px"
    placeholder="Song book name"
  />
  {value}
  <div class="buttons">
  
 
  <Button  type="button" invisible iconLeft="close" on:click={() => show = false}>
    Close
  </Button>
  <Button iconLeft="add" type="submit">Add</Button>
  </div>
  </form>
  
</Modal>
{/if}