<script>
  import AddItem from "./setlist/AddItem";
  import { Store, set, get, del, clear, getStore } from "./store/storeDb";
  import { Button, ButtonGroup } from "./common/";
  import PlayAudio from "./setlist/PlayAudio.svelte";
  import PlaySpeakerNote from "./setlist/PlaySpeakerNote.svelte";
  import PlayQuote from "./setlist/PlayQuote.svelte";
  import PlaySong from "./setlist/PlaySong.svelte";
  import PlayPdf from "./setlist/PlayPdf.svelte";
  export let params = {};
  let selected = 0;

  const db = new Store(params.setlistId, params.setlistId);
  let value = "";
  let list;
  let el;
  init();
  async function init() {
    list = await getStore("list", db, []);
  }

  function add() {
    $list.push(value);
    set("list", $list, db);
  }
  function addItem(e) {
    set("list", [...$list, e.detail], db);
  }

  function addItems(e) {
    let { index, items } = e.detail;
    if (!index) index = $list.length;
    set(
      "list",
      [...$list.slice(0, index), ...items, ...$list.slice(index)],
      db
    );
  }

  function removeIndex(index) {
    set("list", $list.filter((x, i) => i !== index), db);
  }

  function onSelect(e) {
    selected = e.detail;
  }
</script>

<style>
  .outer {
    max-width: 640px;
    margin: 0 auto;
  }

  .item {
    margin: 24px 0;
  }

  hr {
    border: none;
    height: 1px;
    background: #eee;
  }

  .action {
    color: #ccc;
    cursor: pointer;
  }

  .action:hover {
    color: var(--header-color);
  }
</style>

<div bind:this={el} class="outer">
  {#if $list !== undefined}
    {#each $list as item, index (item.id)}
      <div class="item">
        {#if item.type === 'quote'}
          <PlayQuote
            {item}
            channelId={params.channelId}
            on:select={onSelect}
            selected={selected === item.id} />
        {:else if item.type === 'note'}
          <PlaySpeakerNote {item} />
        {:else if item.type === 'speakerAudio'}
          <PlayAudio {item} channelId={params.channelId} />
        {:else if item.type === 'song'}
          <PlaySong
            {item}
            on:select={onSelect}
            channelId={params.channelId}
            selected={selected === item.id} />
        {:else if item.type === 'pdf'}
          <PlayPdf
            {item}
            on:select={onSelect}
            channelId={params.channelId}
            selected={selected === item.id} />
        {:else}
          <pre>{JSON.stringify(item, null, 2)}</pre>
        {/if}
        <div
          class="action"
          on:click={() => removeIndex(index)}
          style="float: right">
          Delete
        </div>
      </div>
      <hr />
      <!-- <AddItem on:add={addItem} index /> -->
    {/each}
  {/if}
  <pre>{JSON.stringify($list, null, 2)}</pre>
  <AddItem on:add={addItems} />
  <button on:click={() => set('list', [], db)}>Clear</button>
</div>
