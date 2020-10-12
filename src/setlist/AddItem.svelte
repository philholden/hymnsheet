<script>
  import { createEventDispatcher } from "svelte";
  import AddEditAudio from "./AddEditAudio.svelte";
  import AddEditSpeakerNote from "./AddEditSpeakerNote.svelte";
  import AddEditSong from "./AddEditSong.svelte";
  import AddEditPdf from "./AddEditPdf.svelte";
  import AddEditQuote from "./AddEditQuote.svelte";
  import { nanoid } from "nanoid";
  const dispatch = createEventDispatcher();
  let step = "start";
  function save(data) {
    let items = Array.isArray(data) ? data : [data];
    items = items.map(item => ({ id: nanoid(), ...item }));
    dispatch("add", { items });
    step = "start";
  }

  //https://bafybeiejnzb5fquzplz7w4gsrlacv5xnyrfw4ojje4cugbjqmiic2jxkhe.ipfs.infura-ipfs.io/
</script>

<style>

</style>

{#if step === 'start'}
  <button on:click={() => (step = 'add what')}>Add Item</button>
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
