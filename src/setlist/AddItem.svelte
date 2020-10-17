<script>
  import { createEventDispatcher } from "svelte";
  import AddEditAudio from "./AddEditAudio.svelte";
  import AddEditSpeakerNote from "./AddEditSpeakerNote.svelte";
  import AddEditSong from "./AddEditSong.svelte";
  import AddEditPdf from "./AddEditPdf.svelte";
  import AddEditQuote from "./AddEditQuote.svelte";
  import Button from "../common/Button";
  import { nanoid } from "nanoid";
  const dispatch = createEventDispatcher();
  export let index;
  export let button;
  export let last;
  let step = "start";
  function save(data) {
    let items = Array.isArray(data) ? data : [data];
    items = items.map(item => ({ id: nanoid(), ...item }));
    dispatch("add", { items, index });
    step = "start";
  }

  //https://bafybeiejnzb5fquzplz7w4gsrlacv5xnyrfw4ojje4cugbjqmiic2jxkhe.ipfs.infura-ipfs.io/
</script>

<style>
  .menubar {
    display: grid;
    grid-auto-flow: column;
    gap: 24px;
    color: #aaa;
    border-bottom: 1px solid #eee;
    justify-content: end;
  }
  .action {
    color: #ccc;
    cursor: pointer;
  }

  .action:hover {
    color: var(--header-color);
  }
  .actionNone {
    opacity: 0;
    cursor: default;
  }
</style>

{#if step === 'start'}
  {#if button}
    <Button on:click={() => (step = 'add what')}>Add item</Button>
  {:else}
    <div class="menubar">
      <div
        class="action"
        class:actionNone={index === 0 || last}
        on:click={() => {
          if (index === 0 || last) return;
          dispatch('move', { index: index - 1, value: 1 });
        }}>
        Swap
      </div>
      <div class="action" on:click={() => (step = 'add what')}>Add</div>
      <!-- <div
        class="action"
        on:click={() => dispatch('move', { index: index - 1, value: -1 })}>
        Up
      </div> -->

      <div
        style="padding-right: 16px;"
        class="action"
        class:actionNone={index === 0}
        on:click={() => {
          if (index === 0) return;
          dispatch('remove', { index: index - 1 });
        }}>
        Delete
      </div>
    </div>
  {/if}
{:else if step === 'add what'}
  <div style="display: grid; gap: 5px;">
    <button on:click={() => (step = 'add song')}>Add Song</button>
    <button on:click={() => (step = 'add quote')}>Add Quote</button>
    <button on:click={() => (step = 'add slide show')}>Add Slide Show</button>
    <button on:click={() => (step = 'add speaker note')}>Speaker note</button>
    <button on:click={() => (step = 'add speaker audio')}>Speaker audio</button>
  </div>
{:else if step === 'add song'}
  <AddEditSong title="Song" onSave={save} onCancel={() => (step = 'start')} />
{:else if step === 'add quote'}
  <AddEditQuote title="Quote" onSave={save} onCancel={() => (step = 'start')} />
{:else if step === 'add slide show'}
  <AddEditPdf
    title="Slide show"
    onSave={save}
    onCancel={() => (step = 'start')} />
{:else if step === 'add speaker note'}
  <AddEditSpeakerNote
    title="Speaker note"
    onSave={save}
    onCancel={() => (step = 'start')} />
{:else if step === 'add speaker audio'}
  <AddEditAudio
    title="Speaker audio"
    onSave={save}
    onCancel={() => (step = 'start')} />
{/if}
