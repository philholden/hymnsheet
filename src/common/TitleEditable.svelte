<script>
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  import Share from "./Share.svelte";
  import Input from "./Input.svelte";
  import Title from "./Title.svelte";
  export let value;
  let show;
  export let editable;
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
  .outer {
    display: flex;
    align-items: center;
  }
</style>

<div class="outer">
  <Title style="padding-right: 8px;">{value}</Title>
  {#if editable}
    <Button invisible iconLeft="edit" on:click={() => (show = true)} />
  {/if}
</div>
{#if show}
  <Modal on:close={() => (show = false)}>
    <form
      on:submit={e => {
        show = false;
        console.log(onSave);
        if (value && onSave) onSave(value);
        e.preventDefault();
      }}>
      <Input
        autoFocus
        on:input={e => (value = e.target.value)}
        style="width: 100%;box-sizing: border-box;margin-bottom: 16px"
        {value} />
      <div class="buttons">

        <Button
          type="button"
          invisible
          iconLeft="close"
          on:click={() => (show = false)}>
          Close
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>

  </Modal>
{/if}
